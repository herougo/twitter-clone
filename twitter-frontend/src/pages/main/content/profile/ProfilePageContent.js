import React, { useContext } from 'react';
import './ProfilePageContent.css';
import UserContext from '../../../../context/UserContext';

const ProfilePageContent = () => {
    const {user, setUser} = useContext(UserContext);
    const loggedInUsername = user.username;

    return (
        <div>
            <div className='profile-page-content__background'>
                <img/>
            </div>
            <div className='profile-page-content__background-footer'>
                <div className='profile-page-content__profile-pic-parent-div'>
                    <div className='profile-page-content__profile-pic'>
                        <img/>
                    </div>
                </div>
                <button className='btn profile-page-content__update-profile-btn'>
                    Update Profile
                </button>
            </div>
        </div>
    );
}

export default ProfilePageContent;
