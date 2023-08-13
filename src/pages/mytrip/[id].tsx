import { doc, onSnapshot } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, VerticalMenu } from '@/components/base';
import { TripHeader, WrapperHeader } from '@/components/layout';
import {
  AddInvoice,
  RenderInvoice,
  RenderValueInVerticalMenu,
} from '@/components/pages';
import type { SelectOptionsInvoice } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { DataFirebase, db } from '@/firebase';
import { useTotalMoneyTheTrip } from '@/hooks';
import { selector } from '@/redux';

const TripDetail = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const router = useRouter();
  const { id } = router.query;

  const [status, setStatus] = useState(false);

  useEffect(() => {
    const handle = async () => {
      const value = await DataFirebase.useGetStatusTrip(currentIdJoinTrip);
      setStatus(value || false);
    };
    handle();
  }, [currentIdJoinTrip]);

  useEffect(() => {
    if (id && currentIdJoinTrip !== +id && !status) {
      router.push('/');
    }
  }, [id, currentIdJoinTrip, router, status]);

  if (id && currentIdJoinTrip === +id && status) {
    return <ContainerTripDetail />;
  }

  return null;
};

const ContainerTripDetail = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const { showverticalmenu, showaddinvoice, setShowAddInvoice } =
    useContext(MainContext);

  const [valueInvoice, setValueInvoice] = useState<SelectOptionsInvoice[]>([]);
  const [totalmoney, setTotalMoney] = useState(0);
  const [uidandmoney, setUidAndMoney] = useState({ uid: '', money: 0 });
  const [starttime, setStartTime] = useState('');
  const [tripname, setTripName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const value = await DataFirebase.useGetInvoiceIntoTripData(
        currentIdJoinTrip,
      );
      setValueInvoice(value || []);
    };

    fetchData();
  }, [currentIdJoinTrip]);

  useEffect(() => {
    const handle = async (id: number) => {
      if (currentIdJoinTrip) {
        const docRef = doc(db, 'Trips', id.toString());
        onSnapshot(docRef, async (data) => {
          if (data.exists()) {
            const trip = await DataFirebase.useGetTrip(id);
            const value = await useTotalMoneyTheTrip(id);
            const valueStartTime = trip?.starttime;
            setTotalMoney(value);
            setStartTime(valueStartTime || '');
            setTripName(trip?.tripname || '');
          }
        });
      }
    };
    handle(currentIdJoinTrip);
  }, [currentIdJoinTrip]);

  return (
    <>
      <Head>
        <title>My Trip</title>
      </Head>
      <WrapperHeader bgWhite header={<TripHeader money={totalmoney} />}>
        {showverticalmenu ? (
          <VerticalMenu>
            <div className="flex flex-col">
              <h2 className="font-medium">Trip name:</h2>
              <h2 className="mb-2 text-2xl font-medium leading-7 drop-shadow-md">
                {tripname}
              </h2>
            </div>
            <h2 className="pb-2 font-medium">People</h2>
            <RenderValueInVerticalMenu
              money={uidandmoney.money}
              uid={uidandmoney.uid}
            />
            <div className="mt-2 h-12 w-full">
              <Button title="Finish the trip" />
            </div>
          </VerticalMenu>
        ) : null}
        {showaddinvoice ? (
          <AddInvoice
            setUidAndMoney={(uid, money) => setUidAndMoney({ uid, money })}
          />
        ) : null}
        <div className="relative h-full w-full px-3 pt-5">
          <div className="border_welcome_bottom_status_trip absolute left-0 top-10 z-0 h-56 w-40 bg-teal-500" />
          <div className="border_welcome_top absolute bottom-14 right-0 h-56 w-40 bg-teal-500" />
          <div className="dropdown h-[calc(100%-73px)] w-full overflow-auto pr-2">
            <div className="absolute z-10 flex items-center">
              <div className="ml-[18px] mr-3 inline-block h-3 w-3 rounded-full bg-gray-800" />
              <div className="flex flex-col">
                <span className="text-lg">Start the trip</span>
                <span>{starttime}</span>
              </div>
            </div>
            <RenderInvoice data={valueInvoice} />
          </div>
          <div className="mt-3 h-12 w-full">
            <Button
              title="Add Invoice"
              onClick={() => setShowAddInvoice(true)}
            />
          </div>
        </div>
      </WrapperHeader>
    </>
  );
};

export default TripDetail;
