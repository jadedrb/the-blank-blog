import React, { useState } from 'react';
import { deleteIcon, editIcon, commentIcon } from '../config/svgs';
import { useHistory } from 'react-router-dom';

import NewComment from './NewComment';
import Comment from './Comment';

const Post = ({ post, deleteEntity, comments }) => {
    let [viewComments, setViewComments] = useState(false)
    let history = useHistory()
    let args = [`/posts/${post.id}`, 'posts', post.id]
    let commentsForThisPost = comments.filter(c => c.commentParentId === post.id)

    const handleUpdate = () => {
        console.log('update?')
        history.push(`/post/${post.id}`)
        //updatePost(...args)
    }
    
    const handleDelete = () => {
        deleteEntity(...args)
        commentsForThisPost.forEach(c => {
            console.log('deleting comment...')
            deleteEntity(`/comments/${c.id}`, 'comments', c.id)
        })
    }

    const toggleComments = () => setViewComments(!viewComments)

    let displayComments = viewComments ? commentsForThisPost.map((c, i) => <Comment comment={c} key={i} />) : ''
    let newComment = viewComments ? <NewComment parent={post.id} /> : ''

    const convertDate = date => date.split('T')[0].split('-').join('/')

    console.log(convertDate(post.postDate))

    return (
        <div className='a-post'>
            <div className='e-icon-b' onClick={handleUpdate}> {editIcon()} </div>
            <div className='d-icon-b' onClick={handleDelete}> {deleteIcon()} </div>
            <div className='c-icon-b' onClick={toggleComments}> {commentIcon()} </div>
            <h4>{post.postSubject}</h4>
            <h6>Posted by {post.postUser} on {convertDate(post.postDate)}</h6>
            <div className='p-body'>{post.postBody}</div>
            {displayComments}
            {newComment}
        </div>
    )
}

export default Post;