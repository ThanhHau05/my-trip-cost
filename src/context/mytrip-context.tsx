import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import {
  handleConvertNumberTotextinVND,
  handleFormatCurrentcy,
} from '@/components/pages/handler';
import type {
  SelectOptionsInvoice,
  SelectOptionsPayees,
} from '@/constants/select-options';

interface MytripProps {
  activity: string;
  quantity: string;
  moneysuggest: number;
  setQuantity: Dispatch<SetStateAction<string>>;
  setMoneySuggest: Dispatch<SetStateAction<number>>;
  setMoney: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  setOthers: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  setActivity: Dispatch<SetStateAction<string>>;
  handleChangeMoney: (e: string) => void;
  valueMoney: string;
  valueMoneyText: string;
  selectedpayerlist: SelectOptionsInvoice[];
  setSelectedPayerList: Dispatch<SetStateAction<SelectOptionsInvoice[]>>;
  useruidclick: string;
  setUserUidClick: Dispatch<SetStateAction<string>>;
  others: {
    value: string;
    error: string;
  };
  money: {
    value: string;
    error: string;
  };
  onSaveUserInfoToData: (add?: boolean) => SelectOptionsInvoice[] | undefined;
  deletemoney: boolean;
  setDeleteMoney: Dispatch<SetStateAction<boolean>>;
  qtysuggest: number;
  setQtySuggest: Dispatch<SetStateAction<number>>;
  useruidpayer: string;
  setUserUidPayer: Dispatch<SetStateAction<string>>;
  handleChangeInfoRenderUser: (data: SelectOptionsPayees | undefined) => void;
}

export const MyTripContext = createContext({} as MytripProps);

