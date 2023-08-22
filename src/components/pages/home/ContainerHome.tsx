import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VerticalMenu } from '@/components/base';
import { Header, WrapperHeader } from '@/components/layout';
import type {
  SelectOptionsInvitation,
  SelectOptionsTrip,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { selector } from '@/redux';

import { CreateTheTrip } from './create-the-trip';
import { useHome } from './handler';
import { RenderItemVerticalMenuHome } from './RenderItemVerticalMenuHome';
import { SliderPage } from './slider';
import { StatusCreateTrip } from './status-create-trip';
import { TemporaryNotice } from './temporary-notice';
import { TripHistory } from './trip-history';

export const ContainerHome = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);
  const { photoURL, displayName } = currentUserInformation || {};

  const { showverticalmenu, showcreatethetrip, showtriphistory } =
    useContext(MainContext);

  const router = useRouter();
  const dispatch = useDispatch();

  const [temporarynotice, setTemporaryNotice] = useState<SelectOptionsTrip>();
  const [triphistory, setTripHistory] = useState<SelectOptionsTrip[]>([]);
  const [masteruid, setMasterUid] = useState('');
  const [disabledstarttrip, setDisabledStartTrip] = useState(true);
  const [invitation, setInvitation] = useState<SelectOptionsInvitation[]>([]);
  const [showformtriphistory, setShowFormTripHistory] =
    useState<SelectOptionsTrip>();
  const [checkreservemoney, setCheckReserveMoney] = useState(0);

  useEffect(() => {
    useHome({
      uid: currentUserInformation.uid,
      id: currentIdJoinTrip,
      dispatch,
      setCheckReserveMoney,
      setDisabledStartTrip,
      setInvitation,
      setMasterUid,
      setTemporaryNotice,
      router,
      setTripHistory,
    });
  }, [currentIdJoinTrip, currentUserInformation.uid, router]);

  return (
    <WrapperHeader
      header={
        <Header
          id={currentUserInformation.id || 0}
          image={photoURL}
          name={displayName}
        />
      }
    >
      <div className="h-full w-full">
        {temporarynotice?.id ? (
          <TemporaryNotice showTitle data={temporarynotice} />
        ) : null}
        {showverticalmenu ? (
          <VerticalMenu>
            <RenderItemVerticalMenuHome />
          </VerticalMenu>
        ) : null}
        {showformtriphistory ? (
          <TemporaryNotice
            data={showformtriphistory}
            onSubmitValue={() => setShowFormTripHistory(undefined)}
          />
        ) : null}
        {showtriphistory ? (
          <TripHistory
            data={triphistory}
            setTripHistory={setShowFormTripHistory}
          />
        ) : null}
        <CreateTheTrip show={showcreatethetrip} />
        {currentIdJoinTrip !== 0 ? (
          <StatusCreateTrip
            disabledStartTrip={disabledstarttrip}
            masterUid={masteruid}
            checkReserveMoney={checkreservemoney}
          />
        ) : (
          <SliderPage data={invitation} />
        )}
      </div>
    </WrapperHeader>
  );
};
