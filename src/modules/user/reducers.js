import { handleActions } from 'redux-actions'
import {
  requestUser,
  receiveUser,
  receiveUserRepos,
  didInvalidate,
} from './actions'

const defaultState = {
  pageNumber: 1,
  isFetching: false,
  didInvalidate: false
}

const handlers = {
  [requestUser]: (state, action) => ({...state,
    ...{
      userName: action.payload.userName,
      isFetching: true,
      pageNumber: action.payload.pageNumber
    }
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
