// import { BiLogOut } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import type { IconType } from 'react-icons/lib';
import { LuHistory } from 'react-icons/lu';

export interface SelectOptionsPeopleInVerticalMenu {
  name: string;
  img: {
    url: string;
    color: string;
    text: string;
  };
  money: number;
  uid: string;
}

export interface SelectOptionsInvoice {
  payerName: string;
  payerImage: {
    url: string;
    color: string;
    text: string;
  };
  actiity: string;
  qty: number;
  description: string;
  money: number;
  moneySuggest: number;
  time: string;
  uid: string;
}

export interface SelectOptionsTrip {
  tripname: string;
  id: number;
  userlist: UserInformation[];
  tripmaster?: string;
  status: boolean;
  invoice?: SelectOptionsInvoice[];
}

export interface SelectOptionsInvitation {
  tripid: number;
  tripname: string;
  name: string;
  dateandtime: string;
  status: boolean;
  uid: string;
}

export interface SelectOptionsRenderDropDown {
  title: string;
  image?: {
    url?: string;
    color?: string;
    text?: string;
  };
  value: string;
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
  uid: string;
  status: boolean;
}

export interface SelectOptionsObject {
  title: string;
  icon?: IconType;
  value: string | number;
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

export const ACTIVITES: SelectOptionsRenderDropDown[] = [
  {
    title: 'Shopping',
    value: 'shopping',
  },
  {
    title: 'Eating and Drinking',
    value: 'eating and drinking',
  },
  {
    title: 'Refuel',
    value: 'refuel',
  },
  {
    title: 'Entertainment',
    value: 'entertainment',
  },
  {
    title: 'Others',
    value: 'others',
  },
];

export const PRICEOPTIONS: SelectOptionsObject[] = [
  { title: '10.000 VND', value: 10000 },
  { title: '20.000 VND', value: 20000 },
  { title: '40.000 VND', value: 40000 },
  { title: '50.000 VND', value: 50000 },
  { title: '100.000 VND', value: 100000 },
  { title: '200.000 VND', value: 200000 },
  { title: '500.000 VND', value: 500000 },
];
