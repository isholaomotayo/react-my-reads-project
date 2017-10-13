//export const ADD_POST='ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const getCategories = (categories) =>
  ({type: GET_CATEGORIES, categories})

export const getPosts = (posts) =>
  ({type: GET_POSTS, posts})

export const getPost = (post) => (
  {type: GET_POST, post})

export const addPost = (post) =>
  ( {type: ADD_POST, post})

export const editPost = (post) =>
  ( {type: EDIT_POST, post})

export const votePost = (post) =>
  ( {type: VOTE_POST, post})

export const deletePost = (post) =>
  ( {type: DELETE_POST, post})


export const getAllComments = (comments) =>
  ({type: GET_ALL_COMMENTS, comments})

export const getComments = (comments) =>
  ({type: GET_COMMENTS, comments})

export const addComment = (comments) =>
  ( {type: ADD_COMMENT, comments})

export const editComment = (comments) =>
  ( {type: EDIT_COMMENT, comments})

export const deleteComment = (comments) =>
  ( {type: DELETE_COMMENT, comments})

export const voteComment = (comments) =>
  ( {type: VOTE_COMMENT, comments})



