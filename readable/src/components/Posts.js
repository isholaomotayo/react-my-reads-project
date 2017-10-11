import React from 'react'
import {Comments} from "./Comments"
import {getComments} from '../actions'
import {vote, getAllComments} from '../utils/index'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Posts extends React.Component {

  componentDidMount()
  {
    getAllComments(this.props.posts.filter((posts) => (posts.id === this.props.match.params.id))
      .reduce((post, c) => (c), {}).id).then(comments => this.props.postsComments(comments))
  }
  render() {
    const {comments, posts, match} = this.props

    const upVote = () => vote({
      "id": post.id,
      "option": {"option": "upVote"}
    })
    const downVote = () => vote({
      "id": post.id,
      "option": {"option": "downVote"}
    })

    const post = (posts).filter((posts) => (posts.id === match.params.id))
       .reduce((post, c) => (c), {})

    return (
      <div className="post">
  <span className="vote"> VOTE <hr/>
    <i className="fa fa-plus-square-o" onClick={upVote}/><br/> {post.voteScore}<br/> <i
      className="fa fa-minus-square-o" onClick={downVote}/>
  </span>
        <h1>{posts && post.title}</h1>
        <p>{post.body}
        </p>
        <Comments comments={comments} post={post}/>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  comments: state.comments

});

function mapDispatchToProps(dispatch) {
  return {
    postsComments: (data) => dispatch(getComments(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
