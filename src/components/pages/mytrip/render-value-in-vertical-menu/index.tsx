import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AmountOfMoneyOfUser } from '@/components/base';
import type {
  SelectOptionsPeopleInVerticalMenu,
  UserInformation,
  VerticalMenuUserInfo,
} from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

export const RenderValueInVerticalMenu = ({
  userandmoney,
}: {
  userandmoney: VerticalMenuUserInfo[];
}) => {
  const { currentIdJoinTrip } = useSelector(selector.trip);
  const [data, setData] = useState<SelectOptionsPeopleInVerticalMenu[]>([]);

  useEffect(() => {
    const handle = async () => {
      const userlist: UserInformation[] =
        await DataFirebase.useGetUserListInTrip(currentIdJoinTrip);
      const newData = userlist.map((item) => ({
        name: item.displayName,
        img: {
          url: item.photoURL?.url || '',
          color: item.photoURL?.color || '',
          text: item.photoURL?.text || '',
        },
        money: 0,
        uid: item.uid,
      }));
      const updatedArray = newData.map((item1) => {
        const value = userandmoney.find((item2) => item2.uid === item1.uid);
        if (value) {
          const newMoney = item1.money + value.money;
          return { ...item1, money: newMoney };
        }
        return item1;
      });
      setData(updatedArray);
    };
    handle();
  }, [userandmoney]);

  return (
    <div className="dropdown flex h-[calc(100%-160px)] flex-col gap-2 overflow-auto">
      {data.map((item) => (
        <AmountOfMoneyOfUser
          key={item.uid}
          name={item.name}
          url={item.img.url}
          color={item.img.color}
          text={item.img.text}
          money={item.money}
        />
      ))}
    </div>
  );
};
