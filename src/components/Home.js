import React from 'react';
import { useHistory } from 'react-router-dom';

import Posts from './Posts';

const Home = ({ title, loading }) => {
    let history = useHistory()

    const handleClick = e => history.push('/post')
    let loader = loading ? { display: 'block' } : { display: 'none' }

    return (
        <>
            <div className="loader" id='loader' style={loader}></div>
            <div onClick={handleClick} className='n-post'>
                <span>New Post</span>
            </div>
            <Posts />
        </>
    )
}

export default Home;
