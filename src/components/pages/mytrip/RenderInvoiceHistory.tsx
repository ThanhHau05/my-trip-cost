import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type {
  SelectOptionsInvoice,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

import { BtnAddInvoice } from './BtnAddInvoice';
import { RenderInvoice } from './RenderInvoice';

export const RenderInvoiceHistory = ({
  starttime,
  valueInvoice,
}: {
  starttime: string;
  valueInvoice: SelectOptionsInvoice[];
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const [userlist, setUserList] = useState<UserInformation[]>([]);

  useEffect(() => {
    const handle = async () => {
      const trip = await DataFirebase.GetTrip(currentIdJoinTrip);
      if (trip) {
        const valueUserList = trip.userlist;
        setUserList(valueUserList);
      }
    };
    handle();
  }, [currentIdJoinTrip]);

  return (
    <div className="relative h-full w-full rounded-t-[35px] pt-5 shadow">
      <div className="relative z-10 h-full w-full">
        <div className="scrollbarstyle flex h-[calc(100%-73px)] w-full flex-col overflow-auto rounded-t-2xl px-3 pb-5">
          <div className="z-10 flex select-none items-center rounded-2xl bg-slate-100/70 py-2 shadow drop-shadow-md">
            <div className="ml-6 mr-3 inline-block h-3 w-3 rounded-full bg-gray-800" />
            <div className="flex flex-col">
              <span className="text-lg">Start the trip</span>
              <span>{starttime}</span>
            </div>
          </div>
          {valueInvoice ? (
            <RenderInvoice showClose data={valueInvoice} userList={userlist} />
          ) : null}
        </div>
        <BtnAddInvoice />
      </div>
    </div>
  );
};
