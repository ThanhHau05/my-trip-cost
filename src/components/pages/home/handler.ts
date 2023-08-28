import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import type { NextRouter } from 'next/router';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { AnyAction } from 'redux';

import type {
  SelectOptionsInvitation,
  SelectOptionsTrip,
  SelectOptionsUserInvitations,
  UserInformation,
} from '@/constants/select-options';
import { db, myFirebase } from '@/firebase';
import { TripActions } from '@/redux';

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
  setRecentTrip,
  setRecentFriends,
  setLoading,
}: {
  uid: string;
  id: number;
  setTemporaryNotice: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>;
  setRecentTrip: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>;
  setInvitation: Dispatch<SetStateAction<SelectOptionsInvitation[]>>;
  setMasterUid: (value: string) => void;
  setCheckReserveMoney: (value: number) => void;
  dispatch: Dispatch<AnyAction>;
  setDisabledStartTrip: (value: boolean) => void;
  router: NextRouter;
  setTripHistory: Dispatch<SetStateAction<SelectOptionsTrip[]>>;
  setRecentFriends: Dispatch<SetStateAction<UserInformation[]>>;
  setLoading: (value: boolean) => void;
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
        if (valueData.recentTrip) {
          setRecentTrip(valueData.recentTrip);
        }
        if (valueData.recentFriends) {
          setRecentFriends(valueData.recentFriends);
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
            setLoading(true);
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
      const { recentFriends } = isCheck.data() as SelectOptionsUserInvitations;
      let valueRecentFriends: UserInformation[] = [];
      if (!recentFriends) {
        const value = data.userlist.filter((item) => item.uid !== uid);
        if (value.length > 5) {
          valueRecentFriends = value.slice(0, 5);
        } else {
          valueRecentFriends = value;
        }
      } else {
        valueRecentFriends = recentFriends;
        const promises = data.userlist.map(async (item) => {
          if (uid !== item.uid) {
            if (!recentFriends.find((item1) => item1.uid === item.uid)) {
              if (valueRecentFriends.length === 5) {
                valueRecentFriends.shift();
              }
              valueRecentFriends.push(item);
            }
          }
        });
        await Promise.all(promises);
      }
      await updateDoc(docRef, {
        ...isCheck.data(),
        temporaryNotice: [],
        tripHistory: myFirebase.firestore.FieldValue.arrayUnion(data),
        recentFriends: valueRecentFriends,
        recentTrip: data,
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

export const handleOnSubmitNavagitionBar = ({
  value,
  sliderRef,
  setShowTripHistory,
  showtriphistory,
}: {
  value: string;
  sliderRef: MutableRefObject<any>;
  setShowTripHistory: (value: boolean) => void;
  showtriphistory: boolean;
}) => {
  if (value !== 'trip history' && showtriphistory) {
    setShowTripHistory(false);
  }
  if (value === 'home') {
    sliderRef.current.slickGoTo(0);
  } else if (value === 'invitation') {
    sliderRef.current.slickGoTo(1);
  } else if (value === 'trip history') {
    setShowTripHistory(true);
  } else if (value === 'profile') {
    //
  }
};

export const handleDeleteTripHistory = async (uid: string, id: number) => {
  const docRef = doc(db, 'UserInvitations', uid);
  const isCheck = await getDoc(docRef);
  if (isCheck.exists()) {
    const data: SelectOptionsUserInvitations = isCheck.data();
    if (data.tripHistory) {
      const newValue = data.tripHistory.filter((item) => item.id !== id);
      await updateDoc(docRef, {
        ...isCheck.data(),
        tripHistory: newValue,
      });
    }
  }
};
