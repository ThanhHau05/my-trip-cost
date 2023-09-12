import { useContext } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';

import { Button, VerticalMenu } from '@/components/base';
import type { SelectOptionsPeopleInVerticalMenu } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

import { handleNotiFinishTrip, RenderValueInVerticalMenu } from '.';

export const RenderVerticalMenu = ({
  show,
  tripName,
  valueUserInvMenu,
  uidMaster,
  uid,
}: {
  show: boolean;
  tripName: string;
  valueUserInvMenu: SelectOptionsPeopleInVerticalMenu[];
  uidMaster: string;
  uid: string;
}) => {
  const { setFinishTheTrip, setShowAddFellowCompanions } =
    useContext(MainContext);
  return show ? (
    <VerticalMenu>
      <div className="flex flex-col">
        <h2 className="font-medium">Trip name:</h2>
        <h2 className="mb-2 text-2xl font-bold leading-7 drop-shadow-md">
          {tripName}
        </h2>
      </div>
      <h2 className="pb-2 font-medium">People</h2>
      <div className="flex h-[calc(100%-110px)] flex-col justify-between">
        <div className="scrollbarstyle h-[calc(100%-58px)] overflow-auto">
          <div>
            <div
              onClick={() => setShowAddFellowCompanions(true)}
              className="group relative mb-2 ml-[11px] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border bg-white shadow transition-all hover:ml-0 hover:w-56 hover:shadow-md"
            >
              <AiOutlineUserAdd className="text-lg text-gray-900 drop-shadow-md group-hover:invisible" />
              <h2 className="invisible absolute font-medium text-gray-800 group-hover:visible group-hover:delay-150">
                Add Fellow Companions +
              </h2>
            </div>
            <RenderValueInVerticalMenu data={valueUserInvMenu} />
          </div>
        </div>
        <div className="mt-2 flex h-12 w-full items-center justify-center gap-2">
          {uidMaster === uid ? (
            <Button
              bgWhite
              title="Finish the trip"
              onClick={() =>
                handleNotiFinishTrip({ value: 'finish', setFinishTheTrip })
              }
            />
          ) : null}
          <Button
            title="Leave the trip"
            onClick={() =>
              handleNotiFinishTrip({ value: 'leave', setFinishTheTrip })
            }
          />
        </div>
      </div>
    </VerticalMenu>
  ) : null;
};
