import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

export const useGetMasterTrip = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const valueMaster = useMemo(() => {
    const handle = async (id: number) => {
      const user = await DataFirebase.GetTripMaster(id);
      if (user) {
        return user;
      }
      return undefined;
    };
    return handle(currentIdJoinTrip);
  }, [currentIdJoinTrip]);
  return valueMaster;
};
