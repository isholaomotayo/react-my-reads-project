import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategories, getPosts, getComments} from '../actions'
import {Sidebar} from './Sidebar'
import {Posts} from './Posts'
import {Comments} from './Comments'
import Modal from 'react-responsive-modal';

import './App.css';
import * as server from '../utils';
// eslint-disable-next-line
import uuidv4 from 'uuid'
// eslint-disable-next-line
import Loading from 'react-loading'

class App extends Component {
  state = {
    open: false,
  };


  onOpenModal = () => {
    this.setState({open: true})
  }

  onCloseModal = () => {
    this.setState({open: false})
  }

  componentDidMount() {
    server.getAllCategories().then(categories =>
      this.props.allCategories({categories})
    )
    server.getAllPosts().then(posts =>
      this.props.allPosts({posts})
    ).then(posts => server.getAllComments(posts.posts.posts[0].id)
      .then(comments => this.props.postsComments(comments)))
  }


  render() {
    // eslint-disable-next-line
    const {posts, categories, comments} = this.props
    const {open} = this.state
    return (

      <div>
        <nav className="menu">

          <ul className="mainmenu ">
            <div className="logo"><img src="assets/readableLogo.jpg" alt="logo"/></div>

            {
              categories.map((menu, i) =>
                <li key={i}><a>{menu.name}</a></li>)
            }
            <ul className="menuright">
              <li onClick={this.onOpenModal}>
                <i className="fa fa-plus"/> <span>Add Post</span>
              </li>
            </ul>
          </ul>

        </nav>
        <div className="container">

          <Sidebar posts={posts}/>
          <div className="content">
            <div className="image">
            </div>
            <Posts posts={posts}/>
            <Comments comments={comments}/>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal} >
          <div className="form-group">

            <form>
              <h1>Add new Post</h1>
              <div className="form-group">
                <select>
                  <option>Value 1</option>
                  <option>Value 2</option>
                </select>
                <label className="control-label" htmlFor="select">Selectbox</label><i className="bar"></i>
              </div>
              <div className="form-group">
                <input type="text" required="required"/>
                <label className="control-label" htmlFor="input">Textfield</label><i className="bar"></i>
                <div className="button-container">
                  <button className="button" type="button"><span>Submit</span></button>
                </div>
              </div></form>

          </div>
        </Modal>
      </div>
  );
  }
  }

  const mapStateToProps = (state, props) => ({
    categories: state.categories.categories,
    posts: state.posts.posts,
    comments: state.comments.comments,

  });

  function mapDispatchToProps(dispatch) {
    return {
    allPosts: (data) => dispatch(getPosts(data)),
    allCategories: (data) => dispatch(getCategories(data)),
    postsComments: (data) => dispatch(getComments(data))
  }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(App);
