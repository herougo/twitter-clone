import React from 'react';
import './MainPage.css';
import LeftNav from '../../layouts/left-nav/LeftNav';
import MainContent from '../../layouts/main-content/MainContent';
import { Outlet } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className='home'>
            <LeftNav></LeftNav>
            <MainContent>
                <Outlet />
            </MainContent>
        </div>
    );
}

export default MainPage;
