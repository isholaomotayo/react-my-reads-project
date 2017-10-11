import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import sortBy from 'sort-by'

class PostIndex extends Component {
  state = {
    criteria: 'voteScore',
    direction:'desc'
  }
  sort = (event) => (this.setState({criteria: event.target.value}))
  sortDir = (event) => (this.setState({direction: event.target.value}) )
componentDidMount(){
    this.props.getAll()
}
  render() {

    const {posts, match, comments } = this.props

    const categoryPosts = (match) ? posts.filter((posts) => (posts.category === match.params.category)) : posts
    this.state.direction === 'desc' ?
    categoryPosts.sort(sortBy(this.state.criteria)).reverse() :
      categoryPosts.sort(sortBy(this.state.criteria))


    return (

      <div className="container">

        <div className="content">
          <span className="bigText"> Sort By </span>
          <div className="form-radio inline">
            <span className="radio">
              <label>
                <input type="radio" name="sort" value="voteScore" onChange={this.sort}
                       checked={this.state.criteria === 'voteScore'}/>
                <i className="helper"/>Votes
              </label>
            </span>
            <span className="radio">
              <label>
                <input type="radio" name="sort" value="timestamp" onChange={this.sort}
                       checked={this.state.criteria === 'timestamp'}/>
                <i className="helper"></i>Time
              </label>
            </span>
          </div>

          <div className="form-radio inline">
            <span className="radio">
              <label>
                <input type="radio" name="sortdir" value="asc" onChange={this.sortDir}
                       checked={this.state.direction === 'asc'}/>
                <i className="helper"/>Ascending
              </label>
            </span>
            <span className="radio">
              <label>
                <input type="radio" name="sortdir" value="desc" onChange={this.sortDir}
                       checked={this.state.direction === 'desc'}/>
                <i className="helper"></i>Descending
              </label>
            </span>
          </div>

          <div className="masonry">
            {
              (categoryPosts ).map((post, i) => <div key={i}>
                <Link to={`/${post.category}/${post.id}/`}>
                  <h2>{post.title}</h2>
                  <p><strong>Author : </strong>{post.author}</p>
                  <p> Votes Score: {post.voteScore}</p>
                  <p>{comments.filter( comments => (comments.parentId === post.id )).length} comments </p>
                </Link></div>
              )
            }
          </div>

        </div>
      </div>
    )
  }
}

export default PostIndex
