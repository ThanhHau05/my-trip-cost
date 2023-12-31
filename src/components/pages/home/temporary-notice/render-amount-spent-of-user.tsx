import { AmountOfMoneyOfUser } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';

export const RenderAmountSpentOfUser = ({
  data,
}: {
  data: UserInformation[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => (
        <AmountOfMoneyOfUser
          key={item.uid}
          color={item.photoURL.color || ''}
          money={item.totalmoney || 0}
          name={item.displayName}
          text={item.photoURL.text || ''}
          url={item.photoURL.url || ''}
          id={item.id || 0}
        />
      ))}
    </div>
  );
};
