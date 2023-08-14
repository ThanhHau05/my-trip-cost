import { useMemo } from 'react';
import { GrClose } from 'react-icons/gr';

import { useFormatCurrentcy } from '@/hooks';

import { Avatar } from '../avatar';

export const Invoice = ({
  name,
  activity,
  qty,
  time,
  money,
  url,
  color,
  text,
}: {
  name: string;
  activity: string;
  time: string;
  money: number;
  qty?: number;
  url: string;
  color: string;
  text: string;
}) => {
  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(money);
  }, [money]);
  return (
    <div className="group absolute z-10 mt-10 flex items-center justify-between rounded-xl pl-px">
      <div>
        <Avatar img={{ url, color, text }} />
      </div>
      <div className="ml-2 w-44 drop-shadow-md">
        <h2 className="text-lg font-medium">{name}</h2>
        <span className="font-medium">
          {qty ? `${activity} - qty: ${qty}` : activity}
        </span>
        <span className="text-sm">{time}</span>
      </div>
      <div className="flex h-full w-32 flex-col items-end gap-5">
        <GrClose className="invisible inline-block cursor-pointer group-hover:visible" />
        <h2 className="text-end text-lg font-bold text-gray-800 drop-shadow-md">
          {valueMoney} VND
        </h2>
      </div>
    </div>
  );
};
