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
import {
  REQUEST_USER,
  RECEIVE_USER,
  requestUser,
  receiveUser
} from '../../modules/user/actions'
import { selectedSearchValue, usersSearchResult } from '../../modules/home/reducers'

export function fetchGitSearchAPI(searchValue) {
  return fetch(`https://api.github.com/search/users?q=${searchValue}` )
          .then(response => response.json())
}

export function fetchGitUserAPI(userName) {
  return fetch(`https://api.github.com/users/${userName}?client_id=95409d3057ce31ae8f12&client_secret=f9b2e2ee33f4103e2c1317fc8f7b80eca46ea085` )
          .then(response => response.json())
}

export function* fetchGitSearch(searchValue) {
  yield put(requestPosts(searchValue))
  const posts = yield call(fetchGitSearchAPI, searchValue)
  yield put(receivePosts(posts))
}

export function* fetchUser(userName) {
  console.log('username: ', userName)
  const userInfo = yield call(fetchGitUserAPI, userName)
  console.log('userInfo: ', userInfo)
  yield put(receiveUser(userInfo))
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

export function* nextUser() {
  while(true) {
    const { payload: userName } = yield take(REQUEST_USER)
    yield fork(fetchUser, userName)
  }
}

export default function* rootSaga() {
  yield fork(nextSearch)
  yield fork(invalidReddit)
  yield fork(nextUser)
}
