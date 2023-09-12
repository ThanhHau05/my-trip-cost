// import { BiLogOut } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import { IoNotifications, IoNotificationsOutline } from 'react-icons/io5';
import type { IconType } from 'react-icons/lib';
import { LuHistory } from 'react-icons/lu';
import { RiHome3Fill, RiHome3Line } from 'react-icons/ri';

export interface SelectOptionsUserInvitations {
  temporaryNotice?: SelectOptionsTrip;
  invitation?: SelectOptionsInvitation[];
  tripHistory?: SelectOptionsTrip[];
  recentFriends?: UserInformation[];
  recentTrip?: SelectOptionsTrip;
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
  id: number;
  status: boolean;
}

export interface SelectOptionsPayees {
  activity: string;
  other?: string;
  qty: number;
  money: number;
  moneySuggest: number;
  uid: string;
}

interface OptionInvoice {
  id: string;
  payerName: string;
  payerImage: SelectOptionsAvatar;
  time: string;
  uid: string;
  totalMoney: number;
}

export interface SelectOptionsInvoice {
  invoice?: {
    info: OptionInvoice;
    listPayees: SelectOptionsPayees[];
  };
  leaveTheTrip?: {
    info: OptionInvoice;
  };
  addUser?: {
    id: string;
    name: string;
    time: string;
    personAdded: {
      avatar: SelectOptionsAvatar;
      uid: string;
    };
    personBeAdded: {
      uid: string;
      avatar: SelectOptionsAvatar;
      name: string;
    }[];
  };
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
  avtmaster: {
    url?: string;
    color?: string;
    text?: string;
  };
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
  status?: boolean;
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
  atIcon?: IconType;
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

export const NAVIGATION_BAR_MENU: SelectOptionsObject[] = [
  {
    title: 'Home',
    icon: RiHome3Line,
    atIcon: RiHome3Fill,
    value: 'home',
  },
  {
    title: 'Invitation',
    icon: IoNotificationsOutline,
    atIcon: IoNotifications,
    value: 'invitation',
  },
  {
    title: 'Space',
    value: 'space',
  },
  {
    title: 'History of trips',
    icon: LuHistory,
    value: 'trip history',
  },
  // {
  //   title: 'Profile',
  //   icon: RiUserLine,
  //   atIcon: RiUserFill,
  //   value: 'profile',
  // },
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
  { title: '10.000', value: 10000 },
  { title: '20.000', value: 20000 },
  { title: '30.000', value: 30000 },
  { title: '40.000', value: 40000 },
  { title: '50.000', value: 50000 },
  { title: '60.000', value: 60000 },
  { title: '100.000', value: 100000 },
  { title: '200.000', value: 200000 },
  { title: '500.000', value: 500000 },
];

export const QTYOPTIONS: SelectOptionsObject[] = [
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 },
  { title: '5', value: 5 },
  { title: '6', value: 6 },
  { title: '7', value: 7 },
  { title: '8', value: 8 },
  { title: '9', value: 9 },
  { title: '10', value: 10 },
];
