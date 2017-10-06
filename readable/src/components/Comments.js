import React from 'react'

export const Comments = ({comments}) =>
  <div className="comments">
    <i className="fa fa-comments-o"/><span> Comments </span>
    <ul>
      {
        comments.map((comment, i) =>
          <li key={i}>
            {comment.body}<br/>
            <small><strong> By: </strong> {comment.author}</small>
            <hr/>
          </li>)
      }
    </ul>
  </div>