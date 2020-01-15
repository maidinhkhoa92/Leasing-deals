import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from 'state/reducers';
import sagas from 'state/sagas';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

const Store = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Store;
