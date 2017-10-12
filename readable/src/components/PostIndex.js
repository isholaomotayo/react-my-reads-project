import React, { Component } from 'react'
import sortBy from 'sort-by'
import {getCategories, getPosts, getAllComments, getComments} from '../actions'
import * as server from '../utils';
import {connect} from 'react-redux'
import {Link,  withRouter} from 'react-router-dom'


class PostIndex extends Component {
  state = {
    criteria: 'voteScore',
    direction:'desc'
  }

  sort = (event) => (this.setState({criteria: event.target.value}))
  sortDir = (event) => (this.setState({direction: event.target.value}) )
componentDidMount(){

    this.props.clearComments([])
    server.getAllPosts().then(posts =>this.props.allPosts({posts}))
      .then((posts) =>( posts.posts.posts.map(post => server.getAllComments(post.id)
      .then(comment => this.props.allComments(comment))))
)


}
  render() {

    const { comments } = this.props

    const categoryPosts =  this.props.posts
    this.state.direction === 'desc' ?
      categoryPosts.sort(sortBy(this.state.criteria)).reverse() :
      categoryPosts.sort(sortBy(this.state.criteria))


    return (

      <div className="container">
       <div className="inline">

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
                  <p>{comments.filter( comments => (comments.parentId === post.id )).length} comments </p>
                </Link>
                  <span className="bigText" >
                    <i className="fa fa-edit inline bigText"  data-postId={post.id}/>
                    <i className="fa fa-trash inline bigText"  data-postId={post.id}/>
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

