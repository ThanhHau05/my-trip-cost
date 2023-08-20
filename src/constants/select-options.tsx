// import { BiLogOut } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import type { IconType } from 'react-icons/lib';
import { LuHistory } from 'react-icons/lu';

export interface SelectOptionsUserInvitations {
  temporaryNotice?: SelectOptionsTrip;
  invitation?: SelectOptionsInvitation[];
}

export interface VerticalMenuUserInfo {
  uid: string;
  money: number;
}

export interface SelectOptionsAvatar {
  url: string;
  color: string;
  text: string;
}

export interface SelectOptionsPeopleInVerticalMenu {
  name: string;
  img: SelectOptionsAvatar;
  money: number;
  uid: string;
}

export interface SelectOptionsInvoice {
  id: string;
  payerName: string;
  payerImage: SelectOptionsAvatar;
  activity: string;
  other?: string;
  qty: number;
  money: number;
  moneySuggest: number;
  time: string;
  uid: string;
}

export interface SelectOptionsTrip {
  tripname: string;
  id: number;
  userlist: UserInformation[];
  status: boolean;
  invoice?: SelectOptionsInvoice[];
  reservemoney?: number;
  totalmoney?: number;
  tripmaster: string;
  starttime: string;
  endtime: string;
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
  id?: number;
  photoURL: {
    url?: string;
    color?: string;
    text?: string;
  };
  uid: string;
  status: boolean;
  email?: string;
  totalmoney?: number;
  reload?: boolean;
}

export interface SelectOptionsObject {
  title: string;
  icon?: IconType;
  value: string | number;
}

export const VERTICAL_MENU: SelectOptionsObject[] = [
  {
    title: 'Trip history',
    icon: LuHistory,
    value: 'trip history',
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
