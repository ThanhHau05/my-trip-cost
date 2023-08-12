import { useMemo } from 'react';

import { useFormatCurrentcy } from '@/hooks';

import { Avatar } from '../avatar';

export const AmountOfMoneyOfUser = ({
  name,
  url,
  color,
  text,
  money,
}: {
  name: string;
  url: string;
  color: string;
  text: string;
  money: number;
}) => {
  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(money);
  }, [money]);
  return (
    <div className="mx-1 flex items-center justify-between gap-1 rounded-xl border bg-white px-2 py-1 drop-shadow-md">
      <div className="flex items-center justify-center">
        <Avatar img={{ url, color, text }} />
        <h2 className="ml-1 text-lg font-medium drop-shadow-md">{name}</h2>
      </div>
      <h2 className="rounded-md border bg-slate-100 p-1 font-bold text-gray-800 drop-shadow-md">
        {valueMoney} VND
      </h2>
    </div>
  );
};
