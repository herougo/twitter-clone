import React, { useContext } from 'react';
import './ProfilePageContent.css';
import UserContext from '../../../../context/UserContext';

const profile = {
    username: 'username',
    name: "User Name",
    numFollowers: 4,
    numFollowing: 5,
    backgroundImageUrl: null,
    profileImageUrl: null
}

const ProfilePageContent = () => {
    const {user, setUser} = useContext(UserContext);
    const loggedInUsername = user?.username;

    let followerText = 'Followers';
    if (user.numFollowers === 1) {
        followerText = 'Follower';
    }

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
                <div>
                    {loggedInUsername === profile.username &&
                        <button className='btn profile-page-content__update-profile-btn'>
                            Update Profile
                        </button>
                    }
                </div>
            </div>
            <div className='profile-page-content__name'>
                <span>{profile.name}</span>
            </div>
            <div className='profile-page-content__username'>
                <span>@{profile.username}</span>
            </div>
            <div className='profile-page-content__follow'>
                <span>{profile.numFollowing} Following</span>
                <span>{profile.numFollowers} {followerText}</span>
            </div>
        </div>
    );
}

export default ProfilePageContent;
