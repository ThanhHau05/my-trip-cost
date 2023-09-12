import { useRouter } from 'next/router';
import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/base';
import { MainContext } from '@/context/main-context';
import { selector } from '@/redux';

import { onSubmitNotiFinishTrip } from './handle-mytrip';

export const NotiFinishTheTrip = ({ value }: { value: string }) => {
  const {
    setFinishTheTrip,
    setShowVerticalMenu,
    setLoadingStartNow,
    finishthetrip,
  } = useContext(MainContext);
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="fixed z-40 flex h-full w-full items-center justify-center bg-gray-600/40">
      <div className="rounded-3xl bg-slate-100 p-5 drop-shadow-md">
        <GrClose
          className="mb-2 ml-auto mr-0 cursor-pointer"
          onClick={() => setFinishTheTrip({ value: '', isCheckValue: '' })}
        />
        <span className="font-medium">{value}</span>
        <div className="mt-5 flex h-10 w-full items-center justify-center gap-3">
          <Button
            title="Yes"
            onClick={() =>
              onSubmitNotiFinishTrip({
                currentIdJoinTrip,
                dispatch,
                finishthetrip,
                setFinishTheTrip,
                setLoadingStartNow,
                setShowVerticalMenu,
                uid: currentUserInformation.uid,
                router,
              })
            }
          />
          <Button
            bgWhite
            title="Cancel"
            onClick={() => setFinishTheTrip({ value: '', isCheckValue: '' })}
          />
        </div>
      </div>
    </div>
  );
};
