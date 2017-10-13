import {combineReducers} from 'redux'

import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_COMMENTS,
  GET_ALL_COMMENTS,
  GET_POST,
  ADD_POST,
  ADD_COMMENT,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
  // VOTE_COMMENT
} from '../actions'


const categories = (state = [{"name": null, "path": null}], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories.categories
    default :
      return state
  }
}


const posts = (state = [{
                 "id": null,
                 "timestamp": null,
                 "title": null,
                 "body": null,
                 "author": null,
                 "category": null,
                 "voteScore": null,
                 "deleted": false
               },]
  , action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.posts.posts
    case GET_POST:
      return [action.post]
    case ADD_POST:
      return [...state, action.post]
    case EDIT_POST:
      return [...state.filter(post => post.id !== action.post.id), action.post]
    case DELETE_POST:
      return [...state.filter(post => post.id !== action.post.id)]
    case VOTE_POST:
      return [...state, action.post]
    default :
      return state
  }
}


const comments = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments
    case GET_ALL_COMMENTS:
      return [...action.comments, ...state]
    case ADD_COMMENT:
      return [...state, action.comments]
    case EDIT_COMMENT:
      return [...state.filter(comments => comments.id !== action.comments.id), action.comments]
    case DELETE_COMMENT:
      return [...state.filter(comments => comments.id !== action.comments.id)]
    default :
      return state
  }
}


export default combineReducers({
  categories,
  posts,
  comments
})