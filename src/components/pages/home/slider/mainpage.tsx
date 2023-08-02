import { useContext } from 'react';
import { IoNotifications } from 'react-icons/io5';

import { Button } from '@/components/base';
import { ImagesHome } from '@/components/images/home';
import { HomeContext } from '@/context/home-context';

export const MainPage = () => {
  const { onSubmitCreateANewTrip } = useContext(HomeContext);

  return (
    <div className="h-full w-full rounded-t-[40px] bg-white">
      <div className="w-full pr-6 pt-4">
        <div className="flex w-full justify-end">
          <div className="relative inline-block">
            {/* <span className="absolute -right-1 -top-1 z-10 rounded-full bg-red-500 px-1 text-xs">
              1
            </span> */}
            <IoNotifications className="ml-auto cursor-pointer text-2xl text-gray-900 drop-shadow-md transition-all hover:text-gray-950" />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <img src={ImagesHome.BackgroundHome.src} alt="" />
        <div className="mt-16 h-12 px-5">
          <Button onClick={onSubmitCreateANewTrip} title="Create a new trip" />
        </div>
      </div>
    </div>
  );
};
