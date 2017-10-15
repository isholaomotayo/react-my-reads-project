import React from 'react'
import Comments from "./Comments"
import {getComments, getPost, deletePost, editPost} from '../actions'
import {vote, getAllComments, deleteAPost, getSinglePost,} from '../utils/index'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import AddPost from './AddPost'

class Posts extends React.Component {

  state = {
    postId: '',
    postTitle: '',
    postBody: '',
    open: false,
  }
  goBack = () => this.props.history.push('/')

  onOpenModal = () => {
    this.setState({open: true})
  }
  onCloseModal = () => {
    this.setState({open: false, postId: '', postTitle: '', postBody: ''})
  }

  changePost = (event) =>
    (
      // eslint-disable-next-line
      this.setState({postId: event.target.dataset.postid}),
        this.setState({postTitle: event.target.dataset.posttitle}),
        this.setState({postBody: event.target.dataset.postbody}),
        this.onOpenModal()
    )
  removePost = () => deleteAPost(this.props.posts[0].id)
    .then(data => this.props.removeAPost(data), this.props.history.push('/'))
  upVote = () => vote({
    "id": this.props.posts[0].id,
    "option": {"option": "upVote"}
  }).then(data => this.props.changeEditPost(data))
  downVote = () => vote({
    "id": this.props.posts[0].id,
    "option": {"option": "downVote"}
  }).then(data => this.props.changeEditPost(data))

  componentDidMount() {
    getSinglePost(this.props.match.params.id).then(post => this.props.singlePost(post))
      .then(post =>
        getAllComments(post.post.id).then(comments => this.props.postsComments(comments)))
  }

  render() {
    const {comments, posts, categories} = this.props

    const post = posts[0]
    const {postId, postTitle, postBody} = this.state
    console.log(post)

    return (

      (post.error || post.id === undefined) ? <div className="noPost">
          <h5><span className="big404">404</span><br/>
            <span> THE POST YOU ARE TRYING TO
            VIEW IS </span><br/><span>NOT AVAILABLE</span></h5>
          <div className="button-container">
            <button className="button" type="button" onClick={this.goBack}>
              <span> Go Back</span></button>
          </div>
        </div> :

        <div className="post">

          <AddPost close={this.onCloseModal} open={this.state.open} categories={categories}
                   postId={postId} postTitle={postTitle} postBody={postBody}
          />
          <span className="vote">
            <a onClick={this.onOpenModal}> <i className="fa fa-plus-square"/>
            <br/>
            ADD <br/>
            POST
            </a>
            <hr/>
            VOTE <hr/>
    <i className="fa fa-plus-square-o" onClick={this.upVote}/><br/> {post.voteScore}<br/>
    <i className="fa fa-minus-square-o" onClick={this.downVote}/>
    <br/> <hr/>
    <i className="fa fa-edit inline bigText" data-postId={post.id} data-postTitle={post.title}
       data-postBody={post.body} onClick={this.changePost}/><br/>
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
  posts: state.posts,
  categories: state.categories
});

function mapDispatchToProps(dispatch) {
  return {
    singlePost: (data) => dispatch(getPost(data)),
    postsComments: (data) => dispatch(getComments(data)),
    removeAPost: (data) => dispatch(deletePost(data)),
    changeEditPost: (data) => dispatch(editPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
