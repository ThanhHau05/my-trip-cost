/* eslint-disable jsx-a11y/alt-text */
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Avatar, Button } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';
import { useDebounce } from '@/hooks';
import { selector } from '@/redux';

import { handleRandomUid } from '../../handler';
import { getRandomColor } from '../../welcome';
import {
  handleRenderUserSearch,
  onSubmit,
  SplitAndBoldName,
} from './handle-create-the-trip';

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
  const [loading, setLoading] = useState(false);

  const valueFind = useDebounce(searchvalue, 500);

  useEffect(() => {
    if (valueFind.length > 1) {
      const newUserList = handleRenderUserSearch(
        valueFind,
        data,
        userlistadded,
        currentUserInformation,
      );
      setUserList(newUserList);
    } else {
      setUserList([]);
    }
  }, [valueFind, data, userlistadded]);

  useEffect(() => {
    if (valueFind !== searchvalue) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [valueFind, searchvalue]);

  return (
    <div className="scroll_invitation absolute z-10 flex max-h-full w-full flex-col gap-2 overflow-auto rounded-xl bg-white p-2 shadow-md">
      {loading ? (
        <div className="mt-3 flex w-full items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-4 border-x-blue-700 border-y-transparent" />
        </div>
      ) : (
        <>
          {valueFind.length >= 3 ? (
            <RenderUserByName
              data={userlistadded}
              name={valueFind}
              setInputValue={(v, e) => setInputValue({ value: v, error: e })}
              setUserListAdded={setUserListAdded}
            />
          ) : null}
          {userlist.length !== 0 ? (
            <RenderSearchUserList
              data={userlist}
              setUserListAdded={setUserListAdded}
              userlistadded={userlistadded}
              setInputValue={(value, error) => setInputValue({ value, error })}
              valueSearch={valueFind}
            />
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
        </>
      )}
    </div>
  );
};

export const RenderSearchUserList = ({
  data,
  setInputValue,
  setUserListAdded,
  userlistadded,
  valueSearch,
}: {
  data: UserInformation[];
  setInputValue: (value: string, error: string) => void;
  setUserListAdded: Dispatch<SetStateAction<UserInformation[]>>;
  userlistadded: UserInformation[];
  valueSearch: string;
}) => {
  return (
    <>
      {data.map((item) => {
        const { displayName, id, uid } = item;
        const { color, text, url } = item.photoURL;
        return (
          <div
            key={id}
            className="flex cursor-pointer items-center justify-start rounded-xl p-2 transition-all hover:bg-slate-50"
            onClick={() => {
              onSubmit(
                uid,
                displayName,
                id || 0,
                color || '',
                text || '',
                url || '',
                setInputValue,
                setUserListAdded,
                userlistadded,
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
              <SplitAndBoldName value={valueSearch} name={displayName} />
              <h2 className="text-sm">
                Id:{' '}
                <span className=" text-gray-800">
                  {id || "The user doesn't have an ID"}
                </span>
              </h2>
            </div>
          </div>
        );
      })}
    </>
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
  setInputValue: (value: string, error: string) => void;
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
    <div className="flex cursor-pointer items-center justify-between gap-2 rounded-xl p-2 transition-all hover:bg-slate-50">
      <div className="flex items-center justify-center">
        <Avatar
          size="40"
          img={{
            color,
            text,
          }}
        />
        <h2 className="ml-3 sm:w-40">{name} (User has no account)</h2>
      </div>
      <div className="h-7 w-16">
        <Button
          bgWhite
          title="Add"
          onClick={() => {
            setInputValue('', '');
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
