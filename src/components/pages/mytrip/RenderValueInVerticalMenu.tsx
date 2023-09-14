import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AmountOfMoneyOfUser } from '@/components/base';
import type { SelectOptionsPeopleInVerticalMenu } from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

export const RenderValueInVerticalMenu = ({
  data,
}: {
  data: SelectOptionsPeopleInVerticalMenu[];
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const [uidmaster, setUidMaster] = useState('');
  useEffect(() => {
    const handle = async () => {
      const trip = await DataFirebase.GetTrip(currentIdJoinTrip);
      if (trip?.tripmaster) {
        setUidMaster(trip.tripmaster);
      }
    };
    handle();
  }, [currentIdJoinTrip]);
  return (
    <div className="flex flex-col gap-2 overflow-auto pb-2">
      {data ? (
        data.map((item) => (
          <AmountOfMoneyOfUser
            key={item.uid}
            name={item.name}
            url={item.img.url}
            color={item.img.color}
            text={item.img.text}
            money={item.money}
            id={item.id}
            uidMaster={uidmaster}
            uid={item.uid}
          />
        ))
      ) : (
        <div className="flex h-14 w-80 items-center justify-start rounded-xl bg-white px-2 drop-shadow-md">
          <div className="skeleton h-12 w-12 rounded-full" />
          <div className="skeleton ml-1 h-7 w-36 rounded-lg" />
        </div>
      )}
    </div>
  );
};
