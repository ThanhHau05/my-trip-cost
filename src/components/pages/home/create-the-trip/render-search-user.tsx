/* eslint-disable jsx-a11y/alt-text */
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Avatar, Button } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';
import { selector } from '@/redux';

import { handleRandomUid } from '../../handler';
import { getRandomColor } from '../../welcome';
import { handleCheckUserInData } from '../handler';

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
  const { currentUserInformation } = useSelector(selector.user);
  const [userlist, setUserList] = useState<UserInformation[]>([]);

  const onSubmit = (
    uid: string,
    displayName: string,
    id: number,
    color: string,
    text: string,
    url: string,
  ) => {
    if (!handleCheckUserInData(uid, userlistadded)) {
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

  useEffect(() => {
    const users = data.filter(
      (item) =>
        (item.displayName.toLowerCase().includes(searchvalue) ||
          item.id?.toString().includes(searchvalue) ||
          item.displayName.includes(searchvalue) ||
          item.id?.toString().includes(searchvalue)) &&
        currentUserInformation.uid !== item.uid,
    );

    const filterUsers = users.map((item) => {
      if (userlistadded.find((item1) => item1.uid === item.uid))
        return undefined;
      return item;
    });

    const newUsers = filterUsers.filter(
      (item) => item !== undefined,
    ) as UserInformation[];

    setUserList(newUsers);
  }, [searchvalue, data, userlistadded]);

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
      {userlist.length !== 0 ? (
        userlist.map((item) => {
          const { displayName, id, uid } = item;
          const { color, text, url } = item.photoURL;
          return (
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
              <div className="ml-3">
                <h2>{item.displayName}</h2>
                <h2 className="text-sm">
                  Id:{' '}
                  <span className=" text-gray-800">
                    {item.id ? item.id : "The user doesn't have an ID"}
                  </span>
                </h2>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/30/000000/nothing-found.png"
            alt="nothing-found"
          />
          <h2 className="">No users found</h2>
        </div>
      )}
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
  const uid = handleRandomUid();
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
