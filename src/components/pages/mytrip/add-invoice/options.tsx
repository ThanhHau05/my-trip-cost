import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type {
  SelectOptionsInvoice,
  SelectOptionsRenderDropDown,
  UserInformation,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { DataFirebase } from '@/firebase';
import { useGetTimeAndDate } from '@/hooks';
import { selector } from '@/redux';

import { OptionsUser } from './options-user';
import { RenderUserAddInvoice } from './render-user';

export const OptionsAddInvoice = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const { setShowAddInvoice } = useContext(MainContext);

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
    const dataInvoice: SelectOptionsInvoice[] = [];
    const newdata = selectedpayerlist.filter(
      (item) => item.money !== 0 || item.moneySuggest !== 0,
    );
    if (newdata.length !== 0) {
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
        dataInvoice.push(data);
      });
      await Promise.all(promises).then(async () => {
        await DataFirebase.useUpdateInvoiceIntoTripData(
          currentIdJoinTrip,
          dataInvoice,
        );
      });
      setShowAddInvoice(false);
    }
  };
  return (
    <div className="flex h-full flex-col justify-start">
      <div>
        <RenderUserAddInvoice
          data={payerlist}
          setUserUid={setUserUidClick}
          userUid={useruidclick}
        />
      </div>
      <OptionsUser
        invoicelist={selectedpayerlist}
        setInvoiceList={setSelectedPayerList}
        userUid={useruidclick}
      />
      <div className="mt-1 px-3">
        <p className="text-sm">*Save user information before adding</p>
        <div className=" mt-2 h-12 w-full">
          <Button title="Add" onClick={onSubmitAddInvoice} />
        </div>
      </div>
    </div>
  );
};
