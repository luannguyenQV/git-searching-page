
import { handleActions } from 'redux-actions'
import {
  requestUser,
  receiveUser
} from './actions'

const defaultState = {
  isFetching: false
}

const handlers = {
  [requestUser]: (state, action) => ({...state,
    ...{ isFetching: true }
  }),
  [receiveUser]: (state, action) => {
    return ({...state,
      ...{ 
        user: action.payload,
        isFetching: false 
      }
    })
  }
}

export default handleActions(handlers, defaultState)
