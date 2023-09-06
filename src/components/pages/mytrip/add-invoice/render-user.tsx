import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Avatar } from '@/components/base';
import type { SelectOptionsRenderDropDown } from '@/constants/select-options';
import { MyTripContext } from '@/context/mytrip-context';
import { selector } from '@/redux';

import { handleGetPayerList, onSubmitRenderUser } from '../handler';

export const RenderUserAddInvoice = () => {
  const { currentIdJoinTrip } = useSelector(selector.trip);

  const [userlist, setUserList] = useState<SelectOptionsRenderDropDown[]>([]);

  const {
    selectedpayerlist,
    onSaveUserInfoToData,
    setUserUidClick,
    useruidclick,
    useruidpayer,
    handleChangeInfoRenderUser,
  } = useContext(MyTripContext);
  useEffect(() => {
    if (userlist.length !== 0) {
      setUserUidClick(userlist[0]?.value || '');
    }
  }, [userlist]);

  useEffect(() => {
    handleGetPayerList({
      id: currentIdJoinTrip,
      setPayerList: setUserList,
    });
  }, [currentIdJoinTrip]);

  return (
    <div>
      <div className="scrollbarstyle w-full overflow-x-auto">
        <div className="flex items-center justify-start gap-2 pb-3 pt-1">
          {userlist.map((item) => {
            if (item.status) {
              return (
                <div
                  key={item.value}
                  className="relative z-20 inline-block cursor-pointer drop-shadow-md"
                >
                  <div
                    onClick={() =>
                      onSubmitRenderUser({
                        value: item.value,
                        onSaveUserInfoToData,
                        selectedpayerlist,
                        setUserUidClick,
                        useruidpayer,
                        handleChangeInfoRenderUser,
                      })
                    }
                    className="flex h-[88px] flex-col items-center justify-between"
                  >
                    <div
                      className={clsx(
                        'relative flex w-14 justify-center rounded-xl',
                        item.value === useruidclick
                          ? ' bg-slate-200 p-1'
                          : 'pt-1',
                        // index === data.length - 1 ? 'pr-1' : null,
                      )}
                    >
                      <Avatar
                        cursorPointer
                        img={{
                          url: item.image?.url,
                          color: item.image?.url ? '' : item.image?.color,
                          text: item.image?.url
                            ? ''
                            : item.title[0]?.toUpperCase(),
                        }}
                      />
                    </div>
                    <span
                      className={clsx(
                        'mt-2 rounded-2xl border px-2 py-0.5 text-xs font-medium',
                        item.value === useruidclick
                          ? 'bg-slate-200'
                          : 'bg-white text-gray-800',
                      )}
                    >
                      {item.title.slice(0, 5)}
                    </span>
                  </div>
                </div>
              );
            }
            return undefined;
          })}
        </div>
      </div>
    </div>
  );
};
