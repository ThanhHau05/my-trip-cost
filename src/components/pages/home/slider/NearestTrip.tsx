import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

import type { SelectOptionsTrip } from '@/constants/select-options';
import { useGetTimeAgo } from '@/hooks';
import { selector } from '@/redux';

import { handleFormatCurrentcy } from '../../handler';
import { handleDeleteTripHistory } from '../handler';
import { RenderAvt } from '../trip-history';

export const NearestTrip = ({
  data,
  onClick,
  btnClose,
}: {
  data: SelectOptionsTrip;
  onClick?: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>;
  btnClose?: boolean;
}) => {
  const { currentUserInformation } = useSelector(selector.user);
  return (
    <div className="group relative">
      {btnClose ? (
        <GrClose
          className="absolute right-4 top-4 z-10 hidden cursor-pointer group-hover:block"
          onClick={() =>
            handleDeleteTripHistory(currentUserInformation.uid, data.id)
          }
        />
      ) : null}
      <div
        onClick={() => (onClick ? onClick(data) : null)}
        className="mt-2 cursor-pointer rounded-xl bg-slate-50 px-3 py-2 drop-shadow-md transition-all hover:shadow-md"
      >
        <h2 className="mb-3 text-2xl font-bold">{data.tripname}</h2>
        <div className="flex flex-col gap-3">
          <TripValue title="Total cost:">
            <span className="rounded-lg border-2 border-slate-500 bg-gray-50 px-2 py-1 text-lg font-bold text-gray-900/90">
              {data.totalmoney ? handleFormatCurrentcy(+data.totalmoney) : 0}{' '}
              VND
            </span>
          </TripValue>
          <div className="flex items-center justify-between">
            <div>
              <RenderAvt data={data.userlist} />
            </div>
            <h2 className="mt-1 text-xs font-medium text-gray-600">
              {useGetTimeAgo(data?.endtime)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const TripValue = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <h2>
      <span className="text-sm font-medium text-gray-700">{title} </span>
      {children}
    </h2>
  );
};
