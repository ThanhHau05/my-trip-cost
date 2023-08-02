import { BiLogOut } from 'react-icons/bi';
import type { IconType } from 'react-icons/lib';
import { LuHistory } from 'react-icons/lu';

export interface SelectOptionsRenderDropDown {
  title: string;
  image?: string;
}

export interface InformationUser {
  name: string;
  image: {
    url?: string;
    color?: string;
    text?: string;
  };
  gmail?: string;
  ID: number;
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
