import React, { useCallback, useContext } from 'react';
import { BiBell, BiHomeAlt, BiLogOut, BiSearch, BiShoppingBag, BiUser } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import './LeftNav.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import LeftNavButton from './LeftNavButton';
import useLeftNavButtonActive from './hooks/useLeftNavButtonActive';
import useLeftNavNavigationCallbacks from './hooks/useLeftNavNavigationCallbacks';
import { MAIN_CONTENT_TYPES } from './utils';

const LeftNav = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const activeContentType = useLeftNavButtonActive();

    const logOut = useCallback((e) => {
        setUser(null);
        navigate('/welcome');
    });

    const leftNavNavigationCallbacks = useLeftNavNavigationCallbacks();
    
    return (
        <div className='left-nav'>
            <LeftNavButton
                isActive={activeContentType === MAIN_CONTENT_TYPES.home}
                onClick={leftNavNavigationCallbacks.home}>
                <div className='left-nav__icon-container'>
                    <BiHomeAlt></BiHomeAlt>
                </div>
                <div className='left-nav__btn-text'>Home</div>
            </LeftNavButton>
            <LeftNavButton
                isActive={activeContentType === MAIN_CONTENT_TYPES.profile}
                onClick={leftNavNavigationCallbacks.profile}>
                <div className='left-nav__icon-container'>
                    <BiUser></BiUser>
                </div>
                <div className='left-nav__btn-text'>Profile</div>
            </LeftNavButton>
            <LeftNavButton
                isActive={activeContentType === MAIN_CONTENT_TYPES.search}
                onClick={leftNavNavigationCallbacks.search}>
                <div className='left-nav__icon-container'>
                    <BiSearch></BiSearch>
                </div>
                <div className='left-nav__btn-text'>Search</div>
            </LeftNavButton>
            <LeftNavButton
                isActive={activeContentType === MAIN_CONTENT_TYPES.store}
                onClick={leftNavNavigationCallbacks.store}>
                <div className='left-nav__icon-container'>
                    <BiShoppingBag></BiShoppingBag>
                </div>
                <div className='left-nav__btn-text'>Store</div>
            </LeftNavButton>
            <LeftNavButton
                isActive={activeContentType === MAIN_CONTENT_TYPES.notifications}
                onClick={leftNavNavigationCallbacks.notifications}>
                <div className='left-nav__icon-container'>
                    <BiBell></BiBell>
                </div>
                <div className='left-nav__btn-text'>Notifications</div>
            </LeftNavButton>
            <LeftNavButton
                isActive={activeContentType === MAIN_CONTENT_TYPES.messages}
                onClick={leftNavNavigationCallbacks.messages}>
                <div className='left-nav__icon-container'>  
                    <FiMail></FiMail>
                </div>
                <div className='left-nav__btn-text'>Messages</div>
            </LeftNavButton>
            <LeftNavButton onClick={logOut}>
                <div className='left-nav__icon-container'>
                    <BiLogOut></BiLogOut>
                </div>
                <div className='left-nav__btn-text'>Logout</div>
            </LeftNavButton>
        </div>
    );
}

export default LeftNav;
