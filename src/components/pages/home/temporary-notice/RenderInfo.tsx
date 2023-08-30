import { useState } from 'react';

import type { SelectOptionsTrip } from '@/constants/select-options';

import { handleFormatCurrentcy } from '../../handler';
import { RenderInvoice } from '../../mytrip';
import { RenderAvt } from '../trip-history';
import { RenderAmountSpentOfUser } from './render-amount-spent-of-user';
import { RenderShowInfo } from './render-show-info';

export const RenderInfoTemporaryNotice = ({
  data,
  showTitle,
}: {
  data: SelectOptionsTrip;
  showTitle?: boolean;
}) => {
  const [showuser, setShowUser] = useState(false);
  const [showtriphistory, setShowTripHistory] = useState(false);

  return (
    <div className="scrollbarstyle flex h-4/5 w-full flex-col gap-2 overflow-y-auto overflow-x-hidden">
      {showTitle ? (
        <h2 className="text-center text-lg font-medium drop-shadow-md">
          Recent trip
        </h2>
      ) : null}
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
          {data.totalmoney ? handleFormatCurrentcy(data.totalmoney) : 0} VND
        </h2>
      </span>
      <span>
        Reserve Money:{' '}
        <h2 className="inline-block font-bold drop-shadow-md">
          {data.reservemoney ? handleFormatCurrentcy(data.reservemoney) : 0} VND
        </h2>
      </span>
      <div>
        <h2 className="mb-2">Members:</h2>
        <div className="scrollbarstyle w-full overflow-auto">
          <RenderAvt data={data.userlist || []} />
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
  );
};
