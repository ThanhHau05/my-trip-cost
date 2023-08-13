import clsx from 'clsx';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { DataFirebase, db } from '@/firebase';
import { useFormatCurrentcy } from '@/hooks';
import { selector } from '@/redux';

import { MenuBarsBox } from '../header';

export const TripHeader = ({ money }: { money: number }) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const [reservemoney, setReserveMoney] = useState(0);
  const [clickmoney, setClickMoney] = useState(false);

  const valueMoney = useMemo(() => {
    if (money) {
      return useFormatCurrentcy(money);
    }
    return '0';
  }, [money]);

  const valueReserveMoney = useMemo(() => {
    if (reservemoney) {
      return useFormatCurrentcy(reservemoney);
    }
    return '0';
  }, [reservemoney]);

  useEffect(() => {
    const handle = async (id: number) => {
      const docRef = doc(db, 'Trips', id.toString());
      onSnapshot(docRef, async () => {
        const trip = await DataFirebase.useGetTrip(id);
        if (trip?.reservemoney) {
          setReserveMoney(trip.reservemoney);
        }
      });
    };
    handle(currentIdJoinTrip);
  }, [currentIdJoinTrip]);

  const onClickMoney = () => {
    if (reservemoney) {
      setClickMoney(!clickmoney);
    }
  };

  return (
    <div className="flex h-full items-center justify-between px-3 py-2">
      <MenuBarsBox />
      <div className="flex w-full items-center justify-center">
        <div
          className={clsx(
            'flex h-full w-72 flex-col justify-center gap-1',
            reservemoney ? 'cursor-pointer' : null,
          )}
          onClick={onClickMoney}
        >
          <div className="flex items-center justify-center">
            <span
              className={clsx(
                'select-none pl-1 text-center leading-[10px] drop-shadow-md',
                clickmoney ? 'text-xs font-medium' : 'text-sm font-bold',
              )}
            >
              Total
            </span>
            {reservemoney ? (
              <>
                <span className="select-none text-center text-sm font-medium leading-[10px] drop-shadow-md">
                  /
                </span>
                <span
                  className={clsx(
                    'select-none pl-1 text-center leading-[10px] drop-shadow-md',
                    clickmoney ? 'text-sm font-bold' : 'text-xs font-medium',
                  )}
                >
                  Reserve money
                </span>
              </>
            ) : null}
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border bg-white px-2 py-1 drop-shadow-md">
            <h2 className="select-none text-2xl font-bold text-gray-800 drop-shadow-md">
              {clickmoney ? valueReserveMoney : valueMoney} VND
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
