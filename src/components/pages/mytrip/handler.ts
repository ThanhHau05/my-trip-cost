import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { AnyAction } from 'redux';

import type {
  SelectOptionsInvoice,
  SelectOptionsPeopleInVerticalMenu,
  SelectOptionsRenderDropDown,
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase, db } from '@/firebase';
import { TripActions } from '@/redux';

import {
  handleGetTimeAndDate,
  handleRandomIdInvoice,
  handleTotalMoneyTheTrip,
} from '../handler';

export const handleFinishTheTrip = async ({
  id,
  uid,
  setFinishTheTrip,
}: {
  id: number;
  uid: string;
  setFinishTheTrip: (value: string) => void;
}) => {
  const trip = await DataFirebase.GetTrip(id);
  if (trip?.tripmaster === uid) {
    setFinishTheTrip('You want to end the trip with the members');
  }
};

export const useMyTrip = ({
  setUidMaster,
  setTotalMoney,
  setStartTime,
  setTripName,
  setValueInvoice,
  setValueUserInVMenu,
  setReserveMoney,
  setReload,
  dispatch,
  id,
  infoUser,
  setLoading,
}: {
  setUidMaster: (value: string) => void;
  setTotalMoney: (value: number) => void;
  setStartTime: (value: string) => void;
  setTripName: (value: string) => void;
  setValueInvoice: Dispatch<SetStateAction<SelectOptionsInvoice[]>>;
  setValueUserInVMenu: Dispatch<
    SetStateAction<SelectOptionsPeopleInVerticalMenu[]>
  >;
  setReserveMoney: (value: number) => void;
  setReload: (value: boolean) => void;
  dispatch: Dispatch<AnyAction>;
  id: number;
  infoUser: UserInformation;
  setLoading: (value: boolean) => void;
}) => {
  const handle = async () => {
    const docRef = doc(db, 'Trips', id.toString());
    onSnapshot(docRef, async (data) => {
      if (data.exists()) {
        const { trip } = data.data();
        const valueTrip: SelectOptionsTrip = trip;
        if (valueTrip.status) {
          setUidMaster(valueTrip.tripmaster);

          const value = await handleTotalMoneyTheTrip(id);
          const valueStartTime = valueTrip?.starttime;
          setTotalMoney(value);
          setStartTime(valueStartTime || '');
          setTripName(valueTrip?.tripname || '');
          setValueInvoice(valueTrip?.invoice || []);

          const newvalue: SelectOptionsPeopleInVerticalMenu[] =
            valueTrip?.userlist.map((item) => {
              return {
                uid: item.uid,
                money: item.totalmoney || 0,
                img: {
                  color: item.photoURL.color || '',
                  text: item.photoURL.text || '',
                  url: item.photoURL.url || '',
                },
                name: item.displayName,
                id: item.id || 0,
              };
            });
          setValueUserInVMenu(newvalue);
          setReserveMoney(valueTrip.reservemoney || 0);
          const checkReload = valueTrip.userlist.find(
            (item) => item.uid === infoUser.uid,
          );
          if (checkReload?.reload) {
            setReload(true);
            const newUserList = valueTrip.userlist.map((item) => {
              if (item.uid === infoUser.uid) {
                return {
                  ...item,
                  reload: false,
                };
              }
              return item;
            });
            await setDoc(docRef, {
              trip: { ...valueTrip, userlist: newUserList },
            });
          }
        }
        setLoading(false);
      } else {
        dispatch(TripActions.setCurrentIdJoinTrip(0));
        setLoading(false);
      }
    });
  };
  handle();
};

