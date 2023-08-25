import { useContext } from 'react';

import { MainContext } from '@/context/main-context';

import { NearestTrip } from './NearestTrip';
import { RecentFriends } from './RecentFriends';

export const MainPage = () => {
  const { recenttrip, recentfriends, setShowFormTripHistory } =
    useContext(MainContext);
  console.log(recenttrip);

  return (
    <div className="h-full w-full rounded-t-[40px] bg-purple-200 pt-5">
      <div className="scrollbarstyle flex h-[calc(100%-100px)] flex-col justify-start gap-4 overflow-auto">
        <div className="w-full px-5 pb-1">
          <h2 className="ml-2 text-sm font-medium uppercase text-gray-600 drop-shadow-md">
            Nearest Trip
          </h2>
          {recenttrip && recenttrip.tripname ? (
            <NearestTrip
              data={recenttrip}
              onClick={() => setShowFormTripHistory(recenttrip)}
            />
          ) : (
            <h2 className="mt-2 text-xl font-medium text-gray-700">
              You haven&apos;t had any recent trips
            </h2>
          )}
        </div>
        <RecentFriends data={recentfriends} />
      </div>
    </div>
  );
};
