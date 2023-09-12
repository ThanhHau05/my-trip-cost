import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TripHeader, WrapperHeader } from '@/components/layout';
import type {
  SelectOptionsInvoice,
  SelectOptionsPeopleInVerticalMenu,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { ImagesTrip } from '@/public/images/trip';
import { selector } from '@/redux';

import { AddInvoice } from './add-invoice';
import { useMyTrip } from './handle-mytrip';
import { RenderInvoiceHistory } from './RenderInvoiceHistory';
import { RenderVerticalMenu } from './RenderVerticalMenu';

export const ContainerTripDetail = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);

  const dispatch = useDispatch();

  const { showverticalmenu, showaddinvoice, setReload, setLoadingStartNow } =
    useContext(MainContext);

  const [valueInvoice, setValueInvoice] = useState<SelectOptionsInvoice[]>([]);
  const [totalmoney, setTotalMoney] = useState(0);
  const [starttime, setStartTime] = useState('');
  const [tripname, setTripName] = useState('');
  const [valueuserinvmenu, setValueUserInVMenu] = useState<
    SelectOptionsPeopleInVerticalMenu[]
  >([]);
  const [reservemoney, setReserveMoney] = useState(0);
  const [uidmaster, setUidMaster] = useState('');

  useEffect(() => {
    useMyTrip({
      setReload,
      setReserveMoney,
      setStartTime,
      setTotalMoney,
      setTripName,
      setUidMaster,
      setValueInvoice,
      setValueUserInVMenu,
      dispatch,
      id: currentIdJoinTrip,
      infoUser: currentUserInformation,
      setLoading: setLoadingStartNow,
    });
  }, [currentIdJoinTrip, currentUserInformation]);

  return (
    <>
      <Head>
        <title>My Trip</title>
      </Head>
      <WrapperHeader
        bgWhite
        header={<TripHeader money={totalmoney} reservemoney={reservemoney} />}
      >
        <div className="relative h-full w-full rounded-t-[35px]">
          <img
            src={ImagesTrip.Background.src}
            alt=""
            className="absolute w-full rounded-t-[35px]"
          />
          <RenderVerticalMenu
            show={showverticalmenu}
            tripName={tripname}
            uidMaster={uidmaster}
            valueUserInvMenu={valueuserinvmenu}
            uid={currentUserInformation.uid}
          />
          <AddInvoice show={showaddinvoice} />
          <RenderInvoiceHistory
            starttime={starttime}
            valueInvoice={valueInvoice}
          />
        </div>
      </WrapperHeader>
    </>
  );
};
