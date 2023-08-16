import { doc, setDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/base';
import { MainContext } from '@/context/main-context';
import { DataFirebase, db } from '@/firebase';
import { useGetTimeAndDate, useTotalMoneyTheTrip } from '@/hooks';
import { selector, TripActions } from '@/redux';

export const NotiFinishTheTrip = ({ value }: { value: string }) => {
  const { setFinishTheTrip, setShowVerticalMenu } = useContext(MainContext);
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    setFinishTheTrip('');
    setShowVerticalMenu(false);
    const docRef = doc(db, 'Trips', currentIdJoinTrip.toString());
    const valueTrip = await DataFirebase.useGetTrip(currentIdJoinTrip);
    await setDoc(docRef, {
      trip: {
        ...valueTrip,
        status: false,
        endtime: useGetTimeAndDate(),
        totalmoney: useTotalMoneyTheTrip(currentIdJoinTrip),
      },
    });
    const trip = await DataFirebase.useGetTrip(currentIdJoinTrip);
    const invoice = await DataFirebase.useGetInvoiceInTripData(
      currentIdJoinTrip,
    );
    invoice?.map(async (item) => {
      if (trip) {
        await DataFirebase.useAddTempoaryNotice(item.uid, trip);
        await DataFirebase.useAddTripIntoUserHistory(item.uid, trip);
      }
    });
    await DataFirebase.useDeleteTheTrip(currentIdJoinTrip);
    dispatch(TripActions.setCurrentIdJoinTrip(0));
  };
  return (
    <div className="fixed z-40 flex h-full w-full items-center justify-center bg-gray-600/40">
      <div className="rounded-3xl bg-slate-100 p-5 drop-shadow-md">
        <GrClose
          className="mb-2 ml-auto mr-0 cursor-pointer"
          onClick={() => setFinishTheTrip('')}
        />
        <span className="font-medium">{value}</span>
        <div className="mt-5 flex h-10 w-full items-center justify-center gap-3">
          <Button title="Yes" onClick={onSubmit} />
          <Button bgWhite title="Cancel" onClick={() => setFinishTheTrip('')} />
        </div>
      </div>
    </div>
  );
};
