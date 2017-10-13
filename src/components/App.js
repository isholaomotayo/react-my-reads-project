import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategories, getPosts, getAllComments, getComments} from '../actions'
import PostIndex from './PostIndex'
import Posts from './Posts'
import {Link, Route, withRouter} from 'react-router-dom'
import './App.css';
import * as server from '../utils';


class App extends Component {

  componentDidMount() {
    server.getAllCategories().then(categories =>
      this.props.allCategories({categories}))
  }

  render() {
    const {categories} = this.props
    return (

      <div>
        <nav className="menu">

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


          </ul>
        </nav>
        <div className="container">
          <Route exact path='/'
                 render={(props) => (<PostIndex {...props}  />)}
          />
          <Route exact path='/:category/:id'
                 render={(props) => (<Posts/>)}
          />
          <Route exact path='/:category'
                 render={(props) => (<PostIndex  {...props} />)}
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
