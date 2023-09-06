import { useContext } from 'react';

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
  const { setFinishTheTrip } = useContext(MainContext);
  return show ? (
    <VerticalMenu>
      <div className="flex flex-col">
        <h2 className="font-medium">Trip name:</h2>
        <h2 className="mb-2 text-2xl font-bold leading-7 drop-shadow-md">
          {tripName}
        </h2>
      </div>
      <h2 className="pb-2 font-medium">People</h2>
      <RenderValueInVerticalMenu data={valueUserInvMenu} />
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
    </VerticalMenu>
  ) : null;
};
