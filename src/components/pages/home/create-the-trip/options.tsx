import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import { Button, Input } from '@/components/base';
import type {
  SelectOptionsInvitation,
  UserInformation,
} from '@/constants/select-options';
import { auth, DataFirebase } from '@/firebase';
import { useGetTimeAndDate } from '@/hooks';
import { selector } from '@/redux';

import { RemoveUserInUserListAdded } from './hook';
import { RenderSearchUser } from './render-search-user';

export const OptionsCreateTheTrip = () => {
  const [user] = useAuthState(auth);

  const { currentUserInformation } = useSelector(selector.user);

  const [tripname, setTripName] = useState({ value: '', error: '' });
  const [companions, setCompanions] = useState({ value: '', error: '' });
  const [userlist, setUserList] = useState<UserInformation[]>([]);
  const [userlistadded, setUserListAdded] = useState<UserInformation[]>([]);

  const getUserListData = async () => {
    const value = await DataFirebase.useGetUserList();
    return value;
  };

  useEffect(() => {
    getUserListData().then((userData) => {
      setUserList(userData);
    });
  }, []);

  const isCheck = () => {
    let isError = false;
    if (!tripname.value) {
      isError = true;
      setTripName({ value: '', error: 'Please enter your trip name' });
    } else if (tripname.value && tripname.value.length <= 4) {
      isError = true;
      setTripName({ ...tripname, error: 'Trip name too short' });
    }
    if (userlistadded.length === 0) {
      isError = true;
      setCompanions({
        value: '',
        error: 'Please add at least on person in the trip',
      });
    }
    return !isError;
  };

  const onSubmitCreateTrip = async () => {
    if (isCheck()) {
      if (user) {
        const promises = userlistadded.map(async (item) => {
          const id = await DataFirebase.useRandomID();
          const time = useGetTimeAndDate();
          const data: SelectOptionsInvitation = {
            name: user.displayName || currentUserInformation.displayName,
            tripid: id,
            tripname: tripname.value,
            dateandtime: time,
          };
          DataFirebase.useAcceptTheInvitation(item.uid, data);
        });
        await Promise.all(promises);
      }
    }
  };
  return (
    <div className="h-full">
      <Input
        onChangeText={(e) => setTripName({ value: e, error: '' })}
        title="Trip name"
        value={tripname.value}
        error={tripname.error}
      />
      <div className="mt-12">
        <Input
          onChangeText={(e) => setCompanions({ value: e, error: '' })}
          title="Add fellow companions"
          value={companions.value}
          error={companions.error}
          placeholder="name or id or gmail"
        />
        <div className="relative mt-2 h-[189px]">
          {companions.value ? (
            <RenderSearchUser
              data={userlist}
              searchvalue={companions.value}
              setUserListAdded={setUserListAdded}
              userlistadded={userlistadded}
              setInputValue={setCompanions}
            />
          ) : null}
          <div className="h-full">
            <span className="mb-2 text-sm">
              The fellow companions on the journey include:
            </span>
            <RenderUserListAdded
              data={userlistadded}
              setUserListAdded={setUserListAdded}
            />
          </div>
        </div>
      </div>
      <div className="mt-8 h-12 w-full">
        <Button title="Create trip" onClick={onSubmitCreateTrip} />
      </div>
    </div>
  );
};

export const RenderUserListAdded = ({
  data,
  setUserListAdded,
}: {
  data: UserInformation[];
  setUserListAdded: Dispatch<SetStateAction<UserInformation[]>>;
}) => {
  return (
    <div className="flex h-full flex-col justify-start gap-2 overflow-auto">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-xl p-2 transition-all hover:bg-slate-100"
        >
          <div className="flex items-center justify-center">
            <Avatar
              size="40"
              color={item.photoURL.color}
              className="rounded-full shadow-md"
              value={item.photoURL.text}
              src={item.photoURL.url}
            />
            <h2 className="ml-3">{item.displayName}</h2>
          </div>
          <IoClose
            className="cursor-pointer text-xl text-gray-900"
            onClick={() =>
              setUserListAdded(RemoveUserInUserListAdded(data, item.id))
            }
          />
        </div>
      ))}
    </div>
  );
};
