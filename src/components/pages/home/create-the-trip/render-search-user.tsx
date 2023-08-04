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
              item.name,
              item.gmail ? item.gmail : 'email',
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
                      name: item.name,
                      gmail: item.gmail,
                      image: {
                        color: item.image.color,
                        text: item.image.text,
                        url: item.image.url,
                      },
                    },
                  ]);
                }}
              >
                <Avatar
                  size="40"
                  color={item.image.color}
                  className="rounded-full shadow-md"
                  value={item.image.text}
                  src={item.image.url}
                />
                <h2 className="ml-3">{item.name}</h2>
              </div>
            ) : null,
          )
        : null}
    </div>
  );
};
