import { useSelector } from 'react-redux';

import type { SelectOptionsInvoice } from '@/constants/select-options';
import { selector } from '@/redux';

import { Avatar } from '../avatar';

export const AddUserAndDeleteUser = ({
  data,
}: {
  data: SelectOptionsInvoice;
}) => {
  const { currentUserInformation } = useSelector(selector.user);
  const { addUser, deleteUser } = data;
  const { personBeAdded } = addUser || {};
  const { personBeDeleted } = deleteUser || {};
  return (
    <div className="w-full">
      <span className="inline-block w-full pl-5">
        {addUser?.personAdded.uid === currentUserInformation.uid
          ? 'You '
          : `${addUser ? addUser.name : deleteUser?.name} `}
        have {addUser ? 'added' : 'removed'}{' '}
        {addUser ? (
          personBeAdded?.map((user, index) => {
            if (index < personBeAdded.length - 1) {
              return (
                <span key={user.uid} className="inline-block">
                  <Avatar
                    img={{
                      color: user.avatar.color,
                      text: user.avatar.text,
                      url: user.avatar.url,
                    }}
                    size="24"
                  />
                  <span className="px-1 font-medium">
                    {user.name}
                    {index >= personBeAdded.length - 2 ? null : <span>,</span>}
                  </span>
                </span>
              );
            }
            return (
              <span key={user.uid} className="inline-block">
                {personBeAdded.length > 1 ? <span> and </span> : null}
                <Avatar
                  img={{
                    color: user.avatar.color,
                    text: user.avatar.text,
                    url: user.avatar.url,
                  }}
                  size="24"
                />
                <span className="px-1 font-medium">{user.name} </span>
              </span>
            );
          })
        ) : (
          <span className="inline-block">
            <Avatar
              img={{
                color: personBeDeleted?.avatar.color || '',
                text: personBeDeleted?.avatar.text || '',
                url: personBeDeleted?.avatar.url || '',
              }}
              size="24"
            />
            <span className="px-1 font-medium">{personBeDeleted?.name} </span>
          </span>
        )}
        {addUser ? 'to' : 'from'} the trip.
      </span>
    </div>
  );
};
