import { useMemo } from 'react';

import { useFormatCurrentcy } from '@/hooks';

import { MenuBarsBox } from '../header';

export const TripHeader = ({
  tripName,
  money,
}: {
  tripName: string;
  money: number;
}) => {
  const valueMoney = useMemo(() => {
    if (money) {
      return useFormatCurrentcy(money);
    }
    return '0';
  }, [money]);
  return (
    <div className="flex h-full items-center justify-between px-3 py-2">
      <MenuBarsBox />
      <h2 className="text-lg font-medium text-white drop-shadow-md">
        {tripName}
      </h2>
      <div className="flex flex-col items-center justify-center rounded-lg border bg-white px-2 py-1 drop-shadow-md">
        <span className="text-center text-xs font-medium leading-[10px]">
          Total
        </span>
        <h2 className="text-lg font-bold text-gray-800 drop-shadow-md">
          {valueMoney} VND
        </h2>
      </div>
    </div>
  );
};
