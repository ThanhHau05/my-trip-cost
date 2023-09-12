import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import type { NextRouter } from 'next/router';
import type { Dispatch, SetStateAction } from 'react';
import type { AnyAction } from 'redux';

import type {
  SelectOptionsInvoice,
  SelectOptionsPayees,
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

export const handleNotiFinishTrip = ({
  value,
  setFinishTheTrip,
}: {
  value: string;
  setFinishTheTrip: Dispatch<
    SetStateAction<{
      value: string;
      isCheckValue: string;
    }>
  >;
}) => {
  if (value === 'finish') {
    setFinishTheTrip({
      value: 'You want to end the trip with the members',
      isCheckValue: value,
    });
  } else if (value === 'leave') {
    setFinishTheTrip({ value: 'Want to leave the trip?', isCheckValue: value });
  }
};

export const onSubmitNotiFinishTrip = async ({
  finishthetrip,
  setLoadingStartNow,
  setFinishTheTrip,
  setShowVerticalMenu,
  currentIdJoinTrip,
  dispatch,
  uid,
  router,
}: {
  finishthetrip: {
    value: string;
    isCheckValue: string;
  };
  setLoadingStartNow: (value: boolean) => void;
  setFinishTheTrip: Dispatch<
    SetStateAction<{
      value: string;
      isCheckValue: string;
    }>
  >;
  setShowVerticalMenu: (value: boolean) => void;
  currentIdJoinTrip: number;
  dispatch: Dispatch<AnyAction>;
  uid: string;
  router: NextRouter;
}) => {
  setFinishTheTrip({ value: '', isCheckValue: '' });
  const docRef = doc(db, 'Trips', currentIdJoinTrip.toString());
  const valueTrip = await DataFirebase.GetTrip(currentIdJoinTrip);
  if (valueTrip) {
    if (finishthetrip.isCheckValue === 'finish') {
      setLoadingStartNow(true);
      setShowVerticalMenu(false);
      await setDoc(docRef, {
        trip: {
          ...valueTrip,
          status: false,
          endtime: handleGetTimeAndDate(),
          totalmoney: await handleTotalMoneyTheTrip(currentIdJoinTrip),
        },
      });
      const trip = await DataFirebase.GetTrip(currentIdJoinTrip);
      trip?.userlist?.map(async (item) => {
        if (trip) {
          if (!item.uid.includes('name-') && item.status) {
            await DataFirebase.AddTempoaryNotice(item.uid, trip);
          }
        }
      });
      const newUserList = valueTrip?.userlist.map(
        (item) => item.status === false,
      );
      await setDoc(docRef, {
        trip: {
          ...trip,
          userlist: newUserList,
        },
      });
      dispatch(TripActions.setCurrentIdJoinTrip(0));
      setLoadingStartNow(false);
    } else {
      let totalMoney = 0;
      const dataInvoice: SelectOptionsInvoice[] = [];
      const newUserList = valueTrip?.userlist.map((item) => {
        if (item.uid === uid) {
          totalMoney = item.totalmoney || 0;
          return {
            ...item,
            status: false,
          };
        }
        return item;
      });
      const userinfo = await DataFirebase.GetUserInfoInTrip(
        uid,
        currentIdJoinTrip,
      );
      const idInvoice = handleRandomIdInvoice();
      const data: SelectOptionsInvoice = {
        leaveTheTrip: {
          info: {
            payerImage: {
              url: userinfo?.photoURL.url || '',
              color: userinfo?.photoURL.color || '',
              text: userinfo?.photoURL.text || '',
            },
            payerName: userinfo?.displayName || '',
            time: handleGetTimeAndDate(),
            uid,
            id: idInvoice,
            totalMoney,
          },
        },
      };
      dataInvoice.push(data);
      await setDoc(docRef, {
        trip: {
          ...valueTrip,
          userlist: newUserList,
          totalmoney: await handleTotalMoneyTheTrip(currentIdJoinTrip),
        },
      })
        .then(async () => {
          await DataFirebase.UpdateInvoiceIntoTripData(
            currentIdJoinTrip,
            dataInvoice,
          );
        })
        .then(async () => {
          const newValueDataTrip = await DataFirebase.GetTrip(
            currentIdJoinTrip,
          );
          if (newValueDataTrip) {
            const newValueTrip: SelectOptionsTrip = {
              ...newValueDataTrip,
              endtime: handleGetTimeAndDate(),
            };
            await DataFirebase.AddTempoaryNotice(uid, newValueTrip);
          }
        });
      dispatch(TripActions.setCurrentIdJoinTrip(0));
      router.push('/');
      setLoadingStartNow(false);
    }
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
                status: item.status,
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
        const valueFind = value.find(
          (item2) => item2.invoice?.info.uid === item1.uid,
        );
        if (valueFind?.invoice?.listPayees) {
          return {
            ...item1,
            totalmoney:
              (item1.totalmoney || 0) +
              valueFind.invoice.listPayees.reduce(
                (a, b) => a + (b.money + b.moneySuggest) * b.qty,
                0,
              ),
          };
        }
        return item1;
      });
      await DataFirebase.AddTotalForUser(id, newuserlist);
    }
  }
  if (value && value.length !== 0) {
    const promises = value.map(async (item) => {
      const userinfo = await DataFirebase.GetUserInfoInTrip(
        item.invoice?.info.uid || '',
        id,
      );
      const idInvoice = handleRandomIdInvoice();
      const data: SelectOptionsInvoice = {
        invoice: {
          info: {
            payerImage: {
              url: userinfo?.photoURL.url || '',
              color: userinfo?.photoURL.color || '',
              text: userinfo?.photoURL.text || '',
            },
            payerName: userinfo?.displayName || '',
            time: handleGetTimeAndDate(),
            uid: item.invoice?.info.uid || '',
            id: idInvoice,
            totalMoney: item.invoice?.info.totalMoney || 0,
          },
          listPayees: item.invoice?.listPayees || [],
        },
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
  const docRef = doc(db, 'Trips', id.toString());
  onSnapshot(docRef, (data) => {
    if (data.exists()) {
      const valueTrip: SelectOptionsTrip = data.data().trip;
      if (valueTrip) {
        const newArr: SelectOptionsRenderDropDown[] = valueTrip.userlist.map(
          (item) => ({
            title: item.displayName,
            image: {
              url: item.photoURL?.url,
              color: item.photoURL?.color,
              text: item.photoURL?.text,
            },
            value: item.uid,
            status: item.status,
          }),
        );
        setPayerList(newArr);
      }
    }
  });
};

export const handleOnChangeQuantity = (
  e: string,
  onChange: (value: string) => void,
) => {
  if (e.length <= 2 && +e <= 50) {
    onChange(e);
  }
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
  useruidpayer,
  handleChangeInfoRenderUser,
}: {
  value: string;
  onSaveUserInfoToData: (
    add?: boolean | undefined,
  ) => SelectOptionsInvoice[] | undefined;
  setUserUidClick: (value: string) => void;
  selectedpayerlist: SelectOptionsInvoice[];
  useruidpayer: string;
  handleChangeInfoRenderUser: (value: SelectOptionsPayees | undefined) => void;
}) => {
  onSaveUserInfoToData();
  setUserUidClick(value);

  const data = selectedpayerlist.find(
    (item) => item.invoice?.info.uid === useruidpayer,
  );
  if (data?.invoice?.listPayees) {
    const result = data.invoice.listPayees.find((item) => item.uid === value);
    handleChangeInfoRenderUser(result);
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
