import { handleActions } from 'redux-actions'
import {
  requestUser,
  receiveUser,
  receiveUserRepos,
  didInvalidate,
} from './actions'

const defaultState = {
  isFetching: false,
  didInvalidate: false
}

const handlers = {
  [requestUser]: (state, action) => ({...state,
    ...{ isFetching: true }
  }),
  [receiveUser]: (state, action) => ({...state,
      ...{ 
        user: action.payload,
        isFetching: false 
      }
  }),
  [receiveUserRepos]: (state, action) => ({...state,
      ...{ 
        reposes: action.payload,
        isFetching: false
      }
  }),
  [didInvalidate]: (state, action) => ({...state,
      ...{ 
        didInvalidate: true
      }
  })
}

export default handleActions(handlers, defaultState)
