import React from 'react';
import { useHistory } from 'react-router-dom';

import Posts from './Posts';

const Home = ({ title }) => {
    let history = useHistory()

    const handleClick = e => history.push('/post')

    return (
        <>
            <div onClick={handleClick} className='n-post'>
                <span>New Post</span>
            </div>
            <Posts />
        </>
    )
}

export default Home;
