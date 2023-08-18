import { AmountOfMoneyOfUser } from '@/components/base';
import type { SelectOptionsPeopleInVerticalMenu } from '@/constants/select-options';

export const RenderValueInVerticalMenu = ({
  data,
}: {
  data: SelectOptionsPeopleInVerticalMenu[];
}) => {
  return (
    <div className="dropdown flex h-[calc(100%-160px)] flex-col gap-2 overflow-auto">
      {data ? (
        data.map((item) => (
          <AmountOfMoneyOfUser
            key={item.uid}
            name={item.name}
            url={item.img.url}
            color={item.img.color}
            text={item.img.text}
            money={item.money}
          />
        ))
      ) : (
        <div className="flex h-14 w-80 items-center justify-start rounded-xl bg-white px-2 drop-shadow-md">
          <div className="skeleton h-12 w-12 rounded-full" />
          <div className="skeleton ml-1 h-7 w-36 rounded-lg" />
        </div>
      )}
    </div>
  );
};
