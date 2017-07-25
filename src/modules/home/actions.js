import { createAction } from 'redux-actions'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const GIT_SEARCH = 'GIT_SEARCH'
export const INVALIDATE_SEARCH = 'INVALIDATE_SEARCH'

export const requestUsers = createAction(REQUEST_USERS)

export const receiveUsers = createAction(RECEIVE_USERS)

export const gitSearch = createAction(GIT_SEARCH)

export const invalidateSearch = createAction(INVALIDATE_SEARCH)