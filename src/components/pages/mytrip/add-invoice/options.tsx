import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type {
  SelectOptionsRenderDropDown,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

import { OptionsUser } from './options-user';
import { RenderUserAddInvoice } from './render-user';

export const OptionsAddInvoice = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

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

  return (
    <div className="h-full">
      <RenderUserAddInvoice data={payerlist} />
      <OptionsUser />
    </div>
  );
};
