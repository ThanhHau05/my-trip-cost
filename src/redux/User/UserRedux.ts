import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

import type { UserInformation } from '@/constants/select-options';

/* ------------- Model interface Create Action ------------- */
interface UserAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_USER_INFORMATION: 'setCurrentUserInformation';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentUserInformation: (user: UserInformation) => AnyAction;
}

type IActions = UserAction | AnyAction;

export interface UserState {
  currentUserInformation: UserInformation;
}

type ImmutableMyType = Immutable.ImmutableObject<UserState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentUserInformation: ['user'],
});

export const UserTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentUserInformation: <UserInformation>{},
});

const setCurrentUserInformation = (
  state: ImmutableMyType,
  { user }: { user: UserInformation },
) => state.merge({ currentUserInformation: user });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_USER_INFORMATION]: setCurrentUserInformation,
});
