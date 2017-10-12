

//export const ADD_POST='ADD_POST'
export const GET_POSTS='GET_POSTS'
export const GET_POST='GET_POST'
export const GET_CATEGORIES='GET_CATEGORIES'
export const GET_COMMENTS='GET_COMMENTS'
export const GET_ALL_COMMENTS='GET_ALL_COMMENTS'

export const getCategories = (categories) => {
    return {
        type: GET_CATEGORIES,
        categories
    }
}


export const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

export const getPost = (post) => {
  return {
    type: GET_POST,
    post
  }
}
export const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export const getAllComments = (comments) => {
  return {
    type: GET_ALL_COMMENTS,
    comments
  }
}

