import Modal from 'react-responsive-modal';
import React, {Component} from 'react'
import swal from 'sweetalert'
import uuidv4 from 'uuid'
import {addAComment, editAComment} from '../utils';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addComment, editComment} from '../actions'

class AddComment extends Component {

  onAddComment = () => {
    let comment = {
      id: uuidv4().replace(/-/g, ""),
      timestamp: Date.now(),
      parentId: this.commentParent.value.trim(),
      author: this.commentAuthor.value.trim(),
      body: this.commentBody.value.trim(),
      parentDeleted: false,
      voteScore: 0,
      deleted: false
    }
    addAComment(comment).then(data => this.props.dispatch(addComment(data),
      swal("New Comment Added", `Your Comment ${data.body} has been added successfully`, "success"),
      this.props.close()))
  }

  onEditComment = () => {
    let comment = {
      id: this.props.commentEditId,
      timestamp: Date.now(),
      body: this.commentBody.value.trim(),

    }
    editAComment(comment).then(data => this.props.dispatch(editComment(data),
      swal("New Comment Added", `Your Comment ${data.body} has been edited successfully`, "success"), this.props.close()))
  }

  render() {
    const {post, close, open, commentEditBody, commentEditId} = this.props

    return (

      <Modal open={open} onClose={close}>

        <div className="form-group wide">
          <form>
            <h1>
              {commentEditId ? 'Edit Comment' : 'Add a Comment'}
            </h1>
            <div className="form-group">
              <input type="hidden" ref={(input) => {
                this.commentParent = input
              }} defaultValue={post && post.id}/>
            </div>
            {!commentEditId && <div className="form-group">
              <input type="text" ref={(input) => {
                this.commentAuthor = input
              }} required="required"/>
              <label className="control-label" htmlFor="input">Author</label><i className="bar"></i>
            </div>}

            <div className="form-group">
                <textarea ref={(input) => {
                  this.commentBody = input
                }}
                          required="required" defaultValue={commentEditBody && commentEditBody}/>
              <label className="control-label" htmlFor="textarea">Comment Body</label><i className="bar"/>
            </div>
            <div className="button-container">
              <button className="button" type="button" onClick={commentEditId ? this.onEditComment : this.onAddComment}>
                <span>{commentEditId ? 'Edit Comment' : 'Create Comment'}</span></button>
            </div>
          </form>

        </div>
      </Modal>

    )
  }

}

export default withRouter(connect()(AddComment))