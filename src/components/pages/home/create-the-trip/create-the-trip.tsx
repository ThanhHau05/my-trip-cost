import { useContext } from 'react';
import { IoClose } from 'react-icons/io5';

import { MainContext } from '@/context/main-context';

import { OptionsCreateTheTrip } from './options';

export const CreateTheTrip = ({ show }: { show: boolean }) => {
  const { setShowCreateTheTrip } = useContext(MainContext);

  return show ? (
    <div className="absolute top-0 z-20 h-full w-full bg-slate-700/20 pt-20 sm:w-[400px]">
      <div className="h-full w-full rounded-t-[40px] bg-purple-200 p-2 pb-0">
        <div className="relative h-full w-full rounded-t-[40px] border bg-purple-50 p-3 shadow-md">
          <div className="flex w-full justify-end">
            <IoClose
              className="cursor-pointer text-3xl text-gray-900"
              onClick={() => setShowCreateTheTrip(false)}
            />
          </div>
          <OptionsCreateTheTrip />
        </div>
      </div>
    </div>
  ) : null;
};
