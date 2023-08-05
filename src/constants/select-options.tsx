// import { BiLogOut } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import type { IconType } from 'react-icons/lib';
import { LuHistory } from 'react-icons/lu';

// export interface UserInformationOfGoogle {
//   displayName: string;
//   email: string;
//   photoURL: string;
//   uid: string;
// }

export interface SelectOptionsInvitation {
  tripid: number;
  tripname: string;
  name: string;
  time: string;
  date: string;
}

export interface SelectOptionsRenderDropDown {
  title: string;
  image?: string;
}

export interface UserInformation {
  displayName: string;
  id: number;
  photoURL: {
    url?: string;
    color?: string;
    text?: string;
  };
  email: string;
}

export interface SelectOptionsObject {
  title: string;
  icon?: IconType;
  value: string;
}

export const VERTICAL_MENU: SelectOptionsObject[] = [
  {
    title: 'Invoice History',
    icon: LuHistory,
    value: 'invoice history',
  },
  {
    title: 'Sign Out',
    icon: BiLogOut,
    value: 'sign out',
  },
];
