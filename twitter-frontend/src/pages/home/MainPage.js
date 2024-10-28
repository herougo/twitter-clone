import React from 'react';
import './MainPage.css';
import LeftNav from '../../layouts/left-nav/LeftNav';
import MainContent from '../../layouts/main-content/MainContent';

const MainPage = () => {
    return (
        <div className='home'>
            <LeftNav></LeftNav>
            <MainContent></MainContent>
        </div>
    );
}

export default MainPage;
