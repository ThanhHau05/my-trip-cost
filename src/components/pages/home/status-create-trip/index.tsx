import clsx from 'clsx';
import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

import { Button } from '@/components/base';
import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { DataFirebase, db } from '@/firebase';
import { selector } from '@/redux';

export const StatusCreateTrip = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);

  const { setConentConfirm } = useContext(MainContext);

  const [data, setData] = useState<SelectOptionsTrip>();
  const [masterinfo, setMasterInfo] = useState<UserInformation>();

  useEffect(() => {
    const handle = async (id: number) => {
      const user = await DataFirebase.useGetTripMaster(id);
      const datas = await DataFirebase.useGetTrip(id);
      setMasterInfo(user);
      setData(datas);
    };
    if (currentIdJoinTrip) {
      handle(currentIdJoinTrip);
    }
  }, [currentIdJoinTrip]);

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-t-[40px] bg-white px-5 pt-5">
      <div>
        <h2 className="text-lg font-medium drop-shadow-md">
          Trip name: <span className="text-xl font-bold">{data?.tripname}</span>
        </h2>
        <div className="mt-3">
          <h2 className="text-lg font-medium drop-shadow-md">Trip Master:</h2>
          <div className="mt-2 flex items-center justify-start">
            {masterinfo ? (
              <Avatar
                src={
                  masterinfo?.photoURL.url
                    ? masterinfo?.photoURL.url
                    : masterinfo?.photoURL.text
                }
                size="48"
                value={
                  masterinfo?.photoURL.url ? '' : masterinfo?.displayName[0]
                }
                color={
                  masterinfo?.photoURL.url ? '' : masterinfo?.photoURL.color
                }
                className="rounded-full"
              />
            ) : (
              <span className="h-12 w-12 rounded-full bg-slate-300 drop-shadow-md" />
            )}
            <h2 className="ml-2 text-xl font-medium drop-shadow-md">
              {masterinfo?.displayName}
            </h2>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-medium drop-shadow-md">Participants:</h2>
          <div className="inline-block">
            <div>
              <span className="inline-block h-2 w-2 rounded-full border border-white bg-orange-500 drop-shadow-md" />
              <span className="text-sm"> : Waiting</span>
            </div>
            <div>
              <span className="inline-block h-2 w-2 rounded-full border border-white bg-green-500 drop-shadow-md" />
              <span className="text-sm"> : Ready</span>
            </div>
          </div>
          <div className="dropdown h-72 overflow-auto">
            <div className="grid grid-cols-5 pt-6">
              {!masterinfo ? (
                <span className="h-12 w-12 rounded-full bg-slate-300 drop-shadow-md" />
              ) : (
                <RenderUser masterInfo={masterinfo} />
              )}
              {masterinfo?.uid === currentUserInformation.uid ? (
                <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-white drop-shadow-md">
                  +
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-10 flex h-12 w-full items-center justify-center gap-3">
          <Button
            title="Start trip"
            disabled={masterinfo?.uid !== currentUserInformation.uid}
          />
          <Button
            bgWhite
            title="Cancel trip"
            onClick={() => setConentConfirm('Want to cancel your trip ?')}
          />
        </div>
      </div>
    </div>
  );
};

export const RenderUser = ({ masterInfo }: { masterInfo: UserInformation }) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);
  const [userlist, setUserList] = useState<UserInformation[]>([]);

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
    <div>
      {userlist &&
        userlist.map((item) => (
          <div
            key={item.id}
            className="relative z-20 inline-block drop-shadow-md"
          >
            <div className="group relative inline-block">
              <span className="absolute -top-5 z-10 ml-0 hidden rounded-2xl border bg-white px-2 py-0.5 text-xs font-medium group-hover:block">
                {item.displayName}
              </span>
              <Avatar
                src={item.photoURL.url ? item.photoURL.url : item.photoURL.text}
                size="48"
                value={item.photoURL.url ? '' : item.displayName[0]}
                color={item.photoURL.url ? '' : item.photoURL.color}
                className="rounded-full"
              />
              <span
                className={clsx(
                  'absolute bottom-px right-[3px] h-2 w-2 rounded-full border border-white drop-shadow-md',
                  item.status ? 'bg-green-500' : 'bg-orange-500',
                )}
              />
              {masterInfo.uid === currentUserInformation.uid ? (
                <div className="invisible absolute bottom-0 flex w-full justify-center transition-all duration-100 group-hover:visible group-hover:-translate-y-3">
                  <GrClose
                    className="cursor-pointer rounded-full bg-slate-600 p-1 text-lg drop-shadow-md"
                    onClick={() =>
                      DataFirebase.useDeleteUserInTrip(
                        item.uid,
                        currentIdJoinTrip,
                      )
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
};
