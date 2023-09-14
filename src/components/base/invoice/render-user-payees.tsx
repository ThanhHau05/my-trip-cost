/* eslint-disable no-nested-ternary */
import { handleFormatCurrentcy } from '@/components/pages';
import type {
  SelectOptionsPayees,
  UserInformation,
} from '@/constants/select-options';

import { Avatar } from '../avatar';

export const RenderUserPayees = async ({
  data,
  userList,
}: {
  data: SelectOptionsPayees[];
  userList: UserInformation[];
}) => {
  return (
    <div>
      {data.map((item) => {
        const infoUser = userList.find((user) => user.uid === item.uid);
        return (
          <div key={item.uid} className="flex items-center gap-2">
            <div className="w-6">
              <Avatar
                img={{
                  color: infoUser?.photoURL.color,
                  text: infoUser?.photoURL.text,
                  url: infoUser?.photoURL.url,
                }}
                size="24"
              />
            </div>
            <div className="text-sm">
              <span className="block font-medium">
                {item.qty ? (
                  item.activity === 'others' ? (
                    <>
                      {item.activity}:{' '}
                      <span className="font-normal">{item.other}</span> - qty:{' '}
                      {item.qty}
                    </>
                  ) : (
                    `${item.activity} - qty: ${item.qty}`
                  )
                ) : item.activity === 'others' ? (
                  <>
                    {item.activity}:{' '}
                    <span className="font-normal">{item.other}</span> - qty:{' '}
                    {item.qty}
                  </>
                ) : (
                  `${item.activity}`
                )}
              </span>
              <span>
                Money:{' '}
                <span className="font-medium">
                  {handleFormatCurrentcy(item.money || item.moneySuggest)} VND
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
