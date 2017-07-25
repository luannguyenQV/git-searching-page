import { createAction } from 'redux-actions'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_USER_REPOS = 'RECEIVE_USER_REPOS'
export const DID_INVALIDATE = 'DID_INVALIDATE'

export const requestUser = createAction(REQUEST_USER)

export const receiveUser = createAction(RECEIVE_USER)

export const receiveUserRepos = createAction(RECEIVE_USER_REPOS)

export const didInvalidate = createAction(DID_INVALIDATE)
