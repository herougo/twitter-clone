import React from 'react';
import './HomePage.css';
import LeftNav from '../../layouts/left-nav/LeftNav';
import MainContent from '../../layouts/main-content/MainContent';

const HomePage = () => {
    return (
        <div className='home'>
            <LeftNav></LeftNav>
            <MainContent></MainContent>
        </div>
    );
}

export default HomePage;
