import { createAction } from 'redux-actions'

export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export const requestUser = createAction(REQUEST_USER)

export const receiveUser = createAction(RECEIVE_USER)
