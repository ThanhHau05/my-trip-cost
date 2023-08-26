/* eslint-disable react/no-array-index-key */
import type { User } from 'firebase/auth';
import type { Dispatch, SetStateAction } from 'react';
import type { AnyAction } from 'redux';

import type {
  SelectOptionsInvitation,
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { TripActions } from '@/redux';

import { handleGetTimeAndDate } from '../../handler';

const isCheck = ({
  tripname,
  setTripName,
  userlistadded,
  setCompanions,
}: {
  tripname: {
    value: string;
    error: string;
  };
  setTripName: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  userlistadded: UserInformation[];
  setCompanions: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
}) => {
  let isError = false;
  if (!tripname.value) {
    isError = true;
    setTripName({ value: '', error: 'Please enter your trip name' });
  } else if (tripname.value && tripname.value.length <= 4) {
    isError = true;
    setTripName({ ...tripname, error: 'Trip name too short' });
  }
  if (userlistadded.length === 0) {
    isError = true;
    setCompanions({
      value: '',
      error: 'Please add at least on person in the trip',
    });
  }
  return !isError;
};

export const onSubmitCreateTrip = async ({
  tripname,
  setTripName,
  userlistadded,
  setCompanions,
  user,
  currentUserInformation,
  dispatch,
  setShowCreateTheTrip,
}: {
  tripname: {
    value: string;
    error: string;
  };
  setTripName: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  userlistadded: UserInformation[];
  setCompanions: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  user: User | null | undefined;
  currentUserInformation: UserInformation;
  dispatch: Dispatch<AnyAction>;
  setShowCreateTheTrip: (value: boolean) => void;
}) => {
  if (isCheck({ setCompanions, setTripName, tripname, userlistadded })) {
    if (user) {
      const id = await DataFirebase.RandomIdCreateTrip();
      const { displayName, photoURL, uid } = currentUserInformation;
      const promises = userlistadded.map(async (item) => {
        if (item.id) {
          const time = handleGetTimeAndDate();
          const data: SelectOptionsInvitation = {
            avtmaster: {
              url: photoURL.url || '',
              color: photoURL.color || '',
              text: photoURL.text || '',
            },
            name: user.displayName || displayName,
            tripid: id,
            tripname: tripname.value,
            dateandtime: time,
            status: false,
            uid: item.uid,
          };

          if (item.uid) {
            await DataFirebase.AcceptTheInvitation(item.uid, data);
          }
        }
      });
      await Promise.all(promises);
      const datauser: UserInformation = {
        displayName,
        id: currentUserInformation.id,
        photoURL,
        status: true,
        reload: false,
        uid,
      };
      const updatedUserList = [datauser, ...userlistadded];
      const data: SelectOptionsTrip = {
        tripname: tripname.value,
        userlist: updatedUserList,
        id,
        status: false,
        tripmaster: uid || '',
        endtime: '',
        starttime: '',
      };
      await DataFirebase.CreateTrip(id, data);
      dispatch(TripActions.setCurrentIdJoinTrip(id));
      setShowCreateTheTrip(false);
    }
  }
};

export const getUserListData = async () => {
  const value = await DataFirebase.GetUserList();
  return value;
};

export const onChangeCompanions = (
  e: string,
  setCompanions: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >,
) => {
  if (e.length <= 15) {
    setCompanions({ value: e, error: '' });
  }
};
