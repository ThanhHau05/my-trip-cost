import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { VerticalMenu } from '@/components/base';
import { Header, WrapperHeader } from '@/components/layout';
import {
  CreateTheTrip,
  SliderPage,
  StatusCreateTrip,
  TemporaryNotice,
  TripHistory,
} from '@/components/pages';
import type { SelectOptionsTrip } from '@/constants/select-options';
import { VERTICAL_MENU } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { auth, db } from '@/firebase';
import { selector, UserActions } from '@/redux';

import { Welcome } from './welcome';

const HomePage = () => {
  const { currentUserInformation } = useSelector(selector.user);
  return currentUserInformation?.displayName ? <ContainerHome /> : <Welcome />;
};

const ContainerHome = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);
  const { showverticalmenu, showcreatethetrip, showtriphistory } =
    useContext(MainContext);

  const { id, photoURL, displayName } = currentUserInformation || {};

  const [temporarynotice, setTemporaryNotice] = useState<SelectOptionsTrip>();

  useEffect(() => {
    const docRef = doc(db, 'UserInvitations', currentUserInformation.uid);
    onSnapshot(docRef, (data) => {
      if (data.exists()) {
        const value = data.data().temporaryNotice;
        if (value) {
          setTemporaryNotice(value);
        }
      }
    });
  }, []);

  return (
    <WrapperHeader
      header={<Header id={id || 0} image={photoURL} name={displayName} />}
    >
      <div className="h-full w-full">
        {temporarynotice?.id ? (
          <TemporaryNotice data={temporarynotice} />
        ) : null}
        {showverticalmenu ? (
          <VerticalMenu>
            <RenderItemVerticalMenuHome />
          </VerticalMenu>
        ) : null}
        {showtriphistory ? <TripHistory /> : null}
        {showcreatethetrip ? <CreateTheTrip /> : null}
        {currentIdJoinTrip !== 0 ? (
          <div className="h-full">
            <StatusCreateTrip />
          </div>
        ) : (
          <SliderPage />
        )}
      </div>
    </WrapperHeader>
  );
};

const RenderItemVerticalMenuHome = () => {
  const [signOut] = useSignOut(auth);
  const dispatch = useDispatch();

  const { setShowVerticalMenu, setShowTripHistory } = useContext(MainContext);

  const onSubmit = async (value: string) => {
    if (value === 'sign out') {
      window.location.reload();
      setTimeout(async () => {
        await signOut();
      }, 200);
      dispatch(
        UserActions.setCurrentUserInformation({
          displayName: '',
          id: 0,
          photoURL: {
            url: undefined,
            color: undefined,
            text: undefined,
          },
          uid: '',
          status: false,
        }),
      );
    } else if (value === 'trip history') {
      setShowVerticalMenu(false);
      setShowTripHistory(true);
    }
  };
  return (
    <div className="flex flex-col">
      {VERTICAL_MENU.map((item) => (
        <div
          key={item.value}
          className="mb-2 flex cursor-pointer items-center justify-start rounded-xl bg-slate-300 p-2"
          onClick={() => onSubmit(item.value.toString())}
        >
          {item.icon ? (
            <item.icon className="mr-2 text-xl text-gray-900" />
          ) : null}
          <h2 className="select-none">{item.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
