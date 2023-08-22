import type { UserCredential } from 'firebase/auth';
import type { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import type { AnyAction } from 'redux';

import { DataFirebase } from '@/firebase';
import { UserActions } from '@/redux';

import { handleChangeNameStyle } from '../../handler';

export const isCheckEmailFormat = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    return 'Please enter the corrent email format';
  }
  return '';
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const handleContainerWelcome = async ({
  user,
  dispatch,
}: {
  user: UserCredential | undefined;
  dispatch: Dispatch<AnyAction>;
}) => {
  if (user?.user) {
    if (user.user.email) {
      if (!(await DataFirebase.CheckEmail(user.user.email))) {
        await DataFirebase.AddEmailCheck(user.user.email);
        const id = await DataFirebase.RandomID();
        DataFirebase.AddUserInformationIntoData(
          handleChangeNameStyle(user?.user.displayName || ''),
          id,
          user?.user.email || '',
          user?.user.photoURL || '',
          '',
          '',
          user?.user.uid,
          [],
        );
        dispatch(
          UserActions.setCurrentUserInformation({
            displayName: handleChangeNameStyle(user?.user.displayName || ''),
            id,
            photoURL: {
              color: '',
              text: '',
              url: user?.user.photoURL || '',
            },
            uid: user?.user.uid,
            status: false,
          }),
        );
      } else {
        const userlist = await DataFirebase.GetUserList();
        const value = userlist.find((item) => item.email === user.user.email);
        if (value?.id) {
          dispatch(
            UserActions.setCurrentUserInformation({
              displayName: handleChangeNameStyle(user?.user.displayName || ''),
              id: value?.id,
              photoURL: {
                color: '',
                text: '',
                url: user?.user.photoURL || '',
              },
              uid: user?.user.uid,
              status: false,
            }),
          );
        }
      }
    }
  }
};

export const handleOpenFileChangeAvt = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: Dispatch<
    SetStateAction<{
      url: string;
      color: string;
      text: string;
    }>
  >,
  image: { color: string; text: string; url: string },
) => {
  const file = e.target.files && e.target.files[0];
  if (file) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImage({ ...image, url: result });
      };
      reader.readAsDataURL(file);
    }
  }
};

const isCheck = async ({
  email,
  password,
  setEmail,
  setPassword,
}: {
  email: {
    value: string;
    error: string;
  };
  password: string;
  setEmail: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  setPassword: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
}) => {
  let isError = false;
  if (!email.value) {
    isError = true;
    setEmail({ value: '', error: 'Please enter your email' });
  } else if (email && !(await DataFirebase.CheckEmail(email.value))) {
    isError = true;
    setEmail({ ...email, error: "This email dosen't exist" });
  }
  if (!password) {
    isError = true;
    setPassword({ value: '', error: 'Please enter your password' });
  }
  return !isError;
};

export const onSubmitLoginByAccount = async ({
  signInWithEmailAndPassword,
  email,
  password,
  setEmail,
  setPassword,
}: {
  email: {
    value: string;
    error: string;
  };
  password: string;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<UserCredential | undefined>;
  setEmail: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  setPassword: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
}) => {
  if (await isCheck({ email, password, setEmail, setPassword })) {
    toast.success('Logged in successfully!');
    signInWithEmailAndPassword(email.value, password);
  }
};

export const handleAddUserIntoRedux = async ({
  user,
  email,
  AddUserInformationIntoRedux,
}: {
  user: UserCredential | undefined;
  email: string;
  AddUserInformationIntoRedux: (
    id: number,
    url: string,
    color: string,
    text: string,
    name: string,
    email: string,
    uid: string,
  ) => void;
}) => {
  if (user?.user) {
    const userlist = await DataFirebase.GetUserList();
    if (userlist) {
      const value = userlist.find((item) => item.email === email);
      if (value) {
        AddUserInformationIntoRedux(
          value.id || 0,
          value.photoURL.url || '',
          value.photoURL.color || '',
          value.photoURL.text || '',
          value.displayName || '',
          user.user.email || '',
          user.user.uid,
        );
      }
    }
  }
};
