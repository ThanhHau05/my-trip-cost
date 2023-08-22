import { useContext } from 'react';

import { Button, VerticalMenu } from '@/components/base';
import type { SelectOptionsPeopleInVerticalMenu } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

import { RenderValueInVerticalMenu } from '.';
import { handleFinishTheTrip } from './handler';

export const RenderVerticalMenu = ({
  show,
  tripName,
  valueUserInvMenu,
  uidMaster,
  id,
  uid,
}: {
  show: boolean;
  tripName: string;
  valueUserInvMenu: SelectOptionsPeopleInVerticalMenu[];
  uidMaster: string;
  id: number;
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
      <div className="mt-2 h-12 w-full">
        <Button
          disabled={uidMaster !== uid}
          title="Finish the trip"
          onClick={() =>
            handleFinishTheTrip({
              id,
              uid,
              setFinishTheTrip,
            })
          }
        />
      </div>
    </VerticalMenu>
  ) : null;
};
