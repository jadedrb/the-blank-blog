import React from 'react';


const Comment = ({ comment }) => {
    console.log(comment)
    return (
        <div className='comment'>
            <h5>{comment.commentUser}</h5>
            <div>{comment.commentBody}</div>
        </div>
    )
}

export default Comment;