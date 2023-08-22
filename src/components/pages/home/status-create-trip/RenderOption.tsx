import type { Dispatch, SetStateAction } from 'react';

import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';

import { onChangeReserveMoney } from './handler';
import { RenderReserveMoney } from './render-reserve-money';
import { RenderUser } from './render-user';

export const RenderoptionStartCreateTrip = ({
  data,
  masterUid,
  reservemoney,
  setReserveMoney,
  userlist,
  setUserList,
}: {
  data: SelectOptionsTrip | undefined;
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
  userlist: UserInformation[];
  setUserList: Dispatch<SetStateAction<UserInformation[]>>;
}) => {
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
          <div className="grid grid-cols-5 gap-2 pt-8">
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
  );
};
