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
  SET_CURRENT_TRIP_STATUS: 'setCurrentTripStatus';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentTrip: (trip: SelectOptionsTrip) => AnyAction;
  setCurrentIdJoinTrip: (value: number) => AnyAction;
  setCurrentTripStatus: (status: boolean) => AnyAction;
}

type IActions = TripAction | AnyAction;

export interface TripState {
  currentTrip: SelectOptionsTrip;
  currentIdJoinTrip: number;
  currentTripStatus: boolean;
}

type ImmutableMyType = Immutable.ImmutableObject<TripState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentTrip: ['trip'],
  setCurrentIdJoinTrip: ['trip'],
  setCurrentTripStatus: ['trip'],
});

export const TripTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentTrip: <SelectOptionsTrip>{},
  currentIdJoinTrip: 0,
  currentTripStatus: false,
});

const setCurrentTrip = (
  state: ImmutableMyType,
  { trip }: { trip: SelectOptionsTrip },
) => state.merge({ currentTrip: trip });
const setCurrentIdJoinTrip = (
  state: ImmutableMyType,
  { trip }: { trip: number },
) => state.merge({ currentIdJoinTrip: trip });
const setCurrentTripStatus = (
  state: ImmutableMyType,
  { trip }: { trip: boolean },
) => state.merge({ currentTripStatus: trip });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_TRIP]: setCurrentTrip,
  [Types.SET_CURRENT_ID_JOIN_TRIP]: setCurrentIdJoinTrip,
  [Types.SET_CURRENT_TRIP_STATUS]: setCurrentTripStatus,
});
