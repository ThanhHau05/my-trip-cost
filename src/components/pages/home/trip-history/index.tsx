import clsx from 'clsx';
import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';

import { Avatar } from '@/components/base';
import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { useFormatCurrentcy } from '@/hooks';

export const TripHistory = ({
  data,
  setTripHistory,
}: {
  data: SelectOptionsTrip[];
  setTripHistory: Dispatch<SetStateAction<SelectOptionsTrip | undefined>>;
}) => {
  const { setShowTripHistory } = useContext(MainContext);
  return (
    <div className="fixed bottom-0 z-10 h-[calc(100%-80px)] w-400 cursor-pointer rounded-[40px] bg-slate-100 pt-5">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-xl font-medium drop-shadow-md">Trip History</h2>
        <GrClose
          className="cursor-pointer text-xl"
          onClick={() => setShowTripHistory(false)}
        />
      </div>
      <div className="dropdown h-full overflow-auto pt-5">
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

const RenderTripsInvoice = ({
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
              {item.totalmoney ? useFormatCurrentcy(item.totalmoney) : 0} VND
            </span>
          </h2>
          <h2>
            Reserve money:{' '}
            <span className="font-medium">
              {item.reservemoney ? useFormatCurrentcy(item.reservemoney) : 0}{' '}
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

const RenderAvt = ({ data }: { data: UserInformation[] }) => {
  return (
    <>
      {data.map((item, index) => {
        if (data.length >= 7 && index > 5) {
          if (index < 6) {
            return (
              <div
                key={item.uid}
                className={clsx(
                  'relative inline-block py-2 pb-3 drop-shadow-md',
                )}
                style={{ left: `${-15 * index}px` }}
              >
                <Avatar
                  img={{
                    color: '#ababab',
                    text: `+${data.length - 1}`,
                    url: '',
                  }}
                  size="40"
                />
              </div>
            );
          }
          return null;
        }

        return (
          <div
            key={item.uid}
            className={clsx(
              'inline-block py-2 pb-3',
              index !== 0 && 'relative drop-shadow-md',
            )}
            style={index !== 0 ? { left: `${-15 * index}px` } : undefined}
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