export const MyTripProvider = ({ children }: { children: ReactNode }) => {
  const [activity, setActivity] = useState('shopping');
  const [others, setOthers] = useState({ value: '', error: '' });
  const [money, setMoney] = useState({ value: '', error: '' });
  const [moneysuggest, setMoneySuggest] = useState(0);
  const [quantity, setQuantity] = useState('0');
  const [qtysuggest, setQtySuggest] = useState(1);
  const [selectedpayerlist, setSelectedPayerList] = useState<
    SelectOptionsInvoice[]
  >([]);
  const [useruidclick, setUserUidClick] = useState('');
  const [useruidpayer, setUserUidPayer] = useState('');
  const [deletemoney, setDeleteMoney] = useState(false);

  useEffect(() => {
    if (qtysuggest !== 0) setQuantity('');
  }, [qtysuggest]);

  const handleChangeMoney = (e: string) => {
    if (e.length <= 9 && +e >= 0) {
      setMoney({ value: e, error: '' });
      setDeleteMoney(false);
    }
  };

  const valueMoney = useMemo(() => {
    return handleFormatCurrentcy(+money.value || moneysuggest);
  }, [money.value, moneysuggest]);
  const valueMoneyText = useMemo(() => {
    return handleConvertNumberTotextinVND(+money.value || moneysuggest);
  }, [money.value, moneysuggest]);

  const isCheck = () => {
    let isError = false;
    if (!money.value && !moneysuggest && (!quantity || !qtysuggest)) {
      isError = true;
      // setMoney({
      //   value: '',
      //   error: 'Please enter an amount or choose a suggest',
      // });
    }
    if (activity === 'others' && !others.value) {
      isError = true;
      setOthers({ value: '', error: 'Please enter another activity' });
    }
    if (money.value && +money.value !== 0 && +money.value < 1000) {
      isError = true;
      setMoney({
        ...money,
        error: 'The amount is too small, at least 1.000 VND',
      });
    }
    if (activity === 'others' && others.value && others.value.length < 3) {
      isError = true;
      setOthers({ ...others, error: 'Too short, at least 3 characters' });
    }
    return !isError;
  };

  const onSaveUserInfoToData = (add?: boolean) => {
    if (
      add &&
      selectedpayerlist.length === 0 &&
      !money.value &&
      !moneysuggest
    ) {
      toast.error('No information has been saved yet.');
      return undefined;
    }

    if (isCheck()) {
      const newValueListPayees: SelectOptionsPayees = {
        activity,
        money: +money.value,
        moneySuggest: moneysuggest,
        qty: +quantity || qtysuggest,
        uid: useruidclick,
        other: others.value,
      };
      const valueUser = selectedpayerlist.find(
        (item) => item.uid === useruidpayer,
      );
      if (valueUser) {
        let listPayees;
        if (valueUser.listPayees.find((item) => item.uid === useruidclick)) {
          const newvalue: SelectOptionsPayees[] = valueUser.listPayees.map(
            (item) => {
              if (item.uid === useruidclick) {
                return newValueListPayees;
              }
              return item;
            },
          );
          listPayees = newvalue;
        } else {
          listPayees = [...valueUser.listPayees, newValueListPayees];
        }
        const totalMoney = listPayees.reduce(
          (a, b) => a + (+b.money + b.moneySuggest) * b.qty,
          0,
        );
        const value: SelectOptionsInvoice = {
          payerImage: {
            color: '',
            text: '',
            url: '',
          },
          payerName: '',
          time: '',
          uid: useruidpayer,
          id: '',
          listPayees,
          totalMoney,
        };

        const newvalue = selectedpayerlist.map((item) => {
          if (item.uid === useruidpayer) {
            return value;
          }
          return item;
        });
        toast.success('Saved!');
        setSelectedPayerList(newvalue);
        return newvalue;
      }

      const value: SelectOptionsInvoice = {
        payerImage: {
          color: '',
          text: '',
          url: '',
        },
        payerName: '',
        time: '',
        uid: useruidpayer,
        id: '',
        listPayees: [newValueListPayees],
        totalMoney:
          (newValueListPayees.money + newValueListPayees.moneySuggest) *
          newValueListPayees.qty,
      };

      if (selectedpayerlist.length !== 0) {
        toast.success('Saved!');
        setSelectedPayerList((e) => [...e, value]);
        return [...selectedpayerlist, value];
      }
      toast.success('Saved!');
      setSelectedPayerList([value]);
      return [value];
    }
    return selectedpayerlist;
  };

  useEffect(() => {
    if (moneysuggest !== 0) {
      setMoney({ value: '', error: '' });
    }
  }, [moneysuggest]);

  useEffect(() => {
    const value = selectedpayerlist
      .find((item) => item.uid === useruidpayer)
      ?.listPayees.find((item) => item.uid === useruidclick);
    handleChangeInfoRenderUser(value);
  }, [selectedpayerlist, useruidclick, useruidpayer]);

  const handleChangeInfoRenderUser = (
    data: SelectOptionsPayees | undefined,
  ) => {
    if (data) {
      setActivity(data.activity);
      setMoney({
        value: data.money === 0 ? '' : data.money.toString(),
        error: '',
      });
      setMoneySuggest(data.moneySuggest);
      if (data.qty <= 10) {
        setQtySuggest(data.qty);
      } else {
        setQuantity(data.qty.toString());
      }
      if (data.activity === 'others')
        setOthers({ value: data.other || '', error: '' });
    } else {
      setMoney({ value: '', error: '' });
      setActivity('shopping');
      if (activity === 'others') setOthers({ value: '', error: '' });
      setMoneySuggest(0);
      setQuantity('');
      setQtySuggest(1);
    }
  };

  const value = {
    activity,
    setActivity,
    others,
    setOthers,
    money,
    setMoney,
    moneysuggest,
    setMoneySuggest,
    quantity,
    setQuantity,
    handleChangeMoney,
    valueMoney,
    valueMoneyText,
    selectedpayerlist,
    setSelectedPayerList,
    useruidclick,
    setUserUidClick,
    onSaveUserInfoToData,
    setDeleteMoney,
    deletemoney,
    qtysuggest,
    setQtySuggest,
    useruidpayer,
    setUserUidPayer,
    handleChangeInfoRenderUser,
  };
  return (
    <MyTripContext.Provider value={value}>{children}</MyTripContext.Provider>
  );
};
