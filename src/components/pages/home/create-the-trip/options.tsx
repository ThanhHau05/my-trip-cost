import type { Dispatch, SetStateAction } from 'react';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Button, Input } from '@/components/base';
import type {
  SelectOptionsInvitation,
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { auth, DataFirebase } from '@/firebase';
import { useGetTimeAndDate } from '@/hooks';
import { selector, TripActions } from '@/redux';

import { RemoveUserInUserListAdded } from './hook';
import { RenderSearchUser } from './render-search-user';

export const OptionsCreateTheTrip = () => {
  const [user] = useAuthState(auth);

  const { currentUserInformation } = useSelector(selector.user);

  const dispatch = useDispatch();

  const { setShowCreateTheTrip } = useContext(MainContext);

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

  const onChangeCompanions = (e: string) => {
    if (e.length <= 15) {
      setCompanions({ value: e, error: '' });
    }
  };

  const onSubmitCreateTrip = async () => {
    if (isCheck()) {
      if (user) {
        const id = await DataFirebase.useRandomIdCreateTrip();
        const promises = userlistadded.map(async (item) => {
          if (item.id) {
            const time = useGetTimeAndDate();
            const data: SelectOptionsInvitation = {
              name: user.displayName || '',
              tripid: id,
              tripname: tripname.value,
              dateandtime: time,
              status: false,
              uid: item.uid,
            };

            if (item.uid) {
              await DataFirebase.useAcceptTheInvitation(item.uid, data);
            }
          }
        });
        await Promise.all(promises);
        const { displayName, photoURL, uid } = currentUserInformation;
        const datauser: UserInformation = {
          displayName,
          id: currentUserInformation.id,
          photoURL,
          status: true,
          reload: false,
          uid,
        };
        const updatedUserList = [datauser, ...userlistadded];
        const data: SelectOptionsTrip = {
          tripname: tripname.value,
          userlist: updatedUserList,
          id,
          status: false,
          tripmaster: uid || '',
          endtime: '',
          starttime: '',
        };
        await DataFirebase.useCreateTrip(id, data);
        dispatch(TripActions.setCurrentIdJoinTrip(id));
        setShowCreateTheTrip(false);
      }
    }
  };

  return (
    <div className="flex h-[calc(100%-6rem)] flex-col justify-between">
      <div className="h-[calc(100%-5rem)]">
        <Input
          onChangeText={(e) => setTripName({ value: e, error: '' })}
          title="Trip name"
          value={tripname.value}
          error={tripname.error}
          maxLength={15}
        />
        <div className="mt-12 h-full">
          <Input
            onChangeText={(e) => onChangeCompanions(e)}
            title="Add fellow companions"
            value={companions.value}
            error={companions.error}
            placeholder="name or id"
          />
          <div className="relative mt-2 h-2/5">
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
      </div>
      <div className="mb-5 h-12 w-full">
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
    <div className="dropdown flex h-full flex-col justify-start gap-2 overflow-auto">
      {data.map((item) => (
        <div
          key={item.uid}
          className="flex items-center justify-between rounded-xl p-2 transition-all hover:bg-slate-100"
        >
          <div className="flex items-center justify-center">
            <Avatar
              size="40"
              img={{
                url: item.photoURL.url,
                color: item.photoURL.color,
                text: item.photoURL.text,
              }}
            />
            <h2 className="ml-3">{item.displayName}</h2>
          </div>
          <IoClose
            className="cursor-pointer text-xl text-gray-900"
            onClick={() =>
              setUserListAdded(RemoveUserInUserListAdded(data, item.uid || ''))
            }
          />
        </div>
      ))}
    </div>
  );
};
