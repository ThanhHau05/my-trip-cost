import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type { SelectOptionsTrip } from '@/constants/select-options';
import { db } from '@/firebase';
import { useFormatCurrentcy } from '@/hooks';
import { selector } from '@/redux';

import { RenderInvoice } from '../../mytrip';
import { RenderAmountSpentOfUser } from './render-amount-spent-of-user';
import { RenderUserAvt } from './render-avt';
import { RenderShowInfo } from './render-show-info';

export const TemporaryNotice = ({ data }: { data: SelectOptionsTrip }) => {
  const { currentUserInformation } = useSelector(selector.user);
  const [showuser, setShowUser] = useState(false);
  const [showtriphistory, setShowTripHistory] = useState(false);
  const onSubmit = async () => {
    const docRef = doc(db, 'UserInvitations', currentUserInformation.uid);
    const isCheck = await getDoc(docRef);
    if (isCheck.exists()) {
      await setDoc(docRef, { ...isCheck.data(), temporaryNotice: [] });
    }
  };

  return (
    <div className="fixed z-40 h-full w-400 rounded-[40px] bg-slate-300/40 p-4">
      <div className="dropdown relative flex h-full w-full flex-col justify-between rounded-3xl bg-slate-100 pl-3 pr-1">
        <div className="dropdown flex h-4/5 w-full flex-col gap-2 overflow-y-auto overflow-x-hidden">
          <h2 className="text-center text-lg font-medium drop-shadow-md">
            Recent trip
          </h2>
          <span className="text-xl font-medium drop-shadow-md">
            Tripname :{' '}
            <h2 className="inline-block text-2xl font-bold">{data.tripname}</h2>
          </span>
          <span>
            Start time:{' '}
            <h2 className="inline-block text-lg font-medium drop-shadow-md">
              {data.starttime}
            </h2>
          </span>
          <span>
            End time:{' '}
            <h2 className="inline-block text-lg font-medium drop-shadow-md">
              {data.endtime}
            </h2>
          </span>
          <span>
            Total amount spent:{' '}
            <h2 className="inline-block font-bold drop-shadow-md">
              {data.totalmoney ? useFormatCurrentcy(data.totalmoney) : 0} VND
            </h2>
          </span>
          <span>
            Reserve Money:{' '}
            <h2 className="inline-block font-bold drop-shadow-md">
              {data.reservemoney ? useFormatCurrentcy(data.reservemoney) : 0}{' '}
              VND
            </h2>
          </span>
          <div>
            <h2 className="mb-2">Members:</h2>
            <div className="dropdown w-full overflow-auto">
              <RenderUserAvt data={data.userlist || []} />
            </div>
          </div>
          <RenderShowInfo
            setShow={setShowUser}
            show={showuser}
            title="Individual Expenses"
          >
            <RenderAmountSpentOfUser data={data.userlist} />
          </RenderShowInfo>
          <RenderShowInfo
            setShow={setShowTripHistory}
            show={showtriphistory}
            title="Spending history"
          >
            <div className="pb-3">
              <RenderInvoice data={data.invoice || []} />
            </div>
          </RenderShowInfo>
        </div>
        <div className="absolute bottom-20 left-0 z-10 h-12 w-full px-3">
          <Button title="OK" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};
