import type { AnyAction } from 'redux';
import type { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';

/* ------------- Model interface Create Action ------------- */
interface TripAction extends AnyAction {}

interface IActionTypes extends DefaultActionTypes {
  SET_CURRENT_ID_JOIN_TRIP: 'setCurrentIdJoinTrip';
}

interface IActionCreators extends DefaultActionCreators {
  setCurrentIdJoinTrip: (value: number) => AnyAction;
}

type IActions = TripAction | AnyAction;

export interface TripState {
  currentIdJoinTrip: number;
}

type ImmutableMyType = Immutable.ImmutableObject<TripState>;

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions<IActionTypes, IActionCreators>({
  setCurrentIdJoinTrip: ['trip'],
});

export const TripTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableMyType = Immutable.from({
  currentIdJoinTrip: 0,
});

const setCurrentIdJoinTrip = (
  state: ImmutableMyType,
  { trip }: { trip: number },
) => state.merge({ currentIdJoinTrip: trip });

export const reducer = createReducer<ImmutableMyType, IActions>(INITIAL_STATE, {
  [Types.SET_CURRENT_ID_JOIN_TRIP]: setCurrentIdJoinTrip,
});
