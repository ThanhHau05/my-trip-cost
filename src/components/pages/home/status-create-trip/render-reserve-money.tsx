import { doc, setDoc } from 'firebase/firestore';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Input } from '@/components/base';
import { DataFirebase, db } from '@/firebase';
import { useFormatCurrentcy } from '@/hooks';
import { selector } from '@/redux';

export const RenderReserveMoney = ({
  masteruid,
  onChangeMoney,
  value,
  error,
}: {
  masteruid: string;
  onChangeMoney: (e: string) => void;
  value: string;
  error: string;
}) => {
  const { currentUserInformation } = useSelector(selector.user);
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(+value);
  }, [value]);

  const handleRemoveValue = async () => {
    if (value) {
      const docRef = doc(db, 'Trips', currentIdJoinTrip.toString());
      const trip = await DataFirebase.useGetTrip(currentIdJoinTrip);
      if (trip) {
        const { reservemoney } = trip;
        if (reservemoney !== 0) {
          await setDoc(docRef, {
            trip: {
              ...trip,
              reservemoney: 0,
            },
          });
        }
      }
    }
  };

  return (
    <div>
      {masteruid === currentUserInformation.uid ? (
        <div className="mt-3 h-32">
          <h2>Reserve money (optional)</h2>
          <Input
            error={error}
            value={value}
            onChangeText={(e) => onChangeMoney(e)}
            placeholder="Ex: 2000000"
            onRemoveText={() => handleRemoveValue()}
          />
          <h2 className="ml-2 mt-2 font-medium text-gray-700">
            {valueMoney} VNĐ
          </h2>
        </div>
      ) : null}
    </div>
  );
};
