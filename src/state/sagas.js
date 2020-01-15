import { all } from 'redux-saga/effects';
import dealsSagas from './deals/sagas'

export default function* rootSaga() {
  yield all([ 
    dealsSagas(),
  ]);
}
