import { doc, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { DataFirebase, db } from '@/firebase';
import { useGetTimeAndDate } from '@/hooks';
import { selector } from '@/redux';

import { RenderReserveMoney } from './render-reserve-money';
import { RenderUser } from './render-user';

export const StatusCreateTrip = ({
  masterUid,
  disabledStartTrip,
}: {
  masterUid: string;
  disabledStartTrip: boolean;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const { setConentConfirm } = useContext(MainContext);

  const [data, setData] = useState<SelectOptionsTrip>();
  const [userlist, setUserList] = useState<UserInformation[]>([]);
  const [reservemoney, setReserveMoney] = useState({ value: '', error: '' });

  useEffect(() => {
    const handle = async (id: number) => {
      const datas = await DataFirebase.useGetTrip(id);
      setData(datas);
    };
    if (currentIdJoinTrip) {
      handle(currentIdJoinTrip);
    }
  }, [currentIdJoinTrip]);

  const onStartTrip = async () => {
    if (reservemoney.value && +reservemoney.value < 50000) {
      setReserveMoney({
        ...reservemoney,
        error: 'Minimum reserve amount 100.000 VND',
      });
    } else {
      const userlists: UserInformation[] =
        await DataFirebase.useGetUserListInTrip(currentIdJoinTrip);
      const status = userlists.find((item) => item.status === false);
      if (status === undefined) {
        const trip = await DataFirebase.useGetTrip(currentIdJoinTrip);
        const docRef = doc(db, 'Trips', currentIdJoinTrip.toString());
        if (trip) {
          const valueStartTime = useGetTimeAndDate();
          await setDoc(docRef, {
            trip: {
              ...trip,
              status: true,
              reservemoney: +reservemoney.value,
              starttime: valueStartTime,
            },
          });
        }
      }
    }
  };

  const onChangeReserveMoney = (e: string) => {
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

  return (
    <div className="relative flex h-full w-full flex-col justify-between rounded-t-[40px] bg-white px-5 pt-5">
      <div className="border_welcome_bottom_status_trip absolute bottom-14 left-0 h-56 w-40 bg-teal-500" />
      <div className="border_welcome_top absolute right-0 top-10 h-56 w-40 bg-teal-500" />
      <div>
        <h2 className="text-lg font-medium drop-shadow-md">
          Trip name:{' '}
          <span className="text-2xl font-bold">{data?.tripname}</span>
        </h2>
        <RenderReserveMoney
          masteruid={masterUid}
          error={reservemoney.error}
          value={reservemoney.value}
          onChangeMoney={onChangeReserveMoney}
        />
        <div className="mt-6">
          <h2 className="text-lg font-medium drop-shadow-md">Participants:</h2>
          <div className="inline-block">
            <div>
              <span className="inline-block h-2 w-2 rounded-full border border-white bg-orange-500 drop-shadow-md" />
              <span className="text-sm"> : Waiting</span>
            </div>
            <div>
              <span className="inline-block h-2 w-2 rounded-full border border-white bg-green-500 drop-shadow-md" />
              <span className="text-sm"> : Ready</span>
            </div>
          </div>
          <div className="dropdown h-60 overflow-auto">
            <div className="grid grid-cols-5 gap-2 pt-6">
              {!userlist ? (
                <span className="h-12 w-12 rounded-full bg-slate-300 drop-shadow-md" />
              ) : (
                <RenderUser setUserList={setUserList} userlist={userlist} />
              )}
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-white drop-shadow-md">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-9 flex h-12 w-full items-center justify-center gap-3">
          <Button
            title="Start trip"
            onClick={onStartTrip}
            disabled={disabledStartTrip}
          />
          <Button
            bgWhite
            title="Cancel trip"
            onClick={() => setConentConfirm('Want to cancel your trip ?')}
          />
        </div>
      </div>
    </div>
  );
};
