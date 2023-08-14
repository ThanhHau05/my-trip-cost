import clsx from 'clsx';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

import { Avatar } from '@/components/base';
import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase, db } from '@/firebase';
import { selector } from '@/redux';

export const RenderUser = ({
  userlist,
  setUserList,
}: {
  userlist: UserInformation[];
  setUserList: (value: UserInformation[]) => void;
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  useEffect(() => {
    const handle = async (id: number) => {
      const docRef = doc(db, 'Trips', id.toString());
      onSnapshot(docRef, (data) => {
        if (data.exists()) {
          const invitationData: SelectOptionsTrip = data.data().trip;
          setUserList(invitationData.userlist);
        }
      });
    };
    if (currentIdJoinTrip) {
      handle(currentIdJoinTrip);
    }
  }, [currentIdJoinTrip]);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {userlist &&
        userlist.map((item) => (
          <div
            key={item.uid}
            className="relative z-20 inline-block drop-shadow-md"
          >
            <div className="group relative inline-block">
              <span className="absolute -top-5 z-10 ml-0 hidden rounded-2xl border bg-white px-2 py-0.5 text-xs font-medium group-hover:block">
                {item.displayName}
              </span>
              <Avatar
                img={{
                  url: item.photoURL.url
                    ? item.photoURL.url
                    : item.photoURL.text,
                  color: item.photoURL.url ? '' : item.photoURL.color,
                  text: item.photoURL.url
                    ? ''
                    : item.displayName[0]?.toUpperCase(),
                }}
              />
              <span
                className={clsx(
                  'absolute bottom-px right-[3px] h-2 w-2 rounded-full border border-white drop-shadow-md',
                  item.status ? 'bg-green-500' : 'bg-orange-500',
                )}
              />
              <div className="invisible absolute bottom-0 flex w-full justify-center transition-all duration-100 group-hover:visible group-hover:-translate-y-3">
                <GrClose
                  className="cursor-pointer rounded-full bg-slate-600 p-1 text-lg drop-shadow-md"
                  onClick={() =>
                    DataFirebase.useRefuseInvitation(
                      item.uid,
                      currentIdJoinTrip,
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
