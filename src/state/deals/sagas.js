import { Types, Creators } from './reducers';
import { all, fork, takeLatest, put } from 'redux-saga/effects';
import { deals } from 'services';

export function* fetchDealsSaga() {
  yield takeLatest(Types.FETCH, function*({ params }) {
    try {
      const res = yield deals.List(params);
      if (res.status === 200) {
        yield put(Creators.fetchSuccess(res.data.deals))
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchDealsSaga),
  ]);
}
