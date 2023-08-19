import { doc, onSnapshot } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, VerticalMenu } from '@/components/base';
import { TripHeader, WrapperHeader } from '@/components/layout';
import {
  AddInvoice,
  RenderInvoice,
  RenderValueInVerticalMenu,
} from '@/components/pages';
import type {
  SelectOptionsInvoice,
  SelectOptionsPeopleInVerticalMenu,
  SelectOptionsTrip,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { MyTripProvider } from '@/context/mytrip-context';
import { DataFirebase, db } from '@/firebase';
import { useTotalMoneyTheTrip } from '@/hooks';
import { selector, TripActions } from '@/redux';

const TripDetail = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const router = useRouter();
  const { id } = router.query;

  const { reload, setReload } = useContext(MainContext);

  const [status, setStatus] = useState(true);

  useEffect(() => {
    if (id && currentIdJoinTrip === +id && status && reload) {
      setReload(false);
      window.location.reload();
    }
  }, [reload, id, currentIdJoinTrip, status]);

  useEffect(() => {
    if (id && currentIdJoinTrip !== +id && status === false) {
      router.push('/');
    }
  }, [id, currentIdJoinTrip, status]);

  if (id && currentIdJoinTrip === +id && status) {
    return <ContainerTripDetail setStatus={setStatus} />;
  }
  return null;
};

const ContainerTripDetail = ({
  setStatus,
}: {
  setStatus: (value: boolean) => void;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);

  const {
    showverticalmenu,
    showaddinvoice,
    setShowAddInvoice,
    setFinishTheTrip,
  } = useContext(MainContext);

  const dispatch = useDispatch();

  const [valueInvoice, setValueInvoice] = useState<SelectOptionsInvoice[]>([]);
  const [totalmoney, setTotalMoney] = useState(0);
  const [starttime, setStartTime] = useState('');
  const [tripname, setTripName] = useState('');
  const [valueuserinvmenu, setValueUserInVMenu] = useState<
    SelectOptionsPeopleInVerticalMenu[]
  >([]);
  const [reservemoney, setReserveMoney] = useState(0);

  useEffect(() => {
    const handle = async (id: number) => {
      const docRef = doc(db, 'Trips', id.toString());
      onSnapshot(docRef, async (data) => {
        if (data.exists()) {
          const { trip } = data.data();
          const valueTrip: SelectOptionsTrip = trip;
          setStatus(valueTrip.status);
          const value = await useTotalMoneyTheTrip(id);
          const valueStartTime = valueTrip?.starttime;
          setTotalMoney(value);
          setStartTime(valueStartTime || '');
          setTripName(valueTrip?.tripname || '');
          setValueInvoice(valueTrip?.invoice || []);
          const newvalue: SelectOptionsPeopleInVerticalMenu[] =
            valueTrip?.userlist.map((item) => {
              return {
                uid: item.uid,
                money: item.totalmoney || 0,
                img: {
                  color: item.photoURL.color || '',
                  text: item.photoURL.text || '',
                  url: item.photoURL.url || '',
                },
                name: item.displayName,
              };
            });
          setValueUserInVMenu(newvalue);
          setReserveMoney(valueTrip.reservemoney || 0);
        } else {
          dispatch(TripActions.setCurrentIdJoinTrip(0));
          setStatus(false);
        }
      });
    };
    handle(currentIdJoinTrip);
  }, [currentIdJoinTrip]);

  const FinishTheTrip = async () => {
    const trip = await DataFirebase.useGetTrip(currentIdJoinTrip);
    if (trip?.tripmaster === currentUserInformation.uid) {
      setFinishTheTrip('You want to end the trip with the members');
    }
  };

  return (
    <>
      <Head>
        <title>My Trip</title>
      </Head>
      <WrapperHeader
        bgWhite
        header={<TripHeader money={totalmoney} reservemoney={reservemoney} />}
      >
        {showverticalmenu ? (
          <VerticalMenu>
            <div className="flex flex-col">
              <h2 className="font-medium">Trip name:</h2>
              <h2 className="mb-2 text-2xl font-bold leading-7 drop-shadow-md">
                {tripname}
              </h2>
            </div>
            <h2 className="pb-2 font-medium">People</h2>
            <RenderValueInVerticalMenu data={valueuserinvmenu} />
            <div className="mt-2 h-12 w-full">
              <Button title="Finish the trip" onClick={FinishTheTrip} />
            </div>
          </VerticalMenu>
        ) : null}
        {showaddinvoice ? <AddInvoice /> : null}
        <div className="relative h-full w-full pr-1 pt-5">
          <div className="border_welcome_top absolute bottom-14 right-0 h-56 w-40 bg-teal-500" />
          <div className="relative z-10 h-full w-full">
            <div className="border_welcome_bottom_status_trip absolute left-0 top-4 z-0 h-56 w-40 bg-teal-500" />
            <div className="dropdown flex h-[calc(100%-73px)] w-full flex-col overflow-auto pb-5 pl-3 pr-2">
              <div className="z-10 flex items-center">
                <div className="ml-[18px] mr-3 inline-block h-3 w-3 rounded-full bg-gray-800" />
                <div className="flex flex-col">
                  <span className="text-lg">Start the trip</span>
                  <span>{starttime}</span>
                </div>
              </div>
              {valueInvoice.length !== 0 ? (
                <RenderInvoice showClose data={valueInvoice} />
              ) : null}
            </div>
            <div className="mt-3 h-12 w-full pl-3 pr-2">
              <Button
                title="Add Invoice"
                onClick={() => setShowAddInvoice(true)}
              />
            </div>
          </div>
        </div>
      </WrapperHeader>
    </>
  );
};

const MyTrip = () => {
  return (
    <MyTripProvider>
      <TripDetail />
    </MyTripProvider>
  );
};

export default MyTrip;
