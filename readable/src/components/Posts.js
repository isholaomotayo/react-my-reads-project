import React from 'react'
import {Comments} from "./Comments"
import {getComments, getPost} from '../actions'
import {vote, getAllComments, deletePost, getSinglePost, } from '../utils/index'
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

  onOpenModal = () => {
    this.setState({open: true})
  }
  onCloseModal = () => {
    this.setState({open: false, postId:'', postTitle: '',     postBody: ''})
  }

  changePost = (event) =>
    (
      // eslint-disable-next-line
      this.setState({postId: event.target.dataset.postid}),
        this.setState({postTitle: event.target.dataset.posttitle}),
        this.setState({postBody: event.target.dataset.postbody}),
        this.onOpenModal()
    )
  removePost = (event) => deletePost(
    event.target.dataset.postid,
    console.log('comment ' + event.target.dataset.postid + 'Deleted')
  )


  componentDidMount() {
    getSinglePost(this.props.match.params.id).then(post => this.props.singlePost(post))
      .then(post =>
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

  render() {
    const {comments, posts, categories} = this.props
    const post = posts.reduce((post, c) => (c), {})

    const {postId, postTitle, postBody} = this.state

    return (


        <div className="post">

          <AddPost close={this.onCloseModal} open={this.state.open} categories={categories}
                   postId={postId} postTitle={postTitle} postBody={postBody}
          />
          <span className="vote">
            <a onClick={this.onOpenModal} > <i   className="fa fa-plus-square" />
            <br />
            ADD <br/>
            POST
            </a>
            <hr />
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
    postsComments: (data) => dispatch(getComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
