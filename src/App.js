import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { NavLink } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Home from './modules/home/containers/Home'
import User from './modules/user/containers/User'
import homeReducer from './modules/home/reducers'
import userReducer from './modules/user/reducers'
import rootSaga from './common/sagas';

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const historyMiddleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    home: homeReducer,
    user: userReducer
  }),
  applyMiddleware(
    sagaMiddleware,
    historyMiddleware
  )
)
sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/" component={Home}/>
              <Route exact path="/user/:name" component={User}/>
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App