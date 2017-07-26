import { take, put, call, fork, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import {
  GIT_SEARCH,
  INVALIDATE_SEARCH,
  requestUsers,
  receiveUsers
} from '../../modules/home/actions'
import {
  REQUEST_USER,
  receiveUser,
  receiveUserRepos
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

export function fetchGitUserReposAPI(userName, pageNumber) {
  return fetch(`https://api.github.com/users/${userName}/repos?page=${pageNumber}&client_id=95409d3057ce31ae8f12&client_secret=f9b2e2ee33f4103e2c1317fc8f7b80eca46ea085` )
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

export function* fetchUserRepos(userName, pageNumber) {
  const repos = yield call(fetchGitUserReposAPI, userName, pageNumber)
  yield put(receiveUserRepos(repos))
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
    const { payload: { userName, pageNumber } } = yield take(REQUEST_USER)
    yield fork(fetchUser, userName)
    yield fork(fetchUserRepos, userName, pageNumber)
  }
}

export default function* rootSaga() {
  yield fork(nextSearch)
  yield fork(invalidSearch)
  yield fork(nextUser)
}
