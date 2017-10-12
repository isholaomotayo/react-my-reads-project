import {combineReducers} from 'redux'

import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_COMMENTS,
  GET_ALL_COMMENTS,
  GET_POST
  //ADD_POSTS
} from '../actions'


const categories = (state = [{"name":null, "path":null}], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories.categories
    default :
      return state
  }
}


const posts = (state =  [{
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
    default :
      return state
  }
}


const comments = (state =  [], action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments
    case GET_ALL_COMMENTS:
      return [...action.comments,...state]
    default :
      return state
  }
}


export default combineReducers({
  categories,
  posts,
  comments
})