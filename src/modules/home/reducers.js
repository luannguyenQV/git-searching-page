
import { handleActions } from 'redux-actions'
import {
  requestUsers,
  receiveUsers,
  gitSearch,
  invalidateSearch
} from './actions'

export const selectedSearchValue = state => state['home'].searchValue
export const usersSearchResult = state => state['home'].users
export const usersSearchPageNumber = state => state['home'].pageNumber

const defaultState = {
  searchValue: '',
  pageNumber: 1,
  users: [],
  isFetching: false,
  didInvalidate: false
}

const handlers = {
  [requestUsers]: (state, action) => ({...state,
    ...{ isFetching: true }
  }),
  [receiveUsers]: (state, action) => {
    const { items, total_count } = action.payload
    return ({...state,
      ...{ 
        users: items.map(item => item), 
        totalCount: total_count,
        isFetching: false 
      }
    })
  },
  [gitSearch]: (state, action) => ({...state,
    ...{ 
      searchValue: action.payload.searchValue,
      pageNumber: action.payload.pageNumber 
    }
  }),
  [invalidateSearch]: (state, action) => ({...state,
    ...{
      didInvalidate: true
    }
  })
}

export default handleActions(handlers, defaultState)