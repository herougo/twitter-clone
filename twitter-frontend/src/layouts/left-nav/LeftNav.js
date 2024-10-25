import React, { useContext } from 'react';
import { BiBell, BiHomeAlt, BiLogOut, BiSearch, BiShoppingBag, BiUser } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';
import './LeftNav.css';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const LeftNav = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const logOut = (e) => {
        setUser(null);
        navigate('/welcome');
    }

    return (
        <div className='left-nav'>
            <div className='left-nav__btn' onClick={(e) => navigate('/')}>
                <div className='left-nav__icon-container'>
                    <BiHomeAlt></BiHomeAlt>
                </div>
                <div className='left-nav__btn-text'>Home</div>
            </div>
            <div className='left-nav__btn' onClick={(e) => navigate('/profile')}>
                <div className='left-nav__icon-container'>
                    <BiUser></BiUser>
                </div>
                <div className='left-nav__btn-text'>Profile</div>
            </div>
            <div className='left-nav__btn' onClick={(e) => navigate('/search')}>
                <div className='left-nav__icon-container'>
                    <BiSearch></BiSearch>
                </div>
                <div className='left-nav__btn-text'>Search</div>
            </div>
            <div className='left-nav__btn' onClick={(e) => navigate('/store')}>
                <div className='left-nav__icon-container'>
                    <BiShoppingBag></BiShoppingBag>
                </div>
                <div className='left-nav__btn-text'>Store</div>
            </div>
            <div className='left-nav__btn' onClick={(e) => navigate('/notifications')}>
                <div className='left-nav__icon-container'>
                    <BiBell></BiBell>
                </div>
                <div className='left-nav__btn-text'>Notifications</div>
            </div>
            <div className='left-nav__btn' onClick={(e) => navigate('/messages')}>
                <div className='left-nav__icon-container'>  
                    <FiMail></FiMail>
                </div>
                <div className='left-nav__btn-text'>Messages</div>
            </div>
            <div className='left-nav__btn' onClick={logOut}>
                <div className='left-nav__icon-container'>
                    <BiLogOut></BiLogOut>
                </div>
                <div className='left-nav__btn-text'>Logout</div>
            </div>
        </div>
    );
}

export default LeftNav;
