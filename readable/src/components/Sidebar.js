import React from 'react'

export  const Sidebar = ({posts}) =>

  <div className="sidebar">
    <h2>All Posts</h2>
    <ul>
      {
        posts.map((post, i) =>
          <li key={i}><a >
            <h3>{post.title}</h3>
            <span><strong>Author : </strong>{post.author}</span>
          </a>
            <hr/>
          </li>
        )
      }
    </ul>
  </div>


