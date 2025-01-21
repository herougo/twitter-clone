import React, { useContext } from 'react';
import UserContext from '../../../../context/UserContext';

const ProfilePageProfileInfo = ({username, data}) => {
    const {user, setUser} = useContext(UserContext);
    const loggedInUsername = user?.username;

    if (data.loading) {
        return <div>Loading</div>;
    }
    if (data.error) {
        return <div>{data.error.toString()}</div>;
    }

    let followerText = 'Followers';
    if (data.value.numFollowers === 1) {
        followerText = 'Follower';
    }

    const followOnClick = () => {

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
                    {loggedInUsername === username &&
                        <button className='btn profile-page-content__side-btn'>
                            Update Profile
                        </button>
                    }
                    {loggedInUsername !== username &&
                        <button
                            className='btn profile-page-content__side-btn'
                            onClick={followOnClick}
                        >
                            Follow
                        </button>
                    }
                </div>
            </div>
            <div className='profile-page-content__name'>
                <span>{data.value.name}</span>
            </div>
            <div className='profile-page-content__username'>
                <span>@{data.value.username}</span>
            </div>
            <div className='profile-page-content__follow'>
                <span>{data.value.numFollowing} Following</span>
                <span>{data.value.numFollowers} {followerText}</span>
            </div>
        </div>
    );
}

export default ProfilePageProfileInfo;