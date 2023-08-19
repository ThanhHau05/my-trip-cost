import { useContext } from 'react';
import { IoClose } from 'react-icons/io5';

import { MainContext } from '@/context/main-context';

import { OptionsCreateTheTrip } from './options';

export const CreateTheTrip = () => {
  const { setShowCreateTheTrip } = useContext(MainContext);

  return (
    <div className="fixed z-10 h-full w-full p-2 sm:w-[400px]">
      <div className="h-full w-full rounded-t-[40px] border bg-slate-50 p-3 shadow-md">
        <div className="flex w-full justify-end">
          <IoClose
            className="cursor-pointer text-3xl text-gray-900"
            onClick={() => setShowCreateTheTrip(false)}
          />
        </div>
        <OptionsCreateTheTrip />
      </div>
    </div>
  );
};
