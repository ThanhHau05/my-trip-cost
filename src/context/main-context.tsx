import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isCheckEmailFormat } from '@/components/pages';
import { DataFirebase } from '@/firebase';
import { UserActions } from '@/redux';

interface MainProps {
  showverticalmenu: boolean;
  setShowVerticalMenu: Dispatch<SetStateAction<boolean>>;
  sliderRef: MutableRefObject<any>;
  loadingstartnow: boolean;
  setLoadingStartNow: Dispatch<SetStateAction<boolean>>;
  onSubmitStartNow: (
    name: string,
    id: number,
    email: {
      value: string;
      error: string;
    },
    setEmail: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    url: string,
    color: string,
    text: string,
  ) => void;
  onSubmitContinue: (
    name: {
      value: string;
      error: string;
    },
    setName: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    setId: Dispatch<SetStateAction<number>>,
    setCheckSubmit: (value: boolean) => void,
  ) => Promise<void>;
  showcreatethetrip: boolean;
  setShowCreateTheTrip: Dispatch<SetStateAction<boolean>>;
}

export const MainContext = createContext({} as MainProps);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const [loadingstartnow, setLoadingStartNow] = useState(false);
  const [showverticalmenu, setShowVerticalMenu] = useState(false);
  const [showcreatethetrip, setShowCreateTheTrip] = useState(false);
  const sliderRef = useRef<any>();

  const onSubmitStartNow = (
    name: string,
    id: number,
    email: {
      value: string;
      error: string;
    },
    setEmail: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    url: string,
    color: string,
    text: string,
  ) => {
    const value = isCheckEmailFormat(email.value);
    if (!value) {
      setTimeout(() => {
        dispatch(
          UserActions.setCurrentUserInformation({
            id,
            image: {
              url,
              color,
              text,
            },
            name,
            gmail: email.value,
          }),
        );
        DataFirebase.useAddUserInformationIntoData(
          name,
          id,
          email.value,
          url,
          color,
          text,
        );
        setLoadingStartNow(false);
      }, 3000);
      setLoadingStartNow(true);
    } else setEmail({ ...email, error: value });
  };

  const onSubmitContinue = async (
    name: {
      value: string;
      error: string;
    },
    setName: Dispatch<
      SetStateAction<{
        value: string;
        error: string;
      }>
    >,
    setId: Dispatch<SetStateAction<number>>,
    setCheckSubmit: (value: boolean) => void,
  ) => {
    if (!name.value) {
      setName({ value: '', error: 'Please enter your name' });
    } else if (name.value && name.value.length < 7) {
      setName({ ...name, error: 'Name is too short' });
    } else {
      setTimeout(() => {
        setCheckSubmit(true);
        setLoadingStartNow(false);
      }, 1500);
      setLoadingStartNow(true);
      setId(await DataFirebase.useRandomID());
    }
  };

  const value = {
    showverticalmenu,
    setShowVerticalMenu,
    sliderRef,
    loadingstartnow,
    setLoadingStartNow,
    onSubmitStartNow,
    onSubmitContinue,
    showcreatethetrip,
    setShowCreateTheTrip,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
