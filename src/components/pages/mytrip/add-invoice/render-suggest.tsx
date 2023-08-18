import clsx from 'clsx';
import { useContext } from 'react';

import { PRICEOPTIONS } from '@/constants/select-options';
import { MyTripContext } from '@/context/mytrip-context';

export const RenderSuggest = ({
  valueMoneySuggest,
  onChange,
}: {
  valueMoneySuggest: number;
  onChange: (value: number) => void;
}) => {
  const { setDeleteMoney } = useContext(MyTripContext);
  const _handleOnChangeMoneySuggest = (e: number) => {
    if (valueMoneySuggest === 0 || e !== valueMoneySuggest) {
      onChange(+e);
      setDeleteMoney(false);
    } else {
      onChange(0);
      setDeleteMoney(true);
    }
  };
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
          onClick={() => _handleOnChangeMoneySuggest(+item.value)}
        >
          {item.title}
        </h2>
      ))}
    </div>
  );
};
