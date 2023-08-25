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
            <div className="ml-3">
              <h2>{item.displayName}</h2>
              {item.id ? (
                <h2 className="text-sm">
                  Id: <span className=" text-gray-800">{item.id}</span>
                </h2>
              ) : (
                <span className="text-sm text-gray-800">
                  The user doesn&apos;t have an ID
                </span>
              )}
            </div>
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
