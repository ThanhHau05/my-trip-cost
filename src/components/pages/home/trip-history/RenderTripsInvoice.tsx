import type { Dispatch, SetStateAction } from 'react';

import type { SelectOptionsTrip } from '@/constants/select-options';

import { handleFormatCurrentcy } from '../../handler';
import { RenderAvt } from './RenderAvt';

export const RenderTripsInvoice = ({
  data,
  setTripHistory,
}: {
  data: SelectOptionsTrip[];
  setTripHistory: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>;
}) => {
  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="mx-3 rounded-2xl bg-white px-3 py-2 drop-shadow-md transition-all hover:bg-gray-100 hover:shadow"
          onClick={() => setTripHistory(item)}
        >
          <h2 className="text-xl font-medium">{item.tripname}</h2>
          <h2>
            Total money:{' '}
            <span className="font-medium">
              {item.totalmoney ? handleFormatCurrentcy(item.totalmoney) : 0} VND
            </span>
          </h2>
          <h2>
            Reserve money:{' '}
            <span className="font-medium">
              {item.reservemoney ? handleFormatCurrentcy(item.reservemoney) : 0}{' '}
              VND
            </span>
          </h2>
          <div className="flex items-center justify-start">
            <h2 className="pr-2">Members:</h2>
            <RenderAvt data={item.userlist} />
          </div>
          <span className="block">Start time: {item.starttime}</span>
          <span className="block">End time: {item.endtime}</span>
        </div>
      ))}
    </>
  );
};
