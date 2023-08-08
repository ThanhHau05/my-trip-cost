import type { Dispatch, SetStateAction } from 'react';
import Avatar from 'react-avatar';

import type { UserInformation } from '@/constants/select-options';

import { isCheckRender } from './hook';

export const RenderSearchUser = ({
  searchvalue,
  data,
  setUserListAdded,
  userlistadded,
  setInputValue,
}: {
  searchvalue: string;
  data: UserInformation[];
  setUserListAdded: Dispatch<SetStateAction<UserInformation[]>>;
  userlistadded: UserInformation[];
  setInputValue: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
}) => {
  return (
    <div className="scroll_invitation absolute z-10 flex max-h-full w-full flex-col gap-2 overflow-auto rounded-xl bg-white p-2 shadow-md">
      {searchvalue
        ? data.map((item) =>
            isCheckRender(
              item.id,
              item.displayName,
              item.email ? item.email : 'email',
              searchvalue,
              userlistadded,
            ) ? (
              <div
                key={item.id}
                className="flex cursor-pointer items-center justify-start rounded-xl p-2 transition-all hover:bg-slate-50"
                onClick={() => {
                  setInputValue({ value: '', error: '' });
                  setUserListAdded((e) => [
                    ...e,
                    {
                      id: item.id,
                      displayName: item.displayName,
                      email: item.email,
                      photoURL: {
                        color: item.photoURL.color,
                        text: item.photoURL.text,
                        url: item.photoURL.url,
                      },
                      uid: item.uid,
                      status: false,
                    },
                  ]);
                }}
              >
                <Avatar
                  size="40"
                  color={item.photoURL.url ? '' : item.photoURL.color}
                  className="rounded-full shadow-md"
                  value={item.photoURL.url ? '' : item.photoURL.text}
                  src={item.photoURL.url}
                />
                <h2 className="ml-3">{item.displayName}</h2>
              </div>
            ) : null,
          )
        : null}
    </div>
  );
};
