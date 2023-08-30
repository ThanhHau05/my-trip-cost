import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ContainerTripDetail, handleCheckStatusTrip } from '@/components/pages';
import { MainContext } from '@/context/main-context';
import { MyTripProvider } from '@/context/mytrip-context';
import { selector } from '@/redux';

const MyTrip = () => {
  return (
    <MyTripProvider>
      <TripDetail />
    </MyTripProvider>
  );
};

const TripDetail = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const router = useRouter();
  const { id } = router.query;
  const { reload, setReload } = useContext(MainContext);

  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (id) {
      handleCheckStatusTrip(id, setStatus);
    }
  }, [id]);

  useEffect(() => {
    if (id && currentIdJoinTrip === +id && status && reload) {
      setReload(false);
    }
  }, [reload, id, currentIdJoinTrip, status]);

  useEffect(() => {
    if (id && currentIdJoinTrip !== +id && status === false) {
      router.push('/');
    }
  }, [id, currentIdJoinTrip, status]);

  if (id && currentIdJoinTrip === +id && status) {
    return <ContainerTripDetail />;
  }
  return null;
};

export default MyTrip;
