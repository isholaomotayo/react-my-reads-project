import React, {Component} from 'react'
import sortBy from 'sort-by'
import {getCategories, getPosts, getAllComments, getComments} from '../actions'
import * as server from '../utils';
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import AddPost from './AddPost'


class PostIndex extends Component {
  state = {
    criteria: 'voteScore',
    direction: 'desc',
    postId: '',
    postTitle: '',
    postBody: '',
    open: false,
  }

  onOpenModal = () => {
    this.setState({open: true})
  }
  onCloseModal = () => {
    this.setState({open: false, postId:'', postTitle: '',  postBody: ''})

  }


  changePost = (event) =>
    (
      // eslint-disable-next-line
      this.setState({postId: event.target.dataset.postid}),
        this.setState({postTitle: event.target.dataset.posttitle}),
        this.setState({postBody: event.target.dataset.postbody}),
        this.onOpenModal()
    )
  removePost = (event) => server.deletePost(
    event.target.dataset.postid,
    console.log('comment ' + event.target.dataset.postid + 'Deleted')
  )


  sort = (event) => (this.setState({criteria: event.target.value}))
  sortDir = (event) => (this.setState({direction: event.target.value}) )

  componentDidMount() {

    this.props.clearComments([])
    server.getAllPosts().then(posts => this.props.allPosts({posts}))
      .then((posts) => ( posts.posts.posts.map(post => server.getAllComments(post.id)
        .then(comment => this.props.allComments(comment))))
      )

  }

  render() {

    const {comments, categories} = this.props

    const categoryPosts = this.props.posts
    this.state.direction === 'desc' ?
      categoryPosts.sort(sortBy(this.state.criteria)).reverse() :
      categoryPosts.sort(sortBy(this.state.criteria))

    const {postId, postTitle, postBody} = this.state

    return (

      <div className="container">

        <div className="inline">
          <div className="menuright">
            <a onClick={this.onOpenModal}>
              <i className="fa fa-plus"/> <span>Add Post</span>
            </a>
          </div>
          <AddPost close={this.onCloseModal} open={this.state.open} categories={categories}
                   postId={postId} postTitle={postTitle} postBody={postBody}
          />
          <div className="content">
            <span className="bigText"> Sort By </span>

            <label>
              <input type="radio" name="sort" value="voteScore" onChange={this.sort} className="option-input radio"
                     checked={this.state.criteria === 'voteScore'}/>
              <i className="helper"/>Votes
            </label>

            <label>
              <input type="radio" name="sort" value="timestamp" onChange={this.sort} className="option-input radio"
                     checked={this.state.criteria === 'timestamp'}/>
              Time
            </label>

            <label>
              <input type="radio" name="sortdir" value="asc" onChange={this.sortDir} className="option-input radio"
                     checked={this.state.direction === 'asc'}/>
              Ascending
            </label>

            <label>
              <input type="radio" name="sortdir" value="desc" onChange={this.sortDir} className="option-input radio"
                     checked={this.state.direction === 'desc'}/>
              Descending
            </label>
          </div>
<div className="masonry">
            {
              (categoryPosts ).map((post, i) => <div key={i}>
                  <Link to={`/${post.category}/${post.id}/`}>
                    <h2>{post.title}</h2>
                    <p><strong>Author : </strong>{post.author}</p>
                    <p> Votes Score: {post.voteScore}</p>
                    <p>{comments.filter(comments => (comments.parentId === post.id )).length} comments </p>
                  </Link>
                  <span className="bigText">
                    <i className="fa fa-edit inline bigText" data-postId={post.id} data-postTitle={post.title}
                       data-postBody={post.body} onClick={this.changePost}/>
                    <i className="fa fa-trash inline bigText" data-postId={post.id} onClick={this.removePost}/>
                  </span>
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  categories: state.categories,
  posts: state.posts,
  comments: state.comments,

});

function mapDispatchToProps(dispatch) {
  return {
    allPosts: (data) => dispatch(getPosts(data)),
    allCategories: (data) => dispatch(getCategories(data)),
    allComments: (data) => dispatch(getAllComments(data)),
    clearComments: (data) => dispatch(getComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostIndex))

