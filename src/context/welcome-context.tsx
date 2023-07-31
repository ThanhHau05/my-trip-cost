import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useEffect, useRef, useState } from 'react';

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
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
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
}

export const WelcomeContext = createContext({} as WelcomeProps);

export const WelcomeProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState('');
  const [image, setImage] = useState({
    url: '',
    color: '',
    text: '',
  });
  const [ischeckonsubmit, setIsCheckOnSubmit] = useState(false);
  const uploadavtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const color = getRandomColor();
    setImage({ url: '', color, text: name.value.charAt(0) });
  }, [ischeckonsubmit]);

  const onSubmitStartNow = () => {
    //
  };

  const onSubmit = () => {
    if (!name.value) {
      setName({ value: '', error: 'Please enter your name' });
    } else {
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
  };
  return (
    <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>
  );
};
