import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

import type { SelectOptionsTrip } from '@/constants/select-options';

/* ------------- Model interface Create Action ------------- */
interface TripAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_TRIP: 'setCurrentTrip';
  SET_CURRENT_ID_JOIN_TRIP: 'setCurrentIdJoinTrip';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentTrip: (trip: SelectOptionsTrip) => AnyAction;
  setCurrentIdJoinTrip: (value: number) => AnyAction;
}

type IActions = TripAction | AnyAction;

export interface TripState {
  currentTrip: SelectOptionsTrip;
  currentIdJoinTrip: number;
}

type ImmutableMyType = Immutable.ImmutableObject<TripState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentTrip: ['trip'],
  setCurrentIdJoinTrip: ['trip'],
});

export const TripTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentTrip: <SelectOptionsTrip>{},
  currentIdJoinTrip: 0,
});

const setCurrentTrip = (
  state: ImmutableMyType,
  { trip }: { trip: SelectOptionsTrip },
) => state.merge({ currentTrip: trip });
const setCurrentIdJoinTrip = (
  state: ImmutableMyType,
  { trip }: { trip: number },
) => state.merge({ currentIdJoinTrip: trip });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_TRIP]: setCurrentTrip,
  [Types.SET_CURRENT_ID_JOIN_TRIP]: setCurrentIdJoinTrip,
});
