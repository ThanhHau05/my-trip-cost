import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { VerticalMenu } from '@/components/base';
import { Header, WrapperHeader } from '@/components/layout';
import {
  CreateTheTrip,
  SliderPage,
  StatusCreateTrip,
} from '@/components/pages';
import type { SelectOptionsInvitation } from '@/constants/select-options';
import { VERTICAL_MENU } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { auth, DataFirebase, db } from '@/firebase';
import { selector, TripActions, UserActions } from '@/redux';

import { Welcome } from './welcome';

const HomePage = () => {
  const { currentUserInformation } = useSelector(selector.user);
  return currentUserInformation?.displayName ? <ContainerHome /> : <Welcome />;
};

const ContainerHome = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);
  const { showverticalmenu, showcreatethetrip, setContentNotification } =
    useContext(MainContext);

  const { id, photoURL, displayName, email } = currentUserInformation || {};

  const dispatch = useDispatch();

  useEffect(() => {
    const handleInvitation = (uid: string) => {
      const docRef = doc(db, 'UserInvitations', uid);
      onSnapshot(docRef, async (data) => {
        if (data.exists()) {
          const invitationData: SelectOptionsInvitation[] =
            data.data().invitation;
          const value = invitationData.find(
            (item) => item.tripid === currentIdJoinTrip,
          );
          const trip = await DataFirebase.useGetTrip(currentIdJoinTrip);
          if (
            trip?.tripmaster !== currentUserInformation.uid &&
            value === undefined &&
            trip
          ) {
            setContentNotification(
              `You have been removed from trip "${trip?.tripname}", trip ID: ${trip?.id}`,
            );
            dispatch(TripActions.setCurrentIdJoinTrip(0));
          }
        }
      });
    };

    handleInvitation(currentUserInformation.uid);
  }, [currentUserInformation.uid]);

  return (
    <WrapperHeader
      header={
        <Header id={id} image={photoURL} name={displayName} email={email} />
      }
    >
      <div className="h-full w-full">
        {showverticalmenu ? (
          <VerticalMenu>
            <RenderItemVerticalMenuHome />
          </VerticalMenu>
        ) : null}
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
          email: '',
          uid: '',
          status: false,
        }),
      );
    }
  };
  return (
    <div className="flex flex-col">
      {VERTICAL_MENU.map((item) => (
        <div
          key={item.value}
          className="mb-2 flex cursor-pointer items-center justify-start rounded-xl bg-slate-300 py-2"
          onClick={() => onSubmit(item.value)}
        >
          {item.icon ? (
            <item.icon className="mx-2 text-xl text-gray-900" />
          ) : null}
          <h2 className="select-none">{item.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
