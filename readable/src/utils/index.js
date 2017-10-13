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

export const addPost = (post) =>
  fetch('http://localhost:3001/posts/', {headers, method:'POST',body:JSON.stringify(post)})
    .then(res => res.json())
    .then(data => data)

export const addComment = (comment) =>
  fetch(`http://localhost:3001/comments/`, {headers, method:'POST',body:JSON.stringify(comment)})
    .then(res => res.json())
    .then(data => data)

export const vote = (vote) =>
    fetch(`http://localhost:3001/posts/${vote.id}`, {headers, method:'POST',body:JSON.stringify(vote.option)})
    .then(res => res.json())
    .then(data => data)


export const voteComment = (vote) =>
  fetch(`http://localhost:3001/comments/${vote.id}`, {headers, method:'POST',body:JSON.stringify(vote.option)})
    .then(res => res.json())
    .then(data => data)

export const deletePost = (postId) =>
  fetch(`http://localhost:3001/posts/${postId}`, {headers, method:'DELETE'})
    .then(res => res.json())
    .then(data => data)

export const deleteComment = ( commentId) =>
  fetch(`http://localhost:3001/comments/${commentId}`, {headers, method:'DELETE'})
    .then(res => res.json())
    .then(data => data)


export const editPost = (post) =>
  fetch(`http://localhost:3001/posts/${post.id}`, {headers, method:'PUT',body:JSON.stringify(post)})
    .then(res => res.json())
    .then(data => data)

export const editComment = ( comment) =>
  fetch(`http://localhost:3001/comments/${comment.id}`, {headers, method:'PUT',body:JSON.stringify(comment)})
    .then(res => res.json())
    .then(data => data)

