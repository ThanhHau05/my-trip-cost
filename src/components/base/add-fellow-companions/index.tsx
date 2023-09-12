import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';

import {
  handleDataFirebaseRenderUser,
  RenderSearchUserList,
  RenderUserByName,
  RenderUserListAdded,
} from '@/components/pages';
import type { UserInformation } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';
import { DataFirebase } from '@/firebase';
import { useDebounce } from '@/hooks';
import { selector } from '@/redux';

import { Button } from '../button';
import { Input } from '../input';
import { handleFindFellowCompanions } from './handle';

export const AddFellowCompanions = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const { currentUserInformation } = useSelector(selector.user);
  const { setShowAddFellowCompanions, valueaddfellow, setValueAddFellow } =
    useContext(MainContext);

  const [userlistindata, setUserListInData] = useState<UserInformation[]>([]);
  const [userlistintrip, setUserListInTrip] = useState<UserInformation[]>([]);
  const [resultfinduser, setResultFindUser] = useState<UserInformation[]>([]);
  const [userlistadded, setUserListAdded] = useState<UserInformation[]>([]);
  const [loading, setLoading] = useState(false);

  const valueFind = useDebounce(valueaddfellow, 500);

  useEffect(() => {
    const handle = async () => {
      const data = await DataFirebase.GetUserList();
      setUserListInData(data);
    };
    handle();
  }, []);

  useEffect(() => {
    handleDataFirebaseRenderUser(currentIdJoinTrip, setUserListInTrip);
  }, [currentIdJoinTrip]);

  useEffect(() => {
    if (valueFind) {
      const result = handleFindFellowCompanions(
        valueFind,
        userlistintrip,
        userlistindata,
      );
      const newResult = result
        .map((user) => {
          const value = userlistadded.find((item) => {
            if (item.uid) {
              return item.uid === user.uid;
            }
            return item.displayName === user.displayName;
          });
          if (userlistadded.length !== 0 && value) return undefined;
          return user;
        })
        .filter((item) => item !== undefined) as UserInformation[];
      setResultFindUser(newResult);
    } else {
      setResultFindUser([]);
    }
  }, [userlistintrip, valueFind, userlistindata, userlistadded]);

  useEffect(() => {
    if (valueFind !== valueaddfellow) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [valueFind, valueaddfellow]);

  return (
    <div className="fixed z-30 flex h-full w-full items-center justify-center bg-gray-600/40">
      <div className="rounded-3xl bg-slate-100 p-5 drop-shadow-md">
        <GrClose
          onClick={() => setShowAddFellowCompanions(false)}
          className="mb-2 ml-auto mr-0 cursor-pointer"
        />
        <h2 className="font-medium">Add Fellow Companions</h2>
        <div className="mt-3 sm:w-[300px]">
          <Input
            onChangeText={(e) => setValueAddFellow(e)}
            value={valueaddfellow}
          />
        </div>
        {loading ? (
          <div className="mt-3 flex w-full items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-x-blue-700 border-y-transparent" />
          </div>
        ) : (
          <div>
            {valueFind.length >= 3 ? (
              <div className="mt-3">
                <RenderUserByName
                  data={userlistadded}
                  name={valueFind}
                  setInputValue={(value) => setValueAddFellow(value)}
                  setUserListAdded={setUserListAdded}
                />
              </div>
            ) : null}
            <div className="scrollbarstyle pyt-2 max-h-60 overflow-auto">
              {resultfinduser.length !== 0 ? (
                <RenderSearchUserList
                  data={resultfinduser}
                  setInputValue={(value) => setValueAddFellow(value)}
                  setUserListAdded={setUserListAdded}
                  userlistadded={userlistadded}
                  valueSearch={valueFind}
                />
              ) : (
                valueFind && (
                  <div className="mt-2 flex flex-col items-center justify-center">
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/ios-glyphs/30/000000/nothing-found.png"
                      alt="nothing-found"
                    />
                    <h2 className="">No users found</h2>
                  </div>
                )
              )}
              {userlistadded.length !== 0 ? (
                <div className="mt-4">
                  <h2>Person has been added:</h2>
                  <RenderUserListAdded
                    data={userlistadded}
                    setUserListAdded={setUserListAdded}
                  />
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div className="mt-5 flex items-center justify-center gap-2">
          <Button
            title="Add"
            height={2.5}
            onClick={() => {
              DataFirebase.AddUserInTheTrip(
                currentIdJoinTrip,
                userlistadded,
                currentUserInformation,
              );
              toast.success('Successfully adding new companions!');
              setShowAddFellowCompanions(false);
            }}
          />
          <Button
            title="Cancel"
            height={2.5}
            bgWhite
            onClick={() => setShowAddFellowCompanions(false)}
          />
        </div>
      </div>
    </div>
  );
};
