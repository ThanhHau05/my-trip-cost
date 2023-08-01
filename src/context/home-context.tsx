import type { ReactNode } from 'react';
import { createContext } from 'react';

interface HomeProps {
  onSubmitCreateANewTrip: () => void;
}

export const HomeContext = createContext({} as HomeProps);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const onSubmitCreateANewTrip = () => {
    //
  };

  const value = {
    onSubmitCreateANewTrip,
  };
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
