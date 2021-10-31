import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { connect } from 'react-redux';
import { readAllFrom } from './actions/thunks'
import { saveData } from './actions/exampleActions';
import { WORD_API } from './config/endpoints';

import Home from './components/Home';
import EditPost from './components/EditPost';

class App extends Component {

  state = {}

  componentDidMount() { 
    // This app runs with the Employee2020 Java/Spring Boot server
    // proxy works on npm start, but not after github pages development 

    let { dataGrab } = this.props

    const dataCleanup = (data) => {
      let word = data.data[0].charAt(0).toUpperCase() + data.data[0].slice(1)
      document.title = `The ${word} Blog`
      return word
    }

    dataGrab(WORD_API, 'titleOfBlog', dataCleanup)
    dataGrab('/posts', 'posts', (data) => data.data)
    dataGrab('/comments', 'comments', (data) => data.data)
    console.log('v1.06')
	
	let dbTimer = 0;
	let dbInterval = setInterval(() => { 
		if (!dataGrab.loading) dbTimer += 100
			else {
				console.log("Connection time: " + dbTimer)
				clearInterval(dbInterval)
			}
	}, 100)
  }

  //https://www.googleapis.com/customsearch/v1

  render() {

    let { titleOfBlog } = this.props

    return (
      <div id='main-div'>
        <h1>The {titleOfBlog} Blog</h1>
        <Router>
          <Switch>
            <Route exact path='/' render={()=> <Home title={titleOfBlog} loading={this.props.loading}/>} />
            <Route path='/post' render={() => <EditPost />} />
          </Switch>
        </Router>
      </div>
     );
  }
}

const mapStateToProps = (state) => ({
  comments: state.data.comments,
  titleOfBlog: state.data.titleOfBlog,
  loading: state.data.loading
})

const mapDispatchToProps = (dispatch) => ({
  dataGrab: (route, property, cleanup) => dispatch(readAllFrom(route, property, cleanup)),
  formatData: (data, property) => dispatch(saveData(data, property))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
