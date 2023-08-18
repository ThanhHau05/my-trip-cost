import type { Dispatch, SetStateAction } from 'react';

import { Avatar, Button } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';
import { useRandomUid } from '@/hooks';

import { getRandomColor } from '../../welcome';
import { CheckUserInData, isCheckUserMaster } from './hook';

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
  const onSubmit = (
    uid: string,
    displayName: string,
    id: number,
    color: string,
    text: string,
    url: string,
  ) => {
    if (!CheckUserInData(uid, userlistadded)) {
      setInputValue({ value: '', error: '' });
      setUserListAdded((e) => [
        ...e,
        {
          id,
          displayName,
          photoURL: {
            color,
            text,
            url,
          },
          uid,
          status: false,
        },
      ]);
    }
  };
  return (
    <div className="scroll_invitation absolute z-10 flex max-h-full w-full flex-col gap-2 overflow-auto rounded-xl bg-white p-2 shadow-md">
      {searchvalue.length >= 3 ? (
        <RenderUserByName
          data={userlistadded}
          name={searchvalue}
          setInputValue={setInputValue}
          setUserListAdded={setUserListAdded}
        />
      ) : null}
      {searchvalue
        ? data.map((item) => {
            const { displayName, id, uid } = item;
            const { color, text, url } = item.photoURL;
            return isCheckUserMaster(
              item.displayName,
              item.id || 0,
              item.uid,
            ) ? (
              <div
                key={item.id}
                className="flex cursor-pointer items-center justify-start rounded-xl p-2 transition-all hover:bg-slate-50"
                onClick={() => {
                  onSubmit(
                    uid,
                    displayName,
                    id || 0,
                    color || '',
                    text || '',
                    url || '',
                  );
                }}
              >
                <Avatar
                  size="40"
                  img={{
                    url,
                    color,
                    text,
                  }}
                />
                <h2 className="ml-3">{item.displayName}</h2>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
};

export const RenderUserByName = ({
  data,
  name,
  setInputValue,
  setUserListAdded,
}: {
  data: UserInformation[];
  name: string;
  setInputValue: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  setUserListAdded: Dispatch<SetStateAction<UserInformation[]>>;
}) => {
  if (
    data.find((item) => item.displayName.toLowerCase() === name.toLowerCase())
  ) {
    return null;
  }

  const color = getRandomColor();
  const text = name[0]?.toUpperCase();
  const uid = useRandomUid();
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-xl p-2 transition-all hover:bg-slate-50">
      <div className="flex items-center justify-center">
        <Avatar
          size="40"
          img={{
            color,
            text,
          }}
        />
        <h2 className="ml-3">{name} (User has no account)</h2>
      </div>
      <div className="h-7 w-16">
        <Button
          bgWhite
          title="Add"
          onClick={() => {
            setInputValue({ value: '', error: '' });
            setUserListAdded((e) => [
              ...e,
              {
                displayName: name,
                photoURL: {
                  color,
                  text,
                  url: '',
                },
                uid,
                status: true,
              },
            ]);
          }}
        />
      </div>
    </div>
  );
};
