import React from 'react';
import './HomePage.css';
import LeftNav from '../../layouts/left-nav/LeftNav';
import MainContent from '../../layouts/main-content/MainContent';
import RightNav from '../../layouts/right-nav/RightNav';

const HomePage = () => {
    return (
        <div className='home container'>
            <div className='holy-grail-content'>
                <LeftNav></LeftNav>
                <MainContent></MainContent>
                <RightNav></RightNav>
            </div>
        </div>
    );
}

export default HomePage;
