import { BsCardList } from 'react-icons/bs';

import { Invitation } from '@/components/base/invitation';
import type { SelectOptionsInvitation } from '@/constants/select-options';

export const NotificationPage = () => {
  return (
    <div className="h-full w-full rounded-t-[40px] bg-white">
      <div className="flex h-full w-full flex-col items-center justify-center px-5 pt-4">
        <h2 className="text-center text-3xl font-medium text-gray-800 drop-shadow-md">
          There is no notification or invitation for any trip
        </h2>
        <BsCardList className="text-4xl text-gray-800 drop-shadow-md" />
      </div>
    </div>
  );
};

export const RenderInvitation = ({
  data,
}: {
  data: SelectOptionsInvitation[];
}) => {
  return (
    <div className="h-full w-full py-2">
      <div className="scroll_invitation flex h-full flex-col items-center justify-start gap-2 overflow-auto rounded-3xl px-2">
        {data.map((item) => (
          <Invitation
            key={item.tripid}
            name={item.name}
            tripid={item.tripid}
            tripname={item.tripname}
            dateandtime={item.dateandtime}
          />
        ))}
      </div>
    </div>
  );
};
