import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';

import { MainContext } from '@/context/main-context';

import { Button } from '../button';

export const NotificationConfirmOperation = () => {
  const { setConentConfirm, contentconfirm, onSubmitEcceptToCancelTheTrip } =
    useContext(MainContext);
  return (
    <div className="fixed z-40 flex h-full w-full items-center justify-center bg-gray-600/40">
      <div className="rounded-3xl bg-slate-100 p-5 drop-shadow-md">
        <GrClose
          onClick={() => setConentConfirm('')}
          className="mb-2 ml-auto mr-0 cursor-pointer"
        />
        <span className="font-medium">{contentconfirm}</span>
        <div className="mt-5 flex h-10 w-full items-center justify-center gap-3">
          <Button
            title="Yes"
            onClick={() => {
              onSubmitEcceptToCancelTheTrip();
              setConentConfirm('');
            }}
          />
          <Button bgWhite title="Cancel" onClick={() => setConentConfirm('')} />
        </div>
      </div>
    </div>
  );
};
