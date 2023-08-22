import clsx from 'clsx';
import { useContext } from 'react';

import { PRICEOPTIONS } from '@/constants/select-options';
import { MyTripContext } from '@/context/mytrip-context';

import { handleOnChangeMoneySuggest } from '../handler';

export const RenderSuggest = ({
  valueMoneySuggest,
  onChange,
}: {
  valueMoneySuggest: number;
  onChange: (value: number) => void;
}) => {
  const { setDeleteMoney } = useContext(MyTripContext);

  return (
    <div className="grid grid-cols-3 gap-2">
      {PRICEOPTIONS.map((item) => (
        <h2
          key={item.value}
          className={clsx(
            'cursor-pointer select-none rounded-md px-2 py-1 text-center font-medium shadow-sm drop-shadow-sm',
            valueMoneySuggest === item.value
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-800',
          )}
          onClick={() =>
            handleOnChangeMoneySuggest({
              e: +item.value,
              onChange,
              setDeleteMoney,
              valueMoneySuggest,
            })
          }
        >
          {item.title}
        </h2>
      ))}
    </div>
  );
};
