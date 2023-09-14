import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

import type {
  SelectOptionsInvoice,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

import { Avatar } from '../avatar';
import { AddUserAndDeleteUser } from './add-user-and-delete-user';
import { InvoiceAndLeaveTheTrip } from './invoice-and-leave-the-trip';

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
  const { invoice, leaveTheTrip, addUser, deleteUser } = data;

  const { id, payerImage, time } = invoice?.info || leaveTheTrip?.info || {};

  const { personAdded } = addUser || {};

  const { personDeleted } = deleteUser || {};

  const onDeleteInvoice = async (idInvoice: string) => {
    await DataFirebase.DeleteInvoice(currentIdJoinTrip, idInvoice);
  };

  const [renderinfo, setRenderInfo] = useState<JSX.Element>();

  useEffect(() => {
    if (addUser || deleteUser) {
      setRenderInfo(<AddUserAndDeleteUser data={data} />);
    } else if (invoice || leaveTheTrip) {
      setRenderInfo(<InvoiceAndLeaveTheTrip data={data} userList={userList} />);
    }
  }, [addUser, deleteUser, invoice, leaveTheTrip, userList]);

  return (
    <div className="group relative z-10 mt-4 flex items-center justify-between rounded-xl border bg-slate-100/70 px-2 pb-3 pt-4 shadow drop-shadow-md">
      <div className="absolute -top-3 flex h-3 w-full justify-center pr-4">
        <div className="h-full w-0.5 bg-gray-800 shadow" />
      </div>
      {showClose && !leaveTheTrip && !addUser && !deleteUser ? (
        <GrClose
          onClick={() => onDeleteInvoice(id?.toString() || '0')}
          className="invisible absolute right-0 top-0 mr-2 mt-4 inline-block cursor-pointer group-hover:visible"
        />
      ) : null}
      <div>
        <Avatar
          img={{
            url:
              payerImage?.url ||
              (addUser && personAdded?.avatar.url) ||
              (personDeleted && personDeleted?.avatar.url) ||
              '',
            color:
              payerImage?.color ||
              (addUser && personAdded?.avatar.color) ||
              (personDeleted && personDeleted?.avatar.color) ||
              '',
            text:
              payerImage?.text ||
              (addUser && personAdded?.avatar.text) ||
              (personDeleted && personDeleted?.avatar.text) ||
              '',
          }}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {renderinfo}
        <span className="mt-3.5 w-full text-end text-sm text-gray-800">
          {time || addUser?.time || deleteUser?.time}
        </span>
      </div>
    </div>
  );
};
