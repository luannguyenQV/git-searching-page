import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import Home from './modules/home/containers/Home'
import homeReducer from './modules/home/reducers'
import rootSaga from './common/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    home: homeReducer
  }),
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

export default App