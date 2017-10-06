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
export const getAllComments = (id) =>
  fetch(`http://localhost:3001/posts/${id}/comments`, {headers})
    .then(res => res.json())
    .then(data => data)



