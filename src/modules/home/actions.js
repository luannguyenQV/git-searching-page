import { createAction } from 'redux-actions'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const GIT_SEARCH = 'GIT_SEARCH'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const requestPosts = createAction(REQUEST_POSTS)

export const receivePosts = createAction(RECEIVE_POSTS)

export const selectReddit = createAction(SELECT_REDDIT)

export const gitSearch = createAction(GIT_SEARCH)

export const invalidateReddit = createAction(INVALIDATE_REDDIT)