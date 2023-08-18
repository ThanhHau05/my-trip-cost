import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

import type {
  SelectOptionsTrip,
  UserInformation,
} from '@/constants/select-options';

/* ------------- Model interface Create Action ------------- */
interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_USER_INFORMATION: 'setCurrentUserInformation';
  SET_CURRENT_TRIP_HISTORY: 'setCurrentTripHistory';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentUserInformation: (user: UserInformation) => AnyAction;
  setCurrentTripHistory: (value: SelectOptionsTrip) => AnyAction;
}

type IActions = UserAction | AnyAction;

export interface UserState {
  currentUserInformation: UserInformation;
  currentTripHistory: SelectOptionsTrip[];
}

type ImmutableMyType = Immutable.ImmutableObject<UserState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentUserInformation: ['user'],
  setCurrentTripHistory: ['user'],
});

export const UserTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentUserInformation: <UserInformation>{},
  currentTripHistory: <SelectOptionsTrip[]>[],
});

const setCurrentUserInformation = (
  state: ImmutableMyType,
  { user }: { user: UserInformation },
) => state.merge({ currentUserInformation: user });

const setCurrentTripHistory = (
  state: ImmutableMyType,
  { user }: { user: SelectOptionsTrip },
) => state.update('currentTripHistory', (history) => history.concat([user]));

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_USER_INFORMATION]: setCurrentUserInformation,
  [Types.SET_CURRENT_TRIP_HISTORY]: setCurrentTripHistory,
});
