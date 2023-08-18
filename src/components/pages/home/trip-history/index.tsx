import clsx from 'clsx';
import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';

import { Avatar } from '@/components/base';
import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

export const TripHistory = ({ data }: { data: SelectOptionsTrip[] }) => {
  const { setShowTripHistory } = useContext(MainContext);
  return (
    <div className="fixed bottom-0 z-10 h-[calc(100%-80px)] w-400 rounded-[40px] bg-slate-100 px-5 pt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium drop-shadow-md">Trip History</h2>
        <GrClose
          className="cursor-pointer text-xl"
          onClick={() => setShowTripHistory(false)}
        />
      </div>
      <div className="h-full">
        {data.length !== 0 ? (
          <RenderTripsInvoice data={data} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <h2 className="mb-10 text-3xl font-medium drop-shadow-md">
              No trip history yet
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderTripsInvoice = ({ data }: { data: SelectOptionsTrip[] }) => {
  return (
    <>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.tripname}</h2>
          <div className="flex items-center justify-center">
            <h2>Members:</h2>
            <RenderAvt data={item.userlist} />
          </div>
          <span>Start time: {item.starttime}</span>
          <span>End time: {item.endtime}</span>
        </div>
      ))}
    </>
  );
};

const RenderAvt = ({ data }: { data: UserInformation[] }) => {
  return (
    <>
      {data.map((item, index) => {
        const left = `${-15 * index}px`;
        return (
          <div
            style={index !== 0 ? { left } : undefined}
            key={item.uid}
            className={clsx(
              'inline-block py-2 pb-3',
              index !== 0 ? 'relative drop-shadow-md' : null,
            )}
          >
            <Avatar
              img={{
                color: item.photoURL.color,
                text: item.photoURL.text,
                url: item.photoURL.url,
              }}
              size="40"
            />
          </div>
        );
      })}
    </>
  );
};
