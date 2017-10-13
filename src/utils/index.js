const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'trix'
})

export const getAllCategories = () =>
  fetch('http://localhost:3001/categories', {headers})
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch('http://localhost:3001/posts', {headers})
    .then(res => res.json())
    .then(data => data)

export const getSinglePost = (postId) =>
  fetch(`http://localhost:3001/posts/${postId}`, {headers})
    .then(res => res.json())
    .then(data => data)

export const getAllComments = (id) =>
  fetch(`http://localhost:3001/posts/${id}/comments`, {headers})
    .then(res => res.json())
    .then(data => data)

export const addAPost = (post) =>
  fetch('http://localhost:3001/posts/', {headers, method: 'POST', body: JSON.stringify(post)})
    .then(res => res.json())
    .then(data => data)

export const addAComment = (comment) =>
  fetch('http://localhost:3001/comments/', {headers, method: 'POST', body: JSON.stringify(comment)})
    .then(res => res.json())
    .then(data => data)

export const vote = (vote) =>
  fetch(`http://localhost:3001/posts/${vote.id}`, {headers, method: 'POST', body: JSON.stringify(vote.option)})
    .then(res => res.json())
    .then(data => data)


export const voteAComment = (vote) =>
  fetch(`http://localhost:3001/comments/${vote.id}`, {headers, method: 'POST', body: JSON.stringify(vote.option)})
    .then(res => res.json())
    .then(data => data)

export const deleteAPost = (postId) =>
  fetch(`http://localhost:3001/posts/${postId}`, {headers, method: 'DELETE'})
    .then(res => res.json())
    .then(data => data)

export const deleteAComment = (commentId) =>
  fetch(`http://localhost:3001/comments/${commentId}`, {headers, method: 'DELETE'})
    .then(res => res.json())
    .then(data => data)


export const editAPost = (post) =>
  fetch(`http://localhost:3001/posts/${post.id}`, {headers, method: 'PUT', body: JSON.stringify(post)})
    .then(res => res.json())
    .then(data => data)

export const editAComment = (comment) =>
  fetch(`http://localhost:3001/comments/${comment.id}`, {headers, method: 'PUT', body: JSON.stringify(comment)})
    .then(res => res.json())
    .then(data => data)

