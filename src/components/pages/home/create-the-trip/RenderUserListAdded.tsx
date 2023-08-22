import type { Dispatch, SetStateAction } from 'react';
import { IoClose } from 'react-icons/io5';

import { Avatar } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';

import { handleRemoveUserInUserListAdded } from '../handler';

export const RenderUserListAdded = ({
  data,
  setUserListAdded,
}: {
  data: UserInformation[];
  setUserListAdded: Dispatch<SetStateAction<UserInformation[]>>;
}) => {
  return (
    <div className="scrollbarstyle flex h-full flex-col justify-start gap-2 overflow-auto">
      {data.map((item) => (
        <div
          key={item.uid}
          className="flex items-center justify-between rounded-xl p-2 transition-all hover:bg-slate-100"
        >
          <div className="flex items-center justify-center">
            <Avatar
              size="40"
              img={{
                url: item.photoURL.url,
                color: item.photoURL.color,
                text: item.photoURL.text,
              }}
            />
            <h2 className="ml-3">{item.displayName}</h2>
          </div>
          <IoClose
            className="cursor-pointer text-xl text-gray-900"
            onClick={() =>
              setUserListAdded(
                handleRemoveUserInUserListAdded(data, item.uid || ''),
              )
            }
          />
        </div>
      ))}
    </div>
  );
};
