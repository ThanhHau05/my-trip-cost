import clsx from 'clsx';
import { useMemo, useState } from 'react';

import { handleFormatCurrentcy } from '@/components/pages/handler';

import { onClickMoney } from './handler';
import { MenuBarsBox } from './header';

export const TripHeader = ({
  money,
  reservemoney,
}: {
  money: number;
  reservemoney: number;
}) => {
  const [clickmoney, setClickMoney] = useState(false);

  const valueMoney = useMemo(() => {
    if (money) {
      return handleFormatCurrentcy(money);
    }
    return '0';
  }, [money]);

  const valueReserveMoney = useMemo(() => {
    if (reservemoney) {
      return handleFormatCurrentcy(reservemoney);
    }
    return '0';
  }, [reservemoney]);

  return (
    <div className="flex h-full items-center justify-between px-3 py-2">
      <MenuBarsBox />
      <div className="flex w-full items-center justify-center">
        <div
          className={clsx(
            'flex h-full w-72 flex-col justify-center gap-1',
            reservemoney ? 'cursor-pointer' : null,
          )}
          onClick={() => onClickMoney(setClickMoney, clickmoney, reservemoney)}
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
