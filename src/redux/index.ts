import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import immutablePersistenceTransform from './immutable-persistence-transfrom';
import Saga from './saga';
import type { UserState } from './User/UserRedux';
import UserActions, { reducer as UserReducer } from './User/UserRedux';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  user: UserReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms: [immutablePersistenceTransform],
};

const Redux = () => {
  const finalReducers = persistReducer(persistConfig, reducers);

  const store = createStore(finalReducers, Saga);

  const persistor = persistStore(store);

  return { store, persistor };
};

export default Redux;

const createStore = (rootReducer: any, rootSaga: any) => {
  const middleware = [];
  // middleware.push(logger)

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  const store = configureStore({
    reducer: rootReducer,
    middleware,
  });
  sagaMiddleware.run(rootSaga);

  return store;
};

export type RootState = ReturnType<typeof reducers>;
export const selector = {
  user: (state: RootState) => state.user as unknown as UserState,
};
export { UserActions };
