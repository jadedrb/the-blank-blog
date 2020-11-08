import React from 'react';
import { connect } from 'react-redux';
import { deleteOneByIdFor, updateOneByIdFor } from '../actions/thunks';

import Post from './Post';

const Posts = ({ posts, deleteEntity, updatePost, comments }) => {

    const displayPosts = posts.map((p, i) => {
        return <Post 
                    post={p} 
                    key={i} 
                    deleteEntity={deleteEntity} 
                    updatePost={updatePost}
                    comments={comments}
                />
    })

    return (
        <div id='posts'>
            {displayPosts}
        </div>
    )
}

const mapStateToProps = state => ({
    state: state,
    posts: state.data.posts,
    comments: state.data.comments
})

const mapDispatchToProps = dispatch => ({
    deleteEntity: (route, property, id) => dispatch(deleteOneByIdFor(route, property, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);