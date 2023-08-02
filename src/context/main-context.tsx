import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useRef, useState } from 'react';

interface MainProps {
  showverticalmenu: boolean;
  setShowVerticalMenu: Dispatch<SetStateAction<boolean>>;
  sliderRef: MutableRefObject<any>;
}

export const MainContext = createContext({} as MainProps);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [showverticalmenu, setShowVerticalMenu] = useState(false);
  const sliderRef = useRef<any>();

  const value = {
    showverticalmenu,
    setShowVerticalMenu,
    sliderRef,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
