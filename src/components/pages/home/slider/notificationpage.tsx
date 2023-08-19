import { useContext } from 'react';
import { BsCardList } from 'react-icons/bs';

import { Invitation } from '@/components/base/invitation';
import type { SelectOptionsInvitation } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

export const NotificationPage = ({
  currentData,
}: {
  currentData: SelectOptionsInvitation[];
}) => {
  const { sliderRef } = useContext(MainContext);

  return (
    <div className="h-full w-full rounded-t-[40px] bg-white">
      <div className="flex items-center justify-between px-6 pt-4">
        <div
          className="group relative flex h-4 w-6 cursor-pointer flex-col justify-center drop-shadow-md"
          onClick={() => sliderRef.current.slickGoTo(0)}
        >
          <div className="absolute h-4 w-4 rotate-[315deg] border-l-[3px] border-t-[3px] border-gray-800 group-hover:border-gray-900" />
          <div className="h-[2.5px] w-6 bg-gray-800 group-hover:bg-gray-900" />
        </div>
        <h2 className="text-xl font-medium drop-shadow-md">Invitation</h2>
      </div>
      {currentData.length !== 0 ? (
        <RenderInvitation data={currentData} />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center px-5 pt-4">
          <h2 className="text-center text-3xl font-medium text-gray-800 drop-shadow-md">
            There is no notification or invitation for any trip
          </h2>
          <BsCardList className="text-4xl text-gray-800 drop-shadow-md" />
        </div>
      )}
    </div>
  );
};

export const RenderInvitation = ({
  data,
}: {
  data: SelectOptionsInvitation[];
}) => {
  return (
    <div className="h-[calc(100%-46px)] w-full py-2">
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
