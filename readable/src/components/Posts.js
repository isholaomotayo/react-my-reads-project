import React from 'react'
import {Comments} from "./Comments"
import {getComments, getPost} from '../actions'
import {vote, getAllComments, deletePost, editPost, getSinglePost} from '../utils/index'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Posts extends React.Component {



  componentDidMount() {
    getSinglePost(this.props.match.params.id).then(post => this.props.singlePost(post))
      .then( post =>
   getAllComments(post.post.id).then(comments => this.props.postsComments(comments)))
  }

   upVote = () => vote({
    "id": this.props.posts.id,
    "option": {"option": "upVote"}
  })
  downVote = () => vote({
    "id": this.props.posts.id,
    "option": {"option": "downVote"}
  })

removePost = () => deletePost(this.props.posts.id)
  onEditPost = () => editPost(this.props.posts.id)

  render() {
    const {comments , posts } = this.props
       const post = posts.reduce((post, c) => (c), {})


    return (
      <div className="post">
  <span className="vote"> VOTE <hr/>
    <i className="fa fa-plus-square-o" onClick={this.upVote}/><br/> {post.voteScore}<br/>
    <i className="fa fa-minus-square-o" onClick={this.downVote}/>
    <br/> <hr/> <br/>
    <i className="fa fa-edit inline bigText" /><br/> <br/>
    <i className="fa fa-trash inline bigText" onClick={this.removePost}/>
  </span>
        <h1>{post && post.title}</h1>
        <p>{post.body}
        </p>
        <Comments comments={comments} post={post}/>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  comments: state.comments,
  posts: state.posts
});

function mapDispatchToProps(dispatch) {
  return {
    singlePost: (data) => dispatch(getPost(data)),
    postsComments: (data) => dispatch(getComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
