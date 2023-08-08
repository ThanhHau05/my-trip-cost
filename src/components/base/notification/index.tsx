import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';

import { MainContext } from '@/context/main-context';

import { Button } from '../button';

export const Notification = () => {
  const { setContentNotification, contentnotification } =
    useContext(MainContext);
  return (
    <div className="fixed z-40 flex h-full w-full items-center justify-center bg-gray-600/40">
      <div className="max-w-xs rounded-3xl bg-slate-100 p-5 drop-shadow-md">
        <GrClose
          onClick={() => setContentNotification('')}
          className="mb-2 ml-auto mr-0 cursor-pointer"
        />
        <span className="font-medium">{contentnotification}</span>
        <div className="mt-5 h-10 w-full">
          <Button
            title="OK"
            onClick={() => {
              setContentNotification('');
            }}
          />
        </div>
      </div>
    </div>
  );
};
