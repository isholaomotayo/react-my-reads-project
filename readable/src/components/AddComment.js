import Modal from 'react-responsive-modal';
import React, {Component} from 'react'
import swal from 'sweetalert'
import uuidv4 from 'uuid'
import { addComment } from '../utils';


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
    addComment(comment).then(
      data => swal("New Comment Added", `Your Comment ${data.body} has been added successfully`, "success"), this.props.close())
  }

  render() {
    const {post, close, open} = this.props

    return (

      <Modal open={open} onClose={close}>
        <div className="form-group wide">
          <form>
            <h1>Add new Comment</h1>
            <div className="form-group">
              <input type="hidden" ref={(input) => {
                this.commentParent = input
              }} value={post.id}/>
            </div>
            <div className="form-group">
              <input type="text" ref={(input) => {
                this.commentAuthor = input
              }} required="required"/>
              <label className="control-label" htmlFor="input">Author</label><i className="bar"></i>
            </div>
            <div className="form-group">
                <textarea ref={(input) => {
                  this.commentBody = input
                }} required="required"></textarea>
              <label className="control-label" htmlFor="textarea">Comment Body</label><i className="bar"></i>
            </div>
            <div className="button-container">

              <button className="button" type="button" onClick={this.onAddComment}><span>Submit</span></button>
            </div>
          </form>

        </div>
      </Modal>

    )
  }

}

export default AddComment