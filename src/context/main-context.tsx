import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { isCheckEmailFormat } from '@/components/pages';
import { auth, DataFirebase } from '@/firebase';
import { selector, UserActions } from '@/redux';

interface MainProps {
  showverticalmenu: boolean;
  setShowVerticalMenu: Dispatch<SetStateAction<boolean>>;
  sliderRef: MutableRefObject<any>;
  loadingstartnow: boolean;
  setLoadingStartNow: Dispatch<SetStateAction<boolean>>;
  onSubmitStartNow: (
    namevalue: string,
    setNameValue: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    email: string,
    setEmail: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    password: string,
    setPassword: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    url: string,
    color: string,
    text: string,
  ) => Promise<void>;
  showcreatethetrip: boolean;
  setShowCreateTheTrip: Dispatch<SetStateAction<boolean>>;
  name: {
    value: string;
    error: string;
  };
  setName: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  AddUserInformationIntoRedux: (
    id: number,
    url: string,
    color: string,
    text: string,
    name: string,
    email: string,
  ) => void;
}

export const MainContext = createContext({} as MainProps);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [createUserWithEmailAndPassword, userEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const { currentUserInformation } = useSelector(selector.user);
  const dispatch = useDispatch();

  const [loadingstartnow, setLoadingStartNow] = useState(false);
  const [showverticalmenu, setShowVerticalMenu] = useState(false);
  const [showcreatethetrip, setShowCreateTheTrip] = useState(false);
  const [name, setName] = useState({ value: '', error: '' });
  const [id, setId] = useState(0);

  const sliderRef = useRef<any>();

  useEffect(() => {
    const handle = async () => {
      if (userEmailAndPassword && id !== 0 && currentUserInformation) {
        DataFirebase.useAddUserInformationIntoData(
          name.value,
          id,
          userEmailAndPassword.user.email || '',
          currentUserInformation.photoURL?.url || '',
          currentUserInformation.photoURL?.color || '',
          currentUserInformation.photoURL?.text || '',
          userEmailAndPassword.user.uid || '',
          [],
        );
      }
    };
    handle();
  }, [userEmailAndPassword, id, currentUserInformation]);

  const isCheckSubmitStartNow = async (
    namevalue: string,
    setNameValue: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    email: string,
    setEmail: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    password: string,
    setPassword: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
  ) => {
    let isError = false;
    const valueEmail = isCheckEmailFormat(email);
    if (!email) {
      isError = true;
      setEmail({ value: '', error: 'Please enter your email' });
    } else if (email && valueEmail) {
      isError = true;
      setEmail({ value: email, error: valueEmail });
    } else if (email && (await DataFirebase.useCheckEmail(email))) {
      isError = true;
      setEmail({ value: email, error: 'This email is already in use' });
    }
    if (!password) {
      isError = true;
      setPassword({ value: '', error: 'Please enter your password' });
    } else if (password && password.length < 8) {
      isError = true;
      setPassword({ value: password, error: 'Password is too short' });
    }
    if (!namevalue) {
      isError = true;
      setNameValue({ value: '', error: 'Please enter your name' });
    } else if (namevalue && namevalue.length <= 4) {
      isError = true;
      setNameValue({ value: namevalue, error: 'Name is too short' });
    }
    return !isError;
  };

  const onSubmitStartNow = async (
    namevalue: string,
    setNameValue: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    email: string,
    setEmail: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    password: string,
    setPassword: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    url: string,
    color: string,
    text: string,
  ) => {
    if (
      await isCheckSubmitStartNow(
        namevalue,
        setNameValue,
        email,
        setEmail,
        password,
        setPassword,
      )
    ) {
      await DataFirebase.useAddEmailCheck(email);
      createUserWithEmailAndPassword(email, password);
      const newid = await DataFirebase.useRandomID();
      AddUserInformationIntoRedux(newid, url, color, text, namevalue, email);
      setId(newid);
    }
  };

  const AddUserInformationIntoRedux = (
    idValue: number,
    url: string,
    color: string,
    text: string,
    nameValue: string,
    email: string,
  ) => {
    setTimeout(async () => {
      dispatch(
        UserActions.setCurrentUserInformation({
          id: idValue,
          photoURL: {
            url,
            color: url ? '' : color,
            text: url ? '' : text,
          },
          displayName: nameValue,
          email,
          uid: '',
        }),
      );
      setLoadingStartNow(false);
    }, 2700);
    setLoadingStartNow(true);
  };

  const value = {
    showverticalmenu,
    setShowVerticalMenu,
    sliderRef,
    loadingstartnow,
    setLoadingStartNow,
    onSubmitStartNow,
    showcreatethetrip,
    setShowCreateTheTrip,
    name,
    setName,
    AddUserInformationIntoRedux,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
