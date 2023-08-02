import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface MainProps {
  showverticalmenu: boolean;
  setShowVerticalMenu: Dispatch<SetStateAction<boolean>>;
  movetonotification: number;
  setMoveToNotification: Dispatch<SetStateAction<number>>;
}

export const MainContext = createContext({} as MainProps);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [showverticalmenu, setShowVerticalMenu] = useState(false);
  const [movetonotification, setMoveToNotification] = useState(0);

  const value = {
    showverticalmenu,
    setShowVerticalMenu,
    movetonotification,
    setMoveToNotification,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
