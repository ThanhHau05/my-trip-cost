import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type {
  SelectOptionsInvoice,
  SelectOptionsRenderDropDown,
  UserInformation,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { MyTripContext } from '@/context/mytrip-context';
import { DataFirebase } from '@/firebase';
import { useGetTimeAndDate, useRandomIdInvoice } from '@/hooks';
import { selector } from '@/redux';

import { OptionsUser } from './options-user';
import { RenderUserAddInvoice } from './render-user';

export const OptionsAddInvoice = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const { setShowAddInvoice } = useContext(MainContext);

  const { onSaveUserInfoToData, setSelectedPayerList } =
    useContext(MyTripContext);

  const [payerlist, setPayerList] = useState<SelectOptionsRenderDropDown[]>([]);

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
    const value = onSaveUserInfoToData(true);
    if (value && value.length !== 0) {
      const promises = value.map(async (item) => {
        const userinfo = await DataFirebase.useGetUserInfoInTrip(
          item.uid,
          currentIdJoinTrip,
        );
        const { activity, moneySuggest, qty, uid, other } = item;
        const id = useRandomIdInvoice();
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
          id,
        };
        dataInvoice.push(data);
      });
      await Promise.all(promises).then(async () => {
        await DataFirebase.useUpdateInvoiceIntoTripData(
          currentIdJoinTrip,
          dataInvoice,
        );
        setSelectedPayerList([]);
      });
      setShowAddInvoice(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div>
          <RenderUserAddInvoice data={payerlist} />
        </div>
        <OptionsUser />
      </div>
      <div className=" mb-5 h-12 w-full px-3">
        <Button title="Add" onClick={onSubmitAddInvoice} />
      </div>
    </div>
  );
};
