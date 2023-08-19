import type { UserInformation } from '@/constants/select-options';

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
