import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AmountOfMoneyOfUser } from '@/components/base';
import type {
  SelectOptionsPeopleInVerticalMenu,
  UserInformation,
} from '@/constants/select-options';
import { DataFirebase } from '@/firebase';
import { selector } from '@/redux';

export const RenderValueInVerticalMenu = ({
  money,
  uid,
}: {
  money: number;
  uid: string;
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
          url: item.photoURL.url || '',
          color: item.photoURL.color || '',
          text: item.photoURL.text || '',
        },
        money: 0,
        uid: item.uid,
      }));
      setData(newData);
    };
    handle();
  }, [currentIdJoinTrip]);

  useEffect(() => {
    const handleUpdateMoney = async () => {
      const updatedData = data.map((item) =>
        item.uid === uid ? { ...item, money: item.money + money } : item,
      );

      setData(updatedData);
    };

    if (money !== 0 && uid) {
      handleUpdateMoney();
    }
  }, [money, uid, data]);

  return (
    <div className="dropdown h-[calc(100%-100px)] overflow-auto">
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
