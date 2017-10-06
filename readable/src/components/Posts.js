import React from 'react'

export const Posts = ( { posts }) =>
<div className="desc">
  <span className="type">
  <i className="fa fa-plus-square-o"/><br/> {posts[posts.length - 1].voteScore}<br/> <i
className="fa fa-minus-square-o"/>
  </span>

  <h1>{ posts && posts[posts.length - 1].title}</h1>
<p>{posts[posts.length - 1].body}
</p>
</div>