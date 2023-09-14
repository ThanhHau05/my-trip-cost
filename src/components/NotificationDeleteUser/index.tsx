import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { MainContext } from '@/context/main-context';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

import { Button } from '../base';

export const NotificationDeleteUser = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);
  const { setValueDeleteUser, valeudeleteuser } = useContext(MainContext);
  return (
    <div className="fixed z-30 flex h-full w-full items-center justify-center bg-gray-600/40">
      <div className="max-w-xs rounded-3xl bg-slate-100 p-5 drop-shadow-md">
        <h2 className="w-full text-center">
          Do you want to remove{' '}
          <span className="text-lg font-medium">{valeudeleteuser.name}</span>{' '}
          from the trip ?
        </h2>
        <div className="mt-5 flex items-center justify-center gap-2">
          <Button
            title="Delete"
            height={2.5}
            onClick={() => {
              DataFirebase.DeleteUserInTheTrip(
                currentIdJoinTrip,
                valeudeleteuser.uid,
                currentUserInformation,
              );
              setValueDeleteUser({ name: '', uid: '' });
            }}
          />
          <Button
            title="Cancel"
            height={2.5}
            bgWhite
            onClick={() => setValueDeleteUser({ name: '', uid: '' })}
          />
        </div>
      </div>
    </div>
  );
};
