import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import { handleFormatCurrentcy } from '@/components/pages';
import type {
  SelectOptionsInvoice,
  SelectOptionsPayees,
  UserInformation,
} from '@/constants/select-options';

import { RenderUserPayees } from './render-user-payees';

export const InvoiceAndLeaveTheTrip = ({
  data,
  userList,
}: {
  data: SelectOptionsInvoice;
  userList: UserInformation[];
}) => {
  const { invoice, leaveTheTrip } = data;
  const { payerName, totalMoney } = invoice?.info || leaveTheTrip?.info || {};

  const [userPayees, setUserPayees] = useState<JSX.Element>();

  useEffect(() => {
    async function fetchUserPayees(value: SelectOptionsPayees[]) {
      const userPayeesElement = await RenderUserPayees({
        data: value,
        userList,
      });
      setUserPayees(userPayeesElement);
    }
    if (invoice?.listPayees) {
      fetchUserPayees(invoice.listPayees);
    }
  }, [invoice?.listPayees, userList]);

  const valueMoney = useMemo(() => {
    if (totalMoney) {
      return handleFormatCurrentcy(totalMoney);
    }
    return 0;
  }, [totalMoney]);

  return (
    <div
      className={clsx(
        'flex items-center',
        leaveTheTrip ? 'w-full justify-around' : 'justify-center',
      )}
    >
      <div
        className={clsx(
          'ml-2 w-full drop-shadow-md',
          leaveTheTrip ? null : ' sm:w-44',
        )}
      >
        {leaveTheTrip ? (
          <>
            <h2 className="text-lg font-medium text-gray-800">
              <span className="font-bold text-gray-800">{payerName}</span> has
              left the trip
            </h2>
            <h2 className="mt-1 text-lg font-medium text-gray-800">
              Total amount spent:{' '}
              <span className="font-bold text-gray-800">{totalMoney} VND</span>
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-lg font-medium">Payer: {payerName}</h2>
            <h2 className="font-medium">payees:</h2>
            {userPayees}
          </>
        )}
      </div>
      {!leaveTheTrip ? (
        <div className="flex h-full flex-col items-end justify-center">
          <h2 className="text-end text-lg font-bold text-gray-800">
            {valueMoney}
            {' VND'}
          </h2>
        </div>
      ) : null}
    </div>
  );
};
