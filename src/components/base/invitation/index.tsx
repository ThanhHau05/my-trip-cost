import { useDispatch, useSelector } from 'react-redux';

import { DataFirebase } from '@/firebase';
import { selector, TripActions } from '@/redux';

import { Button } from '../button';

export const Invitation = ({
  tripid,
  tripname,
  name,
  dateandtime,
}: {
  tripid: number;
  tripname: string;
  name: string;
  dateandtime: string;
}) => {
  const { currentUserInformation } = useSelector(selector.user);

  const dispatch = useDispatch();

  const onJoinTrip = async (id: number) => {
    await DataFirebase.useJoinTrip(id, currentUserInformation.uid);
    dispatch(TripActions.setCurrentIdJoinTrip(id));
    await DataFirebase.useDeleteInvitationTheTripInUserData(
      currentUserInformation.uid,
      id,
    );
  };

  const onCancelJoin = async (id: number) => {
    await DataFirebase.useRefuseInvitation(currentUserInformation.uid, id);
  };

  return (
    <div className="w-full rounded-3xl border bg-slate-50 px-3 py-2 shadow-md">
      <h2 className="text-sm">
        Trip ID: <span className="font-medium">{tripid}</span>
      </h2>
      <h2>
        You have just been added to the{' '}
        <span className="text-lg font-medium">{tripname}</span> trip by{' '}
        <span className="text-lg font-medium">{name}</span>
      </h2>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm">{dateandtime}</span>
        <div className="flex h-9 gap-2">
          <div className=" h-full w-20">
            <Button title="Join" onClick={() => onJoinTrip(tripid)} />
          </div>
          <div className="h-full w-20">
            <Button
              bgWhite
              title="Cancel"
              onClick={() => onCancelJoin(tripid)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