export const onSubmitAddInvoice = async ({
  onSaveUserInfoToData,
  id,
  setSelectedPayerList,
  setShowAddInvoice,
}: {
  onSaveUserInfoToData: (
    add?: boolean | undefined,
  ) => SelectOptionsInvoice[] | undefined;
  id: number;
  setSelectedPayerList: Dispatch<SetStateAction<SelectOptionsInvoice[]>>;
  setShowAddInvoice: Dispatch<SetStateAction<boolean>>;
}) => {
  const dataInvoice: SelectOptionsInvoice[] = [];
  const value = onSaveUserInfoToData(true);
  const trip = await DataFirebase.GetTrip(id);
  if (value) {
    if (trip) {
      const { userlist } = trip;
      const newuserlist = userlist.map((item1) => {
        const valueFind = value?.find((item2) => item2.uid === item1.uid);
        if (valueFind) {
          return {
            ...item1,
            totalmoney:
              (item1.totalmoney || 0) +
              (valueFind.money + valueFind.moneySuggest) * valueFind.qty,
          };
        }
        return item1;
      });
      await DataFirebase.AddTotalForUser(id, newuserlist);
    }
  }
  if (value && value.length !== 0) {
    const promises = value.map(async (item) => {
      const userinfo = await DataFirebase.GetUserInfoInTrip(item.uid, id);
      const { moneySuggest, qty, uid, other } = item;
      const idInvoice = handleRandomIdInvoice();
      const data: SelectOptionsInvoice = {
        activity: item.activity,
        money: item.money,
        moneySuggest,
        payerImage: {
          url: userinfo?.photoURL.url || '',
          color: userinfo?.photoURL.color || '',
          text: userinfo?.photoURL.text || '',
        },
        payerName: userinfo?.displayName || '',
        time: handleGetTimeAndDate(),
        qty,
        uid,
        other,
        id: idInvoice,
      };
      dataInvoice.push(data);
    });
    await Promise.all(promises).then(async () => {
      await DataFirebase.UpdateInvoiceIntoTripData(id, dataInvoice);
      setSelectedPayerList([]);
    });
    setShowAddInvoice(false);
  }
};

export const handleGetPayerList = async ({
  setPayerList,
  id,
}: {
  setPayerList: Dispatch<SetStateAction<SelectOptionsRenderDropDown[]>>;
  id: number;
}) => {
  const userlist: UserInformation[] = await DataFirebase.GetUserListInTrip(id);
  const newArr: SelectOptionsRenderDropDown[] = userlist.map((item) => ({
    title: item.displayName,
    image: {
      url: item.photoURL.url,
      color: item.photoURL.color,
      text: item.photoURL.text,
    },
    value: item.uid,
  }));
  setPayerList(newArr);
};

export const handleOnChangeQuantity = (
  e: string,
  onChange: (value: string) => void,
) => {
  if (e.length <= 2 && +e <= 50) {
    onChange(e);
  }
};

export const handleClickOutSideQuantity = (
  inputRef: RefObject<HTMLInputElement>,
  valueQuantity: string,
  onChange: (value: string) => void,
) => {
  const handle = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      if (valueQuantity === '') {
        onChange('1');
      }
    }
  };

  document.addEventListener('mousedown', handle);
  return () => {
    document.removeEventListener('mousedown', handle);
  };
};

export const handleOnChangeMoneySuggest = ({
  e,
  valueMoneySuggest,
  onChange,
  setDeleteMoney,
}: {
  e: number;
  valueMoneySuggest: number;
  onChange: (value: number) => void;
  setDeleteMoney: (value: boolean) => void;
}) => {
  if (valueMoneySuggest === 0 || e !== valueMoneySuggest) {
    onChange(+e);
    setDeleteMoney(false);
  } else {
    onChange(0);
    setDeleteMoney(true);
  }
};

export const onSubmitRenderUser = ({
  value,
  onSaveUserInfoToData,
  setUserUidClick,
  selectedpayerlist,
  setActivity,
  setMoney,
  setMoneySuggest,
  setQuantity,
  setOthers,
  activity,
}: {
  value: string;
  onSaveUserInfoToData: (
    add?: boolean | undefined,
  ) => SelectOptionsInvoice[] | undefined;
  setUserUidClick: (value: string) => void;
  selectedpayerlist: SelectOptionsInvoice[];
  setQuantity: (value: string) => void;
  setMoney: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  setMoneySuggest: (value: number) => void;
  setOthers: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  activity: string;
  setActivity: (value: string) => void;
}) => {
  onSaveUserInfoToData();
  setUserUidClick(value);
  const values = selectedpayerlist.find((item) => item.uid === value);
  if (values) {
    setActivity(values.activity);
    setMoney({ value: values.money.toString(), error: '' });
    setMoneySuggest(values.moneySuggest);
    setQuantity(values.qty.toString());
    if (values.activity === 'others')
      setOthers({ value: values.other || '', error: '' });
  } else {
    setMoney({ value: '', error: '' });
    setActivity('shopping');
    if (activity === 'others') setOthers({ value: '', error: '' });
    setMoneySuggest(0);
    setQuantity('1');
  }
};

export const handleCheckStatusTrip = (
  id: string | string[],
  setStatus: (value: boolean) => void,
) => {
  const docRef = doc(db, 'Trips', id.toString());
  onSnapshot(docRef, (data) => {
    if (data.exists()) {
      const { trip } = data.data();
      const valueTrip: SelectOptionsTrip = trip;
      setStatus(valueTrip.status);
    }
  });
};
