import React from 'react';
import { CreatePost } from '../../../../features/posts';
import HomePageFeed from './HomePageFeed';

const HomePageContent = () => {
    return (
        <div className='home'>
            <CreatePost />
            <HomePageFeed />
        </div>
    );
}

export default HomePageContent;
