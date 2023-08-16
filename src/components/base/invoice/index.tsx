import clsx from 'clsx';
import { useMemo } from 'react';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

import { DataFirebase } from '@/firebase';
import { useFormatCurrentcy } from '@/hooks';
import { selector } from '@/redux';

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
  other,
  id,
  showClose,
}: {
  name: string;
  activity: string;
  time: string;
  money: number;
  qty: number;
  url: string;
  color: string;
  text: string;
  other: string;
  id: string;
  showClose?: boolean;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(money);
  }, [money]);

  const valueMoneyQty = useMemo(() => {
    if (qty >= 2) {
      return useFormatCurrentcy(money * 2);
    }
    return undefined;
  }, [money, qty]);

  const onDeleteInvoice = async (idInvoice: string) => {
    await DataFirebase.useDeleteInvoice(currentIdJoinTrip, idInvoice);
  };

  return (
    <div className="group relative z-10 mt-4 flex items-center justify-between rounded-xl bg-gray-200/60 px-2 py-6 shadow drop-shadow-md">
      <div className="absolute -top-3 flex h-3 w-full justify-center">
        <div className="h-full w-0.5 bg-gray-800 shadow" />
      </div>
      {showClose ? (
        <GrClose
          onClick={() => onDeleteInvoice(id)}
          className="invisible absolute right-0 top-0 mr-2 mt-4 inline-block cursor-pointer group-hover:visible"
        />
      ) : null}
      <div>
        <Avatar img={{ url, color, text }} />
      </div>
      <div className="ml-2 w-44 drop-shadow-md">
        <h2 className="text-lg font-medium">{name}</h2>
        <span className="font-medium">
          {qty ? `${activity} - qty: ${qty}` : activity}
        </span>
        <p>{other}</p>
        <span className="block text-sm">{time}</span>
      </div>
      <div
        className={clsx(
          'flex h-full w-32 flex-col items-end',
          valueMoneyQty ? 'justify-end' : 'justify-center',
        )}
      >
        <h2 className="text-end text-lg font-bold text-gray-800 drop-shadow-md">
          {valueMoney} {qty >= 2 ? `x ${qty}` : 'VND'}
        </h2>
        {valueMoneyQty ? (
          <h2 className="text-end text-xl font-bold text-gray-800 drop-shadow-md">
            {valueMoneyQty} VND
          </h2>
        ) : null}
      </div>
    </div>
  );
};
