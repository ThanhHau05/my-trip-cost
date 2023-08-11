import { useMemo } from 'react';
import Avatar from 'react-avatar';
import { GrClose } from 'react-icons/gr';

import { useFormatCurrentcy } from '@/hooks';

export const Invoice = ({
  name,
  activity,
  qty,
  description,
  time,
  money,
  url,
  color,
  text,
}: {
  name: string;
  activity: string;
  description?: string;
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
    <div className="group mt-10 flex items-center justify-between rounded-xl pl-px">
      <div>
        <Avatar round size="48" src={url} color={color} value={text} />
      </div>
      <div className="ml-2 w-44 drop-shadow-md">
        <h2 className="text-lg font-medium">{name}</h2>
        <span className="font-medium">
          {qty ? `${activity} - qty: ${qty}` : activity}
        </span>
        <p className="text-sm">{description}</p>
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
