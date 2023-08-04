import { useSelector } from 'react-redux';

import type { UserInformation } from '@/constants/select-options';
import { selector } from '@/redux';

export const isCheckRender = (
  id: number,
  name: string,
  gmail: string,
  value: string,
  data: UserInformation[],
) => {
  const { currentUserInformation } = useSelector(selector.user);

  if (
    id !== currentUserInformation.id &&
    name !== currentUserInformation.name &&
    gmail !== currentUserInformation.gmail
  ) {
    const isCheck =
      id.toString().includes(value) ||
      name.includes(value) ||
      gmail.includes(value);
    if (data.length > 0) {
      if (
        data.find((item) => item.name.includes(value)) ||
        data.find((item) => item.id.toString().includes(value)) ||
        data.find((item) =>
          item.gmail ? item.gmail.includes(value) : undefined,
        )
      ) {
        if (isCheck) {
          return false;
        }
        return true;
      }
      return false;
    }
    if (isCheck) {
      return true;
    }
    return false;
  }
  return false;
};

export const RemoveUserInUserListAdded = (
  data: UserInformation[],
  id: number,
) => {
  return data.filter((item) => item.id !== id);
};
