import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

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
}

export const WelcomeContext = createContext({} as WelcomeProps);

export const WelcomeProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState({ value: '', error: '' });

  const onSubmit = () => {
    if (!name.value) {
      setName({ value: '', error: 'Please enter your name' });
    } else {
      //
    }
  };

  const value = {
    name,
    setName,
    onSubmit,
  };
  return (
    <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>
  );
};
