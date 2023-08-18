import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import type { SelectOptionsInvoice } from '@/constants/select-options';
import { useConvertNumberTotextinVND, useFormatCurrentcy } from '@/hooks';

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
}

export const MyTripContext = createContext({} as MytripProps);

export const MyTripProvider = ({ children }: { children: ReactNode }) => {
  const [activity, setActivity] = useState('shopping');
  const [others, setOthers] = useState({ value: '', error: '' });
  const [money, setMoney] = useState({ value: '', error: '' });
  const [moneysuggest, setMoneySuggest] = useState(0);
  const [quantity, setQuantity] = useState('1');
  const [selectedpayerlist, setSelectedPayerList] = useState<
    SelectOptionsInvoice[]
  >([]);
  const [useruidclick, setUserUidClick] = useState('');
  const [deletemoney, setDeleteMoney] = useState(false);

  const handleChangeMoney = (e: string) => {
    if (e.length <= 9 && +e >= 0) {
      setMoney({ value: e, error: '' });
      setDeleteMoney(false);
    }
  };

  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(+money.value || moneysuggest);
  }, [money.value, moneysuggest]);
  const valueMoneyText = useMemo(() => {
    return useConvertNumberTotextinVND(+money.value || moneysuggest);
  }, [money.value, moneysuggest]);

  const isCheck = () => {
    let isError = false;
    if (!money.value && !moneysuggest) {
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
      const value: SelectOptionsInvoice = {
        activity,
        money: +money.value,
        moneySuggest: +moneysuggest,
        payerImage: {
          color: '',
          text: '',
          url: '',
        },
        payerName: '',
        qty: +quantity,
        time: '',
        uid: useruidclick,
        other: others.value,
        id: '',
      };
      if (
        selectedpayerlist &&
        !selectedpayerlist.find((item) => item.uid === useruidclick)
      ) {
        toast.success('Saved!');
        setSelectedPayerList((e) => [...e, value]);
        return [...selectedpayerlist, value];
      }
      if (
        selectedpayerlist &&
        selectedpayerlist.find((item) => item.uid === useruidclick)
      ) {
        let isCheckValue = false;
        const values = selectedpayerlist.map((item) => {
          if (
            item.uid === useruidclick &&
            (item.money !== +money.value || item.moneySuggest !== +moneysuggest)
          ) {
            isCheckValue = true;
            return {
              activity,
              money: +money.value,
              moneySuggest: +moneysuggest,
              payerImage: {
                color: '',
                text: '',
                url: '',
              },
              payerName: '',
              qty: +quantity,
              time: '',
              uid: useruidclick,
              other: others.value,
              id: '',
            };
          }
          return item;
        });
        if (isCheckValue) {
          toast.success('Saved!');
        }
        setSelectedPayerList(values);
        return values;
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
    const value = selectedpayerlist.find((item) => item.uid === useruidclick);
    if (value) {
      setActivity(value.activity);
      setMoney({ value: value.money.toString(), error: '' });
      setMoneySuggest(value.moneySuggest);
      setQuantity(value.qty.toString());
      if (value.activity === 'others')
        setOthers({ value: value.other || '', error: '' });
    } else {
      setMoney({ value: '', error: '' });
      setActivity('shopping');
      if (activity === 'others') setOthers({ value: '', error: '' });
      setMoneySuggest(0);
      setQuantity('1');
    }
  }, [selectedpayerlist, useruidclick]);

  useEffect(() => {
    if (
      selectedpayerlist.find(
        (item) =>
          item.uid === useruidclick &&
          (item.money !== +money.value || item.moneySuggest !== moneysuggest),
      )
    ) {
      if (money.value === '' || moneysuggest === 0) {
        const values = selectedpayerlist.filter(
          (item) => item.uid !== useruidclick,
        );
        setSelectedPayerList(values);
        toast.success('Saved!');
      }
    }
  }, [money.value, moneysuggest, useruidclick, deletemoney]);

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
  };
  return (
    <MyTripContext.Provider value={value}>{children}</MyTripContext.Provider>
  );
};
