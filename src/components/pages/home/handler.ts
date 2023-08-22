import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import type { NextRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';
import type { AnyAction } from 'redux';

import type {
  SelectOptionsInvitation,
  SelectOptionsTrip,
  SelectOptionsUserInvitations,
  UserInformation,
} from '@/constants/select-options';
import { db, myFirebase } from '@/firebase';
import { TripActions, UserActions } from '@/redux';

export const useHome = ({
  uid,
  id,
  router,
  setTemporaryNotice,
  setInvitation,
  setMasterUid,
  setCheckReserveMoney,
  dispatch,
  setDisabledStartTrip,
  setTripHistory,
}: {
  uid: string;
  id: number;
  setTemporaryNotice: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>;
  setInvitation: Dispatch<SetStateAction<SelectOptionsInvitation[]>>;
  setMasterUid: (value: string) => void;
  setCheckReserveMoney: (value: number) => void;
  dispatch: Dispatch<AnyAction>;
  setDisabledStartTrip: (value: boolean) => void;
  router: NextRouter;
  setTripHistory: Dispatch<SetStateAction<SelectOptionsTrip[]>>;
}) => {
  const handle = () => {
    const docRef = doc(db, 'UserInvitations', uid);
    onSnapshot(docRef, (data) => {
      if (data.exists()) {
        const valueData: SelectOptionsUserInvitations = data.data();
        if (valueData.temporaryNotice) {
          setTemporaryNotice(valueData.temporaryNotice);
        }
        if (valueData.invitation) {
          setInvitation(valueData.invitation);
        }
        if (valueData.tripHistory) {
          setTripHistory(valueData.tripHistory);
        }
      }
    });
  };
  if (id === 0) {
    handle();
  } else {
    const docRef = doc(db, 'Trips', id.toString());
    onSnapshot(docRef, async (data) => {
      if (data.exists()) {
        const { trip } = data.data();
        const valueTrip: SelectOptionsTrip = trip;
        if (valueTrip) {
          setMasterUid(trip.tripmaster);
          setCheckReserveMoney(valueTrip.reservemoney || 0);
          if (valueTrip.status) {
            await router.push(`mytrip/${id}`);
            window.location.reload();
          } else {
            const checkData = valueTrip.userlist.find(
              (item) => item.uid === uid,
            );
            if (checkData === undefined) {
              dispatch(TripActions.setCurrentIdJoinTrip(0));
            }
          }
        }
        const userlists: UserInformation[] = valueTrip.userlist;
        const status = userlists.find((item) => item.status === false);
        if (status === undefined) {
          setDisabledStartTrip(false);
        }
      }
    });
  }
};

export const onSubmit = async ({
  value,
  dispatch,
  signOut,
  setShowVerticalMenu,
  setShowTripHistory,
}: {
  value: string;
  dispatch: Dispatch<AnyAction>;
  signOut: () => Promise<boolean>;
  setShowVerticalMenu: (value: boolean) => void;
  setShowTripHistory: (value: boolean) => void;
}) => {
  if (value === 'sign out') {
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
  } else if (value === 'trip history') {
    setShowVerticalMenu(false);
    setShowTripHistory(true);
  }
};

export const onSubmitTemporaryNotice = async ({
  onSubmitValue,
  data,
  uid,
}: {
  onSubmitValue: (() => void) | undefined;
  uid: string;
  data: SelectOptionsTrip;
}) => {
  if (onSubmitValue) {
    onSubmitValue();
  } else {
    const docRef = doc(db, 'UserInvitations', uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      await updateDoc(docRef, {
        ...isCheck.data(),
        temporaryNotice: [],
        tripHistory: myFirebase.firestore.FieldValue.arrayUnion(data),
      });
    }
  }
};

export const handleRemoveUserInUserListAdded = (
  data: UserInformation[],
  uid: string,
) => {
  return data.filter((item) => item.uid !== uid);
};

export const handleCheckUserInData = (uid: string, data: UserInformation[]) => {
  const value = data.find((item) => item.uid === uid);
  return !!value;
};
