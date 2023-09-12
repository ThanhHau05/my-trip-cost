import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import { MainContext } from '@/context/main-context';
import { selector } from '@/redux';

import {
  handleCheckReserveMoney,
  onStartTrip,
} from './handle-status-create-trip';
import { RenderoptionStartCreateTrip } from './RenderOption';

export const StatusCreateTrip = ({
  masterUid,
  disabledStartTrip,
  checkReserveMoney,
}: {
  masterUid: string;
  disabledStartTrip: boolean;
  checkReserveMoney: number;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const { setConentConfirm, setLoadingStartNow } = useContext(MainContext);

  const [reservemoney, setReserveMoney] = useState({ value: '', error: '' });

  useEffect(() => {
    handleCheckReserveMoney(currentIdJoinTrip, reservemoney.value);
  }, [reservemoney.value]);

  return (
    <div className="relative z-10 h-full">
      <div className="relative flex h-full w-full flex-col justify-between rounded-t-[35px] bg-white px-5 pt-5">
        <div className="border_welcome_bottom_status_trip absolute bottom-14 left-0 h-56 w-40 bg-teal-500" />
        <div className="border_welcome_top absolute right-0 top-10 h-56 w-40 bg-teal-500" />
        <RenderoptionStartCreateTrip
          masterUid={masterUid}
          reservemoney={reservemoney}
          setReserveMoney={setReserveMoney}
        />
        <div>
          <div className="mb-9 flex h-12 w-full items-center justify-center gap-3">
            <Button
              title="Start trip"
              onClick={() =>
                onStartTrip(
                  checkReserveMoney,
                  reservemoney,
                  setReserveMoney,
                  currentIdJoinTrip,
                  setLoadingStartNow,
                )
              }
              disabled={disabledStartTrip}
            />
            <Button
              bgWhite
              title="Cancel trip"
              onClick={() => setConentConfirm('Want to cancel your trip ?')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
