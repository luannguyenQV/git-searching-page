import { take, put, call, fork, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_REDDIT,
  GIT_SEARCH,
  INVALIDATE_REDDIT,
  requestPosts,
  receivePosts,
  selectReddit,
  invalidateReddit
} from '../../modules/home/actions'
import { selectedSearchValue, usersSearchResult } from '../../modules/home/reducers'

export function fetchGitSearchAPI(searchValue) {
  return fetch(`https://api.github.com/search/users?q=${searchValue}` )
          .then(response => response.json())
}

export function* fetchGitSearch(reddit) {
  yield put(requestPosts(reddit))
  const posts = yield call(fetchGitSearchAPI, reddit)
  yield put(receivePosts(posts))
}

export function* invalidReddit() {
  while (true) {
    const { reddit } = yield take(INVALIDATE_REDDIT)
    yield call( fetchGitSearchAPI, reddit )
  }
}

export function* nextSearch() {
  while(true) {
    const prevSearch = yield select(selectedSearchValue)
    yield take(GIT_SEARCH)
    const newSearch = yield select(selectedSearchValue)
    const users = yield select(usersSearchResult)
    if(prevSearch !== newSearch && !users[newSearch])
      yield fork(fetchGitSearch, newSearch)
  }
}

export default function* rootSaga() {
  yield fork(nextSearch)
  yield fork(invalidReddit)
}
