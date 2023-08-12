import { useSelector } from 'react-redux';

import type { UserInformation } from '@/constants/select-options';
import { selector } from '@/redux';

export const RemoveUserInUserListAdded = (
  data: UserInformation[],
  uid: string,
) => {
  return data.filter((item) => item.uid !== uid);
};

export const CheckUserInData = (uid: string, data: UserInformation[]) => {
  const value = data.find((item) => item.uid === uid);
  return !!value;
};

export const isCheckUserMaster = (name: string, id: number, uid: string) => {
  const { currentUserInformation } = useSelector(selector.user);
  if (
    currentUserInformation.displayName !== name &&
    currentUserInformation.id !== id &&
    currentUserInformation.uid !== uid
  )
    return true;
  return false;
};
