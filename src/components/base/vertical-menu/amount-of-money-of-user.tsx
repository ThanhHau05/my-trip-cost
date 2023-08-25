import { useMemo } from 'react';

import { handleFormatCurrentcy } from '@/components/pages/handler';

import { Avatar } from '../avatar';

export const AmountOfMoneyOfUser = ({
  name,
  url,
  color,
  text,
  money,
  id,
}: {
  name: string;
  url: string;
  color: string;
  text: string;
  money: number;
  id: number;
}) => {
  const valueMoney = useMemo(() => {
    return handleFormatCurrentcy(money);
  }, [money]);
  return (
    <div className="mx-1 flex items-center justify-between gap-1 rounded-xl border bg-white px-2 py-1 drop-shadow-md">
      <div className="flex items-center justify-start pr-2">
        <Avatar img={{ url, color, text }} size="40" />
        <div className="ml-1">
          <h2 className="text-sm font-medium drop-shadow">{name}</h2>
          {id !== 0 ? (
            <h2 className="text-xs">
              Id: <span className="font-medium text-gray-700">{id}</span>
            </h2>
          ) : (
            <span className="text-xs font-medium text-gray-700">
              The user doesn&apos;t have an ID
            </span>
          )}
        </div>
      </div>
      <h2 className="rounded-md border bg-slate-100 p-1 font-bold text-gray-800 drop-shadow-md">
        {valueMoney} VND
      </h2>
    </div>
  );
};
