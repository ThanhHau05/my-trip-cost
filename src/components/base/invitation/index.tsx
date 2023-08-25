import { useDispatch, useSelector } from 'react-redux';

import { DataFirebase } from '@/firebase';
import { useGetTimeAgo } from '@/hooks';
import { selector, TripActions } from '@/redux';

import { Avatar } from '../avatar';
import { Button } from '../button';

export const Invitation = ({
  tripid,
  tripname,
  name,
  dateandtime,
  avtmaster,
}: {
  tripid: number;
  tripname: string;
  name: string;
  dateandtime: string;
  avtmaster: {
    url?: string;
    color?: string;
    text?: string;
  };
}) => {
  const { currentUserInformation } = useSelector(selector.user);

  const dispatch = useDispatch();

  const onJoinTrip = async (id: number) => {
    await DataFirebase.JoinTrip(id, currentUserInformation.uid);
    dispatch(TripActions.setCurrentIdJoinTrip(id));
    await DataFirebase.DeleteInvitationTheTripInUserData(
      currentUserInformation.uid,
      id,
    );
  };

  const onCancelJoin = async (id: number) => {
    await DataFirebase.RefuseInvitation(currentUserInformation.uid, id);
  };

  return (
    <div className="w-full rounded-3xl border bg-slate-50 px-5 py-3 shadow-md">
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-sm font-medium">Invitation to Join the Trip</h2>
        <h2 className="text-gray-800">
          Trip name:{' '}
          <span className="text-xl font-bold text-gray-800">{tripname}</span>
        </h2>
        <div className="inline-block">
          <div className="flex items-center justify-center">
            <h2 className="mr-2 text-gray-800">Inviter: </h2>
            <Avatar img={avtmaster} size="40" />
            <span className="ml-1 text-lg font-medium">{name}</span>
          </div>
        </div>
        <h2 className="text-sm">{dateandtime}</h2>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {useGetTimeAgo(dateandtime)}
        </span>
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
