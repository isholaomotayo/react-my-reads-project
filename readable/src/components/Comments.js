import React , { Component } from 'react'
import AddComment from './AddComment'

class Comments extends Component {


  state = {
    openComment: false,
  }

  onOpenComment = () => {
        this.setState({openComment: true})
  }
  onCloseComment = () => {
    this.setState({openComment: false})
  }

  render(){
    const {comments, post } = this.props
    return(

      <div className="comments">
        <AddComment close={this.onCloseComment} open={this.state.openComment} post={post} />

        <i className="fa fa-comments-o"/>
        <span>there are {comments.length} comments available</span>
        <br/>
        <button className="button" onClick={this.onOpenComment} type="button"><span>Add comment</span></button>
        <ul>
          {
            comments && comments.map((comment, i) =>

              <li key={i}>
                {comment.body}<br/>
                <small><strong> By: </strong> {comment.author}</small>
                <hr/>
              </li>)
          }
        </ul>
      </div>
    )
  }

}



export { Comments }