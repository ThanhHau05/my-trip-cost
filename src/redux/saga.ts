import { all } from 'redux-saga/effects';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // user
    // takeLatest(UserTypes.GET_USER_INFO, getUserInfo),
  ]);
}
