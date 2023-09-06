/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

import { handleFormatCurrentcy } from '@/components/pages/handler';
import type {
  SelectOptionsInvoice,
  SelectOptionsPayees,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

import { Avatar } from '../avatar';

export const Invoice = ({
  data,
  showClose,
  userList,
}: {
  data: SelectOptionsInvoice;
  showClose?: boolean;
  userList: UserInformation[];
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const {
    listPayees,
    payerImage,
    payerName,
    time,
    totalMoney,
    id,
    leaveTheTrip,
  } = data;

  const valueMoney = useMemo(() => {
    return handleFormatCurrentcy(totalMoney);
  }, [totalMoney]);

  const [userPayees, setUserPayees] = useState<JSX.Element>();

  useEffect(() => {
    async function fetchUserPayees(value: SelectOptionsPayees[]) {
      const userPayeesElement = await RenderUserPayees({
        data: value,
        userList,
      });
      setUserPayees(userPayeesElement);
    }
    if (listPayees) {
      fetchUserPayees(listPayees);
    }
  }, [listPayees, userList]);

  const onDeleteInvoice = async (idInvoice: string) => {
    await DataFirebase.DeleteInvoice(currentIdJoinTrip, idInvoice);
  };

  return (
    <div className="group relative z-10 mt-4 flex items-center justify-between rounded-xl border bg-slate-100/70 px-2 pb-3 pt-4 shadow drop-shadow-md">
      <div className="absolute -top-3 flex h-3 w-full justify-center pr-4">
        <div className="h-full w-0.5 bg-gray-800 shadow" />
      </div>
      {showClose && !leaveTheTrip ? (
        <GrClose
          onClick={() => onDeleteInvoice(id)}
          className="invisible absolute right-0 top-0 mr-2 mt-4 inline-block cursor-pointer group-hover:visible"
        />
      ) : null}
      <div>
        <Avatar
          img={{
            url: payerImage.url,
            color: payerImage.color,
            text: payerImage.text,
          }}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
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
                  <span className="font-bold text-gray-800">{payerName}</span>{' '}
                  has left the trip
                </h2>
                <h2 className="mt-1 text-lg font-medium text-gray-800">
                  Total amount spent:{' '}
                  <span className="font-bold text-gray-800">
                    {totalMoney} VND
                  </span>
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
        <span className="mt-3.5 w-full text-end text-sm text-gray-800">
          {time}
        </span>
      </div>
    </div>
  );
};

const RenderUserPayees = async ({
  data,
  userList,
}: {
  data: SelectOptionsPayees[];
  userList: UserInformation[];
}) => {
  return (
    <div>
      {data.map((item) => {
        const infoUser = userList.find((user) => user.uid === item.uid);
        return (
          <div key={item.uid} className="flex items-center gap-2">
            <div className="w-6">
              <Avatar
                img={{
                  color: infoUser?.photoURL.color,
                  text: infoUser?.photoURL.text,
                  url: infoUser?.photoURL.url,
                }}
                size="24"
              />
            </div>
            <div className="text-sm">
              <span className="block font-medium">
                {item.qty ? (
                  item.activity === 'others' ? (
                    <>
                      {item.activity}:{' '}
                      <span className="font-normal">{item.other}</span> - qty:{' '}
                      {item.qty}
                    </>
                  ) : (
                    `${item.activity} - qty: ${item.qty}`
                  )
                ) : item.activity === 'others' ? (
                  <>
                    {item.activity}:{' '}
                    <span className="font-normal">{item.other}</span> - qty:{' '}
                    {item.qty}
                  </>
                ) : (
                  `${item.activity}`
                )}
              </span>
              <span>
                Money:{' '}
                <span className="font-medium">
                  {handleFormatCurrentcy(item.money || item.moneySuggest)} VND
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
