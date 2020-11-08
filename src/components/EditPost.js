import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createOneFor, readAllFrom, updateOneByIdFor } from '../actions/thunks';

class EditPost extends Component {

    state = {
        subject: '',
        body: '',
        user: '',
        path: window.location.href.split('/').pop()
    }

    async componentDidMount() { 
        if (this.state.path !== 'post') {
          try {
            let currentData = await this.props.getCurrentPost(`/posts/${this.state.path}`, 'current', (data) => data.data)
            this.setState({ 
                subject: currentData.postSubject,
                body: currentData.postBody,
                user: currentData.postUser
            })
          } catch (err) {}
        }
    }


    handleSubmit = e => {
        e.preventDefault()
        this.state.path === 'post' ? this.creatingNewPost() : this.updatingExistingPost()
    }

    creatingNewPost = () => {
        let { createPost } = this.props

        let postModel = {
            postSubject: this.state.subject,
            postBody: this.state.body,
            postUser: this.state.user,
            postDate: new Date(),
            postLikes: 0
        }

        createPost('/posts', postModel, 'posts', (data) => data.data)
        console.log('creating...')
        this.props.history.push('/')
    }

    updatingExistingPost = () => {
        let { updatePost } = this.props

        let updateModel = {
            postSubject: this.state.subject,
            postBody: this.state.body,
            postUser: this.state.user
        }

        updatePost(`/posts/${this.state.path}`, updateModel, 'posts', this.state.path)
        console.log('updating...')
        this.props.history.push('/')

    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name] : value })
    }

    render() {
        let { subject, body, user } = this.state
        let { handleSubmit, handleChange } = this

        let buttonText = this.state.path === 'post' ? 'POST' : 'UPDATE'

        return (
            <>
                <Link to='/' className='n-post'>Back</Link>
                <form onSubmit={handleSubmit} id='new-post'>
                    <label>
                        <h3>Subject</h3>
                        <input 
                            name='subject' 
                            value={subject} 
                            onChange={handleChange}
                            required 
                        />
                    </label>
                    <label>
                        <h3>&nbsp;</h3>
                        <input 
                            name='user' 
                            value={user} 
                            onChange={handleChange}
                            placeholder='username:'
                            required 
                        />
                    </label>
                    <label id='text-body'>
                        <h3>Body</h3>
                        <textarea
                            name='body' 
                            value={body} 
                            onChange={handleChange} 
                            required 
                        />
                    </label>
                    <button>{buttonText}</button>
                </form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    current: state.data.current
})

const mapDispatchToProps = dispatch => ({
    createPost: (route, data, property, cleanup) => dispatch(createOneFor(route, data, property, cleanup)),
    getCurrentPost: (route, property, cleanup) => dispatch(readAllFrom(route, property, cleanup)),
    updatePost: (route, data, property, id) => dispatch(updateOneByIdFor(route, data, property, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));