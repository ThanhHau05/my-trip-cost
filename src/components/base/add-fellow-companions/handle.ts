import type { UserInformation } from '@/constants/select-options';

export const handleFindFellowCompanions = (
  value: string,
  userListInTrip: UserInformation[],
  userListInData: UserInformation[],
) => {
  const filterUser = userListInData.filter(
    (user) =>
      user.displayName.includes(value) || user.id?.toString().includes(value),
  );
  return filterUser
    .map((user) => {
      if (
        userListInTrip.find(
          (item) =>
            item.displayName.includes(user.displayName) ||
            (user.id && item.id?.toString().includes(user.id.toString())),
        )
      ) {
        return undefined;
      }
      return user;
    })
    .filter((item) => item !== undefined) as UserInformation[];
};
