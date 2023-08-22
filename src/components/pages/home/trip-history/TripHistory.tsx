import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';

import type { SelectOptionsTrip } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

import { RenderTripsInvoice } from './RenderTripsInvoice';

export const TripHistory = ({
  data,
  setTripHistory,
}: {
  data: SelectOptionsTrip[];
  setTripHistory: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>;
}) => {
  const { setShowTripHistory } = useContext(MainContext);
  return (
    <div className="fixed bottom-0 z-10 h-[calc(100%-80px)] w-full cursor-pointer rounded-t-[40px] bg-slate-100 pt-5 sm:w-[400px]">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-xl font-medium drop-shadow-md">Trip History</h2>
        <GrClose
          className="cursor-pointer text-xl"
          onClick={() => setShowTripHistory(false)}
        />
      </div>
      <div className="scrollbarstyle h-[calc(100%-30px)] overflow-auto py-5">
        <div className="flex w-full flex-col justify-start gap-2">
          {data.length !== 0 ? (
            <RenderTripsInvoice data={data} setTripHistory={setTripHistory} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <h2 className="mb-10 text-3xl font-medium drop-shadow-md">
                No trip history yet
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
