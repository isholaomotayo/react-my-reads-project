import React, {Component} from 'react'
import AddComment from './AddComment'
import {voteAComment, deleteAComment,} from "../utils/index"
import {deleteComment, editComment} from "../actions/index"
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import sortBy from 'sort-by'

class Comments extends Component {


  state = {
    openComment: false,
    editCommentId: '',
    editCommentBody: ''
  }

  onOpenComment = () => {
    this.setState({openComment: true})
  }
  onCloseComment = () => {
    this.setState({openComment: false})
  }
  upVote = (event) =>
    voteAComment({
      "id": event.target.dataset.commentid,
      "option": {"option": "upVote"}
    }).then(data => this.props.dispatch(editComment(data)))
  downVote = (event) => voteAComment({
    "id": event.target.dataset.commentid,
    "option": {"option": "downVote"}
  }).then(data => this.props.dispatch(editComment(data)))


  changeComment = (event) =>
    (
      // eslint-disable-next-line
      this.setState({editCommentId: event.target.dataset.commentid}),
        this.setState({editCommentBody: event.target.dataset.commentbody}),
        this.onOpenComment()
    )
  removeComment = (event) => deleteAComment(
    event.target.dataset.commentid).then(data => this.props.dispatch(deleteComment(data)))


  render() {


    let {comments, post} = this.props
    const {downVote, upVote, changeComment, removeComment} = this
    comments = comments.sort(sortBy('timestamp'))
    return (

      <div className="comments">
        <AddComment close={this.onCloseComment} open={this.state.openComment} commentEditId={this.state.editCommentId}
                    commentEditBody={this.state.editCommentBody} post={post}/>

        <i className="fa fa-comments-o"/>
        <span>there are {comments.length} comments available</span>
        <br/>
        <button className="button" onClick={this.onOpenComment} type="button"><span>Add comment</span></button>
        <ul>

          {
            comments && comments.map((comment, i) =>

              <li key={i}>
                <div className="inline">
                  <i className="fa fa-toggle-up" onClick={upVote} data-commentId={comment.id}/><br/>
                  <p>{comment.voteScore}</p>
                  <i className="fa fa-toggle-down" onClick={downVote} data-commentId={comment.id}/>
                </div>
                <div className="comment-content">
                  <span> {comment.body}</span><br/>
                  <small><strong> By: </strong> {comment.author}</small>

                </div>
                <div className="inline menuright">
                  <i className="fa fa-trash" onClick={removeComment} data-commentId={comment.id}/><br/>
                  <p>{comment.voteScore}</p>
                  <i className="fa fa-edit" onClick={changeComment} data-commentBody={comment.body}
                     data-commentId={comment.id}/>
                </div>
                <hr/>
              </li>)
          }
        </ul>
      </div>
    )
  }

}


export default withRouter(connect()(Comments))