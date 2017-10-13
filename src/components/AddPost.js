import Modal from 'react-responsive-modal';
import React, {Component} from 'react'
import swal from 'sweetalert'
import uuidv4 from 'uuid'
import * as server from '../utils';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addPost, editPost} from '../actions'


class AddPost extends Component {

  onAddPost = () => {
    let post = {
      id: uuidv4().replace(/-/g, ""),
      timestamp: Date.now(),
      title: this.postName.value.trim(),
      author: this.postAuthor.value.trim(),
      body: this.postBody.value.trim(),
      category: this.postCategory.value.trim(),
      voteScore: 0,
      deleted: false
    }
    server.addAPost(post).then(data => this.props.dispatch(addPost(data),
      swal("Post created", `Your Post ${data.title} has been added successfully`, "success"),
      this.props.close()))
  }

  onEditPost = () => {
    let post = {
      id: this.props.postId,
      title: this.postName.value.trim(),
      body: this.postBody.value.trim(),
    }
    server.editAPost(post).then(data => this.props.dispatch(editPost(data),
      swal("Post edited", `Your Post ${data.title} has been edited successfully`, "success"), this.props.close()))
  }

  render() {
    const {categories, close, open, postId, postTitle, postBody} = this.props

    return (

      <Modal open={open} onClose={close}>
        <div className="form-group wide">

          <form>
            <h1>
              {postId ? 'Edit Post' : 'Add new Post'}
            </h1>
            {!postId &&
            <div className="form-group">
              <select ref={(input) => {
                this.postCategory = input
              }}>
                {
                  categories.map((menu, i) =>
                    <option key={i}>{menu.name}</option>)
                }
              </select>
              <label className="control-label" htmlFor="select">Category</label><i className="bar"></i>
            </div>
            }
            <div className="form-group">
              <input type="text"
                     ref={(input) => {
                       this.postName = input
                     }}
                     required="required"
                     defaultValue={postTitle}/>
              <label className="control-label" htmlFor="input">Post Name</label><i className="bar"></i>
            </div>
            {!postId &&
            <div className="form-group">
              <input type="text" ref={(input) => {
                this.postAuthor = input
              }} required="required"/>
              <label className="control-label" htmlFor="input">Author</label><i className="bar"></i>
            </div>
            }
            <div className="form-group">
                <textarea
                  ref={(input) => {
                    this.postBody = input
                  }}
                  required="required"
                  defaultValue={postBody}>

                </textarea>
              <label className="control-label" htmlFor="textarea">Post Body</label><i className="bar"></i>
            </div>

            <div className="button-container">

              <button className="button" type="button"


                      onClick={postId ? this.onEditPost : this.onAddPost}>
                <span>{postId ? 'Edit post ' : 'Create Post'} </span>


              </button>
            </div>
          </form>
        </div>
      </Modal>

    )
  }

}

export default withRouter(connect()(AddPost))