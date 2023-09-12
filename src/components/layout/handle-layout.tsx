import type { Dispatch } from 'react';
import type { AnyAction } from 'redux';

import { UserActions } from '@/redux';

export const onClickMoney = (
  setClickMoney: (value: boolean) => void,
  clickmoney: boolean,
  reservemoney: number,
) => {
  if (reservemoney) {
    setClickMoney(!clickmoney);
  }
};

export const handleCopyInfo = (
  value: string,
  setCopy: (value: boolean) => void,
) => {
  navigator.clipboard.writeText(value).then(() => {
    setCopy(true);
    const timer = setTimeout(() => {
      setCopy(false);
    }, 1500);
    return () => clearTimeout(timer);
  });
};

export const handleSignOut = ({
  signOut,
  dispatch,
  setLoading,
}: {
  signOut: () => Promise<boolean>;
  dispatch: Dispatch<AnyAction>;
  setLoading: (value: boolean) => void;
}) => {
  window.location.reload();
  setTimeout(async () => {
    //
    await signOut();
    setLoading(false);
  }, 2000);
  setLoading(true);
  dispatch(
    UserActions.setCurrentUserInformation({
      displayName: '',
      id: 0,
      photoURL: {
        url: undefined,
        color: undefined,
        text: undefined,
      },
      uid: '',
      status: false,
    }),
  );
};
