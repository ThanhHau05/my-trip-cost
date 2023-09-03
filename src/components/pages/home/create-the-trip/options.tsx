import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { auth } from '@/firebase';
import { selector } from '@/redux';

import { getUserListData, onSubmitCreateTrip } from './handlers';
import { RenderOptionsInput } from './RenderOptionsInput';

export const OptionsCreateTheTrip = () => {
  const [user] = useAuthState(auth);

  const { currentUserInformation } = useSelector(selector.user);

  const dispatch = useDispatch();

  const { setShowCreateTheTrip } = useContext(MainContext);

  const date = new Date();

  const [tripname, setTripName] = useState({
    value: `Trip ${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
    error: '',
  });
  const [companions, setCompanions] = useState({ value: '', error: '' });
  const [userlist, setUserList] = useState<UserInformation[]>([]);
  const [userlistadded, setUserListAdded] = useState<UserInformation[]>([]);

  useEffect(() => {
    getUserListData().then((userData) => {
      setUserList(userData);
    });
  }, []);

  return (
    <div className="flex h-full flex-col justify-between">
      <RenderOptionsInput
        companions={companions}
        setCompanions={setCompanions}
        setTripName={setTripName}
        setUserListAdded={setUserListAdded}
        tripname={tripname}
        userlist={userlist}
        userlistadded={userlistadded}
      />
      <div className="mb-8 h-12 w-full">
        <Button
          title="Create trip"
          onClick={() =>
            onSubmitCreateTrip({
              currentUserInformation,
              dispatch,
              setCompanions,
              setShowCreateTheTrip,
              setTripName,
              tripname,
              user,
              userlistadded,
            })
          }
        />
      </div>
    </div>
  );
};
