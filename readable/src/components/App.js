import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategories, getPosts, getAllComments, getComments} from '../actions'
import PostIndex from './PostIndex'
import AddPost from './AddPost'
import Posts from './Posts'
import {Link, Route, withRouter} from 'react-router-dom'
import './App.css';
import * as server from '../utils';


class App extends Component {
  state = {
    open: false,

  }

  onOpenModal = () => {
    this.setState({open: true})
  }
  onCloseModal = () => {
    this.setState({open: false})
  }

  getPostandComments = ()=>{
    this.props.clearComments([])
  server.getAllPosts().then(posts =>
  this.props.allPosts({posts})
).then((posts) =>( posts.posts.posts.map(post => server.getAllComments(post.id)
.then(comment => this.props.allComments(
    comment)))))
}
  componentDidMount() {
    server.getAllCategories().then(categories =>
      this.props.allCategories({categories})
    )

  }
  render() {
    const {posts, categories, comments} = this.props

    return (

      <div>
        <nav className="menu">
          <AddPost close={this.onCloseModal} open={this.state.open} categories={categories}/>
          <ul className="mainmenu ">
            <Link to='/'>
              <div className="logo"><img src="/assets/readableLogo.jpg" alt="logo"/></div>
            </Link>
            {
              categories.map((menu, i) =>
                <li key={i}>
                  <Link to={`/${menu.name}/`}>{menu.name}
                  </Link></li>
              )

            }

            <ul className="menuright">
              <li><a onClick={this.onOpenModal}>
                <i className="fa fa-plus"/> <span>Add Post</span>
              </a>
              </li>
            </ul>
          </ul>

        </nav>
        <div className="container">
          <Route exact path='/'
                 render={() => (<PostIndex posts={posts} comments={comments} getAll={this.getPostandComments}/>)}
          />
          <Route exact path='/:category/:id'
                 render={(props) => (<Posts  {...props} posts={posts}/>)}
          />
          <Route exact path='/:category'
                 render={(props) => (<PostIndex  {...props} posts={posts}  getAll={this.getPostandComments} comments={comments}/>)}
          />
        </div>
      </div>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
