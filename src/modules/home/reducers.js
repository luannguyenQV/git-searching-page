
import { handleActions } from 'redux-actions'
import {
  requestPosts,
  receivePosts,
  selectReddit,
  gitSearch,
  invalidateReddit
} from './actions'

// export const selectedRedditSelector = state => state['home'].selectedReddit
// export const postsByRedditSelector = state => state['home'].posts
export const selectedSearchValue = state => state['home'].searchValue
export const usersSearchResult = state => state['home'].users

const defaultState = {
  searchValue: '',
  users: [],
  isFetching: false,
  didInvalidate: false
}

const handlers = {
  [requestPosts]: (state, action) => ({...state,
    ...{ isFetching: true }
  }),
  [receivePosts]: (state, action) => {
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
    ...{ searchValue: action.payload }
  }),
  [invalidateReddit]: (state, action) => ({...state,
    ...{}
  })
}

export default handleActions(handlers, defaultState)