import type { Dispatch, SetStateAction } from 'react';

import type { SelectOptionsTrip } from '@/constants/select-options';

import { NearestTrip } from '../slider';

export const TripHistory = ({
  data,
  setTripHistory,
}: {
  data: SelectOptionsTrip[];
  setTripHistory: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>;
}) => {
  return (
    <div className="absolute bottom-0 z-10 h-[calc(100%-80px)] w-full cursor-pointer rounded-t-[35px] bg-purple-200 pt-5 sm:w-[400px]">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-xl font-medium drop-shadow-md">Trip History</h2>
      </div>
      <div className="scrollbarstyle h-[calc(100%-135px)] overflow-auto py-3">
        <div className="flex w-full flex-col justify-start gap-2">
          {data.length !== 0 ? (
            data.map((item) => (
              <div key={item.id} className="pl-5 pr-4">
                <NearestTrip data={item} onClick={setTripHistory} btnClose />
              </div>
            ))
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
