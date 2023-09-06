import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { selector } from '@/redux';

import { handleGetData, onChangeReserveMoney } from './handler';
import { RenderReserveMoney } from './render-reserve-money';
import { RenderUser } from './render-user';

export const RenderoptionStartCreateTrip = ({
  masterUid,
  reservemoney,
  setReserveMoney,
}: {
  masterUid: string;
  reservemoney: {
    value: string;
    error: string;
  };
  setReserveMoney: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const [data, setData] = useState<SelectOptionsTrip>();
  const [userlist, setUserList] = useState<UserInformation[]>([]);

  useEffect(() => {
    if (currentIdJoinTrip) {
      handleGetData(currentIdJoinTrip, setData);
    }
  }, [currentIdJoinTrip]);
  return (
    <div>
      <h2 className="text-lg font-medium drop-shadow-md">
        Trip name: <span className="text-2xl font-bold">{data?.tripname}</span>
      </h2>
      <RenderReserveMoney
        masteruid={masterUid}
        error={reservemoney.error}
        value={reservemoney.value}
        onChangeMoney={(e) => onChangeReserveMoney(e, setReserveMoney)}
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
        <div className="scrollbarstyle h-60 overflow-auto">
          <div className="grid grid-cols-5 justify-items-center gap-2 pt-3">
            {!userlist ? (
              <span className="h-12 w-12 rounded-full bg-slate-300 drop-shadow-md" />
            ) : (
              <RenderUser
                masterUid={masterUid}
                setUserList={setUserList}
                userlist={userlist}
              />
            )}
            <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-white drop-shadow-md">
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
