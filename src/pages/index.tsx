import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
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
import type {
  SelectOptionsInvitation,
  SelectOptionsTrip,
  SelectOptionsUserInvitations,
  UserInformation,
} from '@/constants/select-options';
import { VERTICAL_MENU } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { auth, db } from '@/firebase';
import { selector, TripActions, UserActions } from '@/redux';

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

  const router = useRouter();

  const dispatch = useDispatch();

  const { id, photoURL, displayName } = currentUserInformation || {};

  const [temporarynotice, setTemporaryNotice] = useState<SelectOptionsTrip>();
  const [triphistory, setTripHistory] = useState<SelectOptionsTrip[]>([]);
  const [masteruid, setMasterUid] = useState('');
  const [disabledstarttrip, setDisabledStartTrip] = useState(true);
  const [invitation, setInvitation] = useState<SelectOptionsInvitation[]>([]);

  useEffect(() => {
    const handle = () => {
      const docRef = doc(db, 'UserInvitations', currentUserInformation.uid);
      onSnapshot(docRef, (data) => {
        if (data.exists()) {
          const valueData: SelectOptionsUserInvitations = data.data();
          if (valueData.temporaryNotice) {
            setTemporaryNotice(valueData.temporaryNotice);
          }
          if (valueData.tripHistory) {
            setTripHistory(valueData.tripHistory);
          }
          if (valueData.invitation) {
            setInvitation(valueData.invitation);
          }
        }
      });
    };
    if (currentIdJoinTrip === 0) {
      handle();
    } else {
      const docRef = doc(db, 'Trips', currentIdJoinTrip.toString());
      onSnapshot(docRef, async (data) => {
        if (data.exists()) {
          const { trip } = data.data();
          const valueTrip: SelectOptionsTrip = trip;
          if (valueTrip) {
            setMasterUid(trip.tripmaster);
            if (valueTrip.status) {
              router.push(`mytrip/${currentIdJoinTrip}`);
            } else {
              const checkData = valueTrip.userlist.find(
                (item) => item.uid === currentUserInformation.uid,
              );
              if (checkData === undefined) {
                dispatch(TripActions.setCurrentIdJoinTrip(0));
              }
            }
          }
          const userlists: UserInformation[] = valueTrip.userlist;
          const status = userlists.find((item) => item.status === false);
          if (status === undefined) {
            setDisabledStartTrip(false);
          }
        }
      });
    }
  }, [currentIdJoinTrip]);

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
        {showtriphistory ? <TripHistory data={triphistory} /> : null}
        {showcreatethetrip ? <CreateTheTrip /> : null}
        {currentIdJoinTrip !== 0 ? (
          <div className="h-full">
            <StatusCreateTrip
              disabledStartTrip={disabledstarttrip}
              masterUid={masteruid}
            />
          </div>
        ) : (
          <SliderPage data={invitation} />
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
