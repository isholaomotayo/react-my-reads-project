import {combineReducers} from 'redux'

import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_COMMENTS,
  //ADD_POSTS
} from '../actions'


const categories = (state = {categories: [{"name":null, "path":null}]}, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default :
      return state
  }
}


const posts = (state = {
  posts: [{
    "id": null,
    "timestamp": null,
    "title": null,
    "body": null,
    "author": null,
    "category": null,
    "voteScore": null,
    "deleted": false
  },]
}, action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.posts
    default :
      return state
  }
}

const comments = (state = {
  comments: [{
    "id": null,
    "parentId": null,
    "timestamp": null,
    "title": null,
    "body": null,
    "author": null,
    "voteScore": null,
    "deleted": false,
    "parentDeleted": false
  },]
}, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {comments: action.comments}
    default :
      return state
  }
}


export default combineReducers({
  categories,
  posts,
  comments
})