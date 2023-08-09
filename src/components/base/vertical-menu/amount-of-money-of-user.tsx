import Avatar from 'react-avatar';

import { useFormatCurrentcy } from '@/hooks';

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
  const valueMoney = useFormatCurrentcy(money);
  return (
    <div className="mx-1 flex items-center justify-center gap-1 rounded-xl border bg-white px-2 py-1 drop-shadow-md">
      <Avatar round size="48" src={url} color={color} value={text} />
      <h2 className="mr-1 text-lg font-medium drop-shadow-md">{name}</h2>
      <h2 className="rounded-md border bg-slate-100 p-1 font-bold text-gray-800 drop-shadow-md">
        {valueMoney} VNĐ
      </h2>
    </div>
  );
};
