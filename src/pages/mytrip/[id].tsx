import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ContainerTripDetail, handleCheckStatusTrip } from '@/components/pages';
import { MainContext } from '@/context/main-context';
import { MyTripProvider } from '@/context/mytrip-context';
import { selector, TripActions } from '@/redux';

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
  const dispatch = useDispatch();
  const { id } = router.query;
  const { reload, setReload } = useContext(MainContext);

  const [status, setStatus] = useState<boolean>();

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
    if (id && status === false) {
      dispatch(TripActions.setCurrentIdJoinTrip(0));
      router.push('/');
    }
  }, [id, status]);

  if (id && currentIdJoinTrip === +id && status) {
    return <ContainerTripDetail />;
  }
  return null;
};

export default MyTrip;
