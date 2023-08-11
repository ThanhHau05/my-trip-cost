import clsx from 'clsx';
import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';

export const Quantity = ({
  valueQuantity,
  onChange,
}: {
  valueQuantity: string;
  onChange: (value: string) => void;
}) => {
  const [ischeck, setIsCheck] = useState(false);
  const _handleOnChange = (e: string) => {
    if (e.length <= 2 && +e >= 0 && +e <= 50) {
      onChange(e);
    }
  };
  return (
    <div className="h-8">
      <div className="flex h-full items-center justify-between">
        <div
          className="flex cursor-pointer items-center"
          onClick={() => setIsCheck(!ischeck)}
        >
          <div className="relative flex h-6 w-6 items-center justify-center rounded-lg border-2 border-gray-600">
            <BsCheckLg
              className={clsx(
                'absolute text-lg text-gray-700',
                ischeck ? 'block' : 'hidden',
              )}
            />
          </div>
          <h2 className="ml-2 select-none font-medium">Quantity</h2>
        </div>
        {ischeck ? (
          <input
            type="number"
            className="h-8 w-20 rounded-lg pl-2 outline-none drop-shadow-md"
            max={100}
            maxLength={3}
            onChange={(e) => _handleOnChange(e.target.value)}
            value={valueQuantity}
          />
        ) : null}
      </div>
    </div>
  );
};
