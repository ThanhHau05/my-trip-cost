import clsx from 'clsx';
import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

import { Avatar } from '@/components/base';
import type { UserInformation } from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

import { handleDataFirebaseRenderUser } from './handle-status-create-trip';

export const RenderUser = ({
  userlist,
  setUserList,
  masterUid,
}: {
  userlist: UserInformation[];
  setUserList: (value: UserInformation[]) => void;
  masterUid: string;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);

  useEffect(() => {
    if (currentIdJoinTrip) {
      handleDataFirebaseRenderUser(currentIdJoinTrip, setUserList);
    }
  }, [currentIdJoinTrip]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {userlist &&
        userlist.map((item) => (
          <div
            key={item.uid}
            className="relative z-20 flex flex-col items-center drop-shadow-md"
          >
            <div className="group relative inline-block">
              <Avatar
                img={{
                  url: item.photoURL.url || '',
                  color: item.photoURL.color || '',
                  text: item.displayName[0]?.toUpperCase() || '',
                }}
              />
              <span
                className={clsx(
                  'absolute bottom-px right-[3px] h-2 w-2 rounded-full border border-white drop-shadow-md',
                  item.status ? 'bg-green-500' : 'bg-orange-500',
                )}
              />
              <div
                className={clsx(
                  'invisible absolute bottom-0 flex w-full justify-center transition-all duration-100',
                  masterUid === currentUserInformation.uid &&
                    item.uid !== masterUid
                    ? 'group-hover:visible group-hover:-translate-y-3'
                    : null,
                )}
              >
                <GrClose
                  className="cursor-pointer rounded-full bg-slate-600 p-1 text-lg drop-shadow-md"
                  onClick={() =>
                    DataFirebase.RefuseInvitation(item.uid, currentIdJoinTrip)
                  }
                />
              </div>
            </div>
            <span className=" -top-7 z-10 ml-0 mt-1 rounded-2xl border bg-white px-2 text-xs font-medium">
              {currentUserInformation.displayName !== item.displayName
                ? item.displayName.slice(0, 5)
                : 'You'}
            </span>
          </div>
        ))}
    </>
  );
};
