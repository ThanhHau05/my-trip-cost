import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DataFirebase } from '@/firebase/hook/DataFirebase';
import { UserActions } from '@/redux';

interface WelcomeProps {
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
  onSubmit: () => void;
  ischeckonsubmit: boolean;
  setIsCheckOnSubmit: Dispatch<SetStateAction<boolean>>;
  email: {
    value: string;
    error: string;
  };
  setEmail: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  image: {
    url: string;
    color: string;
    text: string;
  };
  setImage: Dispatch<
    SetStateAction<{
      url: string;
      color: string;
      text: string;
    }>
  >;
  uploadavtRef: RefObject<HTMLInputElement>;
  handleOpenFileChangeAvt: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitStartNow: () => void;
  loadingstartnow: boolean;
  setLoadingStartNow: Dispatch<SetStateAction<boolean>>;
  id: number;
  setId: Dispatch<SetStateAction<number>>;
}

export const WelcomeContext = createContext({} as WelcomeProps);

export const WelcomeProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState({ value: '', error: '' });
  const [id, setId] = useState(0);
  const [email, setEmail] = useState({ value: '', error: '' });
  const [image, setImage] = useState({
    url: '',
    color: '',
    text: '',
  });
  const [ischeckonsubmit, setIsCheckOnSubmit] = useState(false);
  const [loadingstartnow, setLoadingStartNow] = useState(false);
  const uploadavtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const color = getRandomColor();
    setImage({ url: '', color, text: name.value.charAt(0).toUpperCase() });
  }, [ischeckonsubmit]);

  const isCheckSubmitStartNow = () => {
    let isError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
      isError = true;
      setEmail({ ...email, error: 'Please enter the corrent email format' });
    }
    return !isError;
  };

  const onSubmitStartNow = () => {
    if (isCheckSubmitStartNow()) {
      setTimeout(async () => {
        dispatch(
          UserActions.setCurrentUserInformation({
            ID: id,
            image: {
              url: image.url,
              color: image.color,
              text: image.text,
            },
            name: name.value,
            gmail: email.value,
          }),
        );
        setLoadingStartNow(false);
      }, 3000);
      setLoadingStartNow(true);
    }
  };

  const onSubmit = async () => {
    if (!name.value) {
      setName({ value: '', error: 'Please enter your name' });
    } else if (name.value && name.value.length < 7) {
      setName({ ...name, error: 'Name is too short' });
    } else {
      setId(await DataFirebase.useRandomID());
      setIsCheckOnSubmit(true);
    }
  };

  const handleOpenFileChangeAvt = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const value = {
    name,
    setName,
    onSubmit,
    ischeckonsubmit,
    setIsCheckOnSubmit,
    setEmail,
    email,
    image,
    setImage,
    uploadavtRef,
    handleOpenFileChangeAvt,
    onSubmitStartNow,
    loadingstartnow,
    setLoadingStartNow,
    id,
    setId,
  };
  return (
    <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>
  );
};
