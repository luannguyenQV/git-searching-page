import { take, put, call, fork, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import {
  REQUEST_USERS,
  GIT_SEARCH,
  INVALIDATE_SEARCH,
  requestUsers,
  receiveUsers,
  selectReddit,
  invalidateReddit
} from '../../modules/home/actions'
import {
  REQUEST_USER,
  RECEIVE_USER,
  requestUser,
  receiveUser
} from '../../modules/user/actions'
import { 
  selectedSearchValue, 
  usersSearchResult,
  usersSearchPageNumber
} from '../../modules/home/reducers'

export function fetchGitSearchAPI(searchValue, page) {
  return fetch(`https://api.github.com/search/users?q=${searchValue}&page=${page}&client_id=95409d3057ce31ae8f12&client_secret=f9b2e2ee33f4103e2c1317fc8f7b80eca46ea085` )
          .then(response => response.json())
}

export function fetchGitUserAPI(userName) {
  return fetch(`https://api.github.com/users/${userName}?client_id=95409d3057ce31ae8f12&client_secret=f9b2e2ee33f4103e2c1317fc8f7b80eca46ea085` )
          .then(response => response.json())
}

export function* fetchGitSearch(searchValue, page) {
  yield put(requestUsers(searchValue))
  const users = yield call(fetchGitSearchAPI, searchValue, page)
  yield put(receiveUsers(users))
}

export function* fetchUser(userName) {
  const userInfo = yield call(fetchGitUserAPI, userName)
  yield put(receiveUser(userInfo))
}

export function* invalidSearch() {
  while (true) {
    const { search } = yield take(INVALIDATE_SEARCH)
    yield call( fetchGitSearchAPI, search )
  }
}

export function* nextSearch() {
  while(true) {
    const prevSearch = yield select(selectedSearchValue)
    const prevPage = yield select(usersSearchPageNumber)
    yield take(GIT_SEARCH)
    const users = yield select(usersSearchResult)
    const newSearch = yield select(selectedSearchValue)
    const newPage = yield select(usersSearchPageNumber)
    if((prevSearch !== newSearch && !users[newSearch]) || (prevPage !== newPage))
      yield fork(fetchGitSearch, newSearch, newPage)
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
  yield fork(invalidSearch)
  yield fork(nextUser)
}
