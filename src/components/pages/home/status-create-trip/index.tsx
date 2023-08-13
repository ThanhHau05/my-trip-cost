import clsx from 'clsx';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Button, Input } from '@/components/base';
import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { DataFirebase, db } from '@/firebase';
import { useFormatCurrentcy, useGetTimeAndDate } from '@/hooks';
import { selector, TripActions } from '@/redux';

export const StatusCreateTrip = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);
  const router = useRouter();

  const { setConentConfirm } = useContext(MainContext);

  const [data, setData] = useState<SelectOptionsTrip>();
  const [userlist, setUserList] = useState<UserInformation[]>([]);
  const [disabledstarttrip, setDisabledStartTrip] = useState(true);
  const [reservemoney, setReserveMoney] = useState({ value: '', error: '' });

  const dispatch = useDispatch();

  const valueMoney = useMemo(() => {
    return useFormatCurrentcy(+reservemoney.value);
  }, [reservemoney.value]);

  useEffect(() => {
    const handle = async (id: number) => {
      const datas = await DataFirebase.useGetTrip(id);
      setData(datas);
    };
    if (currentIdJoinTrip) {
      handle(currentIdJoinTrip);
    }
  }, [currentIdJoinTrip]);

  useEffect(() => {
    const handleInvitation = (id: number) => {
      if (id) {
        const docRef = doc(db, 'Trips', id.toString());
        onSnapshot(docRef, async (datas) => {
          if (datas.exists()) {
            const userlists: UserInformation[] =
              await DataFirebase.useGetUserListInTrip(currentIdJoinTrip);
            const status = userlists.find((item) => item.status === false);
            if (status === undefined) {
              setDisabledStartTrip(false);
            }
          }
        });
      }
    };

    handleInvitation(currentIdJoinTrip);
  }, [currentIdJoinTrip]);

  useEffect(() => {
    const handle = async (id: number) => {
      const docRef = doc(db, 'Trips', id.toString());
      const unOnSnapshot = onSnapshot(docRef, (datas) => {
        if (datas.exists()) {
          const tripValue: SelectOptionsTrip = datas.data().trip;
          if (tripValue.status) {
            router.push(`mytrip/${currentIdJoinTrip}`);
          } else {
            const checkData = tripValue.userlist.find(
              (item) => item.uid === currentUserInformation.uid,
            );
            if (checkData === undefined) {
              dispatch(TripActions.setCurrentIdJoinTrip(0));
            }
          }
        }
      });
      return () => unOnSnapshot();
    };

    handle(currentIdJoinTrip);
  }, [currentIdJoinTrip]);

  const onStartTrip = async () => {
    if (+reservemoney.value < 50000) {
      setReserveMoney({
        ...reservemoney,
        error: 'Minimum reserve amount 100.000 VND',
      });
    } else {
      const userlists: UserInformation[] =
        await DataFirebase.useGetUserListInTrip(currentIdJoinTrip);
      const status = userlists.find((item) => item.status === false);
      if (status === undefined) {
        const trip = await DataFirebase.useGetTrip(currentIdJoinTrip);
        const docRef = doc(db, 'Trips', currentIdJoinTrip.toString());
        if (trip) {
          const valueStartTime = useGetTimeAndDate();
          await setDoc(docRef, {
            trip: {
              ...trip,
              status: true,
              reservemoney: +reservemoney.value,
              starttime: valueStartTime,
            },
          });
        }
      }
    }
  };

  const onChangeReserveMoney = (e: string) => {
    if (+e >= 0) {
      if (+e < 50000 && +e > 0) {
        setReserveMoney({
          value: e,
          error: 'Minimum reserve amount 100.000 VND',
        });
      } else {
        setReserveMoney({ value: e, error: '' });
      }
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col justify-between rounded-t-[40px] bg-white px-5 pt-5">
      <div className="border_welcome_bottom_status_trip absolute bottom-14 left-0 h-56 w-40 bg-teal-500" />
      <div className="border_welcome_top absolute right-0 top-10 h-56 w-40 bg-teal-500" />
      <div>
        <h2 className="text-lg font-medium drop-shadow-md">
          Trip name:{' '}
          <span className="text-2xl font-bold">{data?.tripname}</span>
        </h2>
        <div className="mt-3 h-32">
          <h2>Reserve money (optional)</h2>
          <Input
            error={reservemoney.error}
            value={reservemoney.value}
            onChangeText={(e) => onChangeReserveMoney(e)}
          />
          <h2 className="ml-2 mt-2 font-medium text-gray-700">
            {valueMoney} VNĐ
          </h2>
        </div>
        <div className="mt-6">
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
          <div className="dropdown h-60 overflow-auto">
            <div className="grid grid-cols-5 gap-2 pt-6">
              {!userlist ? (
                <span className="h-12 w-12 rounded-full bg-slate-300 drop-shadow-md" />
              ) : (
                <RenderUser setUserList={setUserList} userlist={userlist} />
              )}
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-white drop-shadow-md">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-9 flex h-12 w-full items-center justify-center gap-3">
          <Button
            title="Start trip"
            onClick={onStartTrip}
            disabled={disabledstarttrip}
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
                  text: item.photoURL.url ? '' : item.displayName[0],
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
