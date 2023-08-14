import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type {
  SelectOptionsInvoice,
  SelectOptionsRenderDropDown,
  UserInformation,
  VerticalMenuUserInfo,
} from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { useGetTimeAndDate } from '@/hooks';
import { selector } from '@/redux';

import { OptionsUser } from './options-user';
import { RenderUserAddInvoice } from './render-user';

export const OptionsAddInvoice = ({
  setUidAndMoney,
}: {
  setUidAndMoney: (value: VerticalMenuUserInfo[]) => void;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const [payerlist, setPayerList] = useState<SelectOptionsRenderDropDown[]>([]);

  const [selectedpayerlist, setSelectedPayerList] = useState<
    SelectOptionsInvoice[]
  >([]);
  const [useruidclick, setUserUidClick] = useState('');

  useEffect(() => {
    const handle = async () => {
      const userlist: UserInformation[] =
        await DataFirebase.useGetUserListInTrip(currentIdJoinTrip);
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
    handle();
  }, [currentIdJoinTrip]);

  const onSubmitAddInvoice = async () => {
    let money = 0;
    const dataInvoice: SelectOptionsInvoice[] =
      (await DataFirebase.useGetInvoiceInTripData(currentIdJoinTrip)) || [];
    const userandmoney: VerticalMenuUserInfo[] = [];
    const promises = selectedpayerlist.map(async (item) => {
      const userinfo = await DataFirebase.useGetUserInfoInTrip(
        item.uid,
        currentIdJoinTrip,
      );
      const { activity, moneySuggest, qty, uid, other } = item;
      const data: SelectOptionsInvoice = {
        activity,
        money: item.money,
        moneySuggest,
        payerImage: {
          url: userinfo?.photoURL.url || '',
          color: userinfo?.photoURL.color || '',
          text: userinfo?.photoURL.text || '',
        },
        payerName: userinfo?.displayName || '',
        time: useGetTimeAndDate(),
        qty,
        uid,
        other,
      };
      money += item.money + item.moneySuggest;
      dataInvoice.push(data);
      userandmoney.push({ money: item.money + moneySuggest, uid });
    });
    await Promise.all(promises).then(async () => {
      await DataFirebase.useUpdateInvoiceIntoTripData(
        currentIdJoinTrip,
        dataInvoice,
      );
    });
    if (money !== 0) {
      setUidAndMoney(userandmoney);
    }
  };
  return (
    <div className="flex h-full flex-col justify-start">
      <div>
        <RenderUserAddInvoice
          data={payerlist}
          setUserUid={setUserUidClick}
          userUid={useruidclick}
          invoicelist={selectedpayerlist}
          setSelectedUserClick={setSelectedPayerList}
        />
      </div>
      <OptionsUser
        invoicelist={selectedpayerlist}
        setInvoiceList={setSelectedPayerList}
        userUid={useruidclick}
      />
      <div className=" mt-5 h-12 w-full px-3">
        <Button title="Add" onClick={onSubmitAddInvoice} />
      </div>
    </div>
  );
};
