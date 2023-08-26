import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import type { Dispatch, SetStateAction } from 'react';

import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase, db } from '@/firebase';

import { handleGetTimeAndDate } from '../../handler';

export const handleRemoveValue = async ({
  value,
  id,
}: {
  value: string;
  id: number;
}) => {
  if (value) {
    const docRef = doc(db, 'Trips', id.toString());
    const trip = await DataFirebase.GetTrip(id);
    if (trip) {
      const { reservemoney } = trip;
      if (reservemoney !== 0) {
        await setDoc(docRef, {
          trip: {
            ...trip,
            reservemoney: 0,
          },
        });
      }
    }
  }
};

export const handleDataFirebaseRenderUser = async (
  id: number,
  setUserList: (value: UserInformation[]) => void,
) => {
  const docRef = doc(db, 'Trips', id.toString());
  onSnapshot(docRef, (data) => {
    if (data.exists()) {
      const invitationData: SelectOptionsTrip = data.data().trip;
      setUserList(invitationData.userlist);
    }
  });
};

export const onChangeReserveMoney = (
  e: string,
  setReserveMoney: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >,
) => {
  if (+e >= 0) {
    if (+e < 50000 && +e > 0) {
      setReserveMoney({
        value: e,
        error: 'Minimum reserve amount 100.000 VND',
      });
    } else {
      setReserveMoney({ value: e, error: '' });
    }
  }
};

export const onStartTrip = async (
  checkReserveMoney: number,
  reservemoney: {
    value: string;
    error: string;
  },
  setReserveMoney: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >,
  id: number,
  setLoading: (value: boolean) => void,
) => {
  if (checkReserveMoney !== 0 && checkReserveMoney < 100000) {
    setReserveMoney({
      ...reservemoney,
      error: 'Minimum reserve amount 100.000 VND',
    });
  } else {
    const userlists: UserInformation[] = await DataFirebase.GetUserListInTrip(
      id,
    );
    setLoading(true);
    const status = userlists.find((item) => item.status === false);
    if (status === undefined) {
      const trip = await DataFirebase.GetTrip(id);
      const docRef = doc(db, 'Trips', id.toString());
      if (trip) {
        const valueStartTime = handleGetTimeAndDate();
        await setDoc(docRef, {
          trip: {
            ...trip,
            status: true,
            starttime: valueStartTime,
          },
        });
      }
    }
  }
};

export const handleGetData = async (
  id: number,
  setData: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>,
) => {
  const datas = await DataFirebase.GetTrip(id);
  setData(datas);
};

export const handleCheckReserveMoney = async (id: number, value: string) => {
  const trip = await DataFirebase.GetTrip(id);
  const docRef = doc(db, 'Trips', id.toString());
  if (+value >= 100000) {
    if (+value >= 100000) {
      await setDoc(docRef, {
        trip: {
          ...trip,
          reservemoney: +value,
        },
      });
    }
  } else {
    await setDoc(docRef, {
      trip: {
        ...trip,
        reservemoney: 0,
      },
    });
  }
};
