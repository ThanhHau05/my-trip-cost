import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Input } from '@/components/base';
import { useFormatCurrentcy } from '@/hooks';
import { selector } from '@/redux';

export const RenderReserveMoney = ({
  masteruid,
  onChangeMoney,
  value,
  error,
}: {
  masteruid: string;
  onChangeMoney: (e: string) => void;
  value: string;
  error: string;
}) => {
  const { currentUserInformation } = useSelector(selector.user);
  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(+value);
  }, [value]);

  return (
    <div>
      {masteruid === currentUserInformation.uid ? (
        <div className="mt-3 h-32">
          <h2>Reserve money (optional)</h2>
          <Input
            error={error}
            value={value}
            onChangeText={(e) => onChangeMoney(e)}
          />
          <h2 className="ml-2 mt-2 font-medium text-gray-700">
            {valueMoney} VNĐ
          </h2>
        </div>
      ) : null}
    </div>
  );
};
