import { useEffect, useRef } from 'react';

import { handleClickOutSideQuantity, handleOnChangeQuantity } from '../handler';

export const Quantity = ({
  valueQuantity,
  onChange,
}: {
  valueQuantity: string;
  onChange: (value: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleClickOutSideQuantity(inputRef, valueQuantity, onChange);
  }, [valueQuantity]);
  return (
    <div className="h-8">
      <div className="flex h-full items-center justify-between">
        <h2 className="select-none font-medium drop-shadow-md">Quantity</h2>
        <div ref={inputRef}>
          <input
            type="number"
            className="h-8 w-20 rounded-lg pl-2 outline-none drop-shadow-md"
            max={100}
            maxLength={3}
            onChange={(e) => handleOnChangeQuantity(e.target.value, onChange)}
            value={valueQuantity}
          />
        </div>
      </div>
    </div>
  );
};
