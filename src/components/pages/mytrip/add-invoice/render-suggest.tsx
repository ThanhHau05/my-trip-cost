import clsx from 'clsx';
import { useContext } from 'react';

import type { SelectOptionsObject } from '@/constants/select-options';
import { MyTripContext } from '@/context/mytrip-context';

import { handleOnChangeMoneySuggest } from '../handle-mytrip';

export const RenderSuggest = ({
  value,
  onChange,
  option,
}: {
  value: number;
  onChange: (value: number) => void;
  option: SelectOptionsObject[];
}) => {
  const { setDeleteMoney } = useContext(MyTripContext);

  return (
    <div className="grid grid-cols-3 gap-2">
      {option.map((item) => (
        <h2
          key={item.value}
          className={clsx(
            'cursor-pointer select-none rounded-md px-2 py-1 text-center font-medium shadow-sm drop-shadow-sm',
            value === item.value
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-800',
          )}
          onClick={() =>
            handleOnChangeMoneySuggest({
              e: +item.value,
              onChange,
              setDeleteMoney,
              valueMoneySuggest: value,
            })
          }
        >
          {item.title}
        </h2>
      ))}
    </div>
  );
};
