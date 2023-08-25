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
}: {
  signOut: () => Promise<boolean>;
  dispatch: Dispatch<AnyAction>;
}) => {
  window.location.reload();
  setTimeout(async () => {
    //
    await signOut();
  }, 1000);
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
