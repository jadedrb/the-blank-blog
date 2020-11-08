import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createOneFor } from '../actions/thunks';

class NewComment extends Component {

    state = {
        username: '',
        comment: ''
    }

    handleChange = e => this.setState({ [e.target.name] : e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)

        let commentModel = {
            commentUser: this.state.username,
            commentBody: this.state.comment,
            commentAvatar: '???',
            commentDate: new Date(),
            commentLikes: 0,
            commentParentId: this.props.parent
        }

        this.props.newComment('/comments', commentModel, 'comments', (data) => data.data)
        this.setState({ username: '', comment: '' })
    }

    render() {
        let { handleChange, handleSubmit } = this
        let { username, comment } = this.state

        return (
            <>
                <form onSubmit={handleSubmit} id='new-comment'>
                        <label id='care-input'>
                            <input 
                                name='username' 
                                value={username} 
                                onChange={handleChange}
                                placeholder='username:'
                                required 
                            />
                            <div>Care to comment?</div>
                        </label>
                        <label>
                    
                            <textarea 
                                name='comment' 
                                value={comment} 
                                onChange={handleChange}
                                required 
                            />
                        </label>
                        <button>Submit</button>
                </form>
            </>
        )
    }
}

//const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    newComment: (route, data, property, cleanup) => dispatch(createOneFor(route, data, property, cleanup))
})

export default connect(null, mapDispatchToProps)(NewComment);

