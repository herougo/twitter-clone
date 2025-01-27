import React, { useCallback, useContext } from 'react';
import UserContext from '../../../../context/UserContext';
import follow from '../../../../features/user/services/follow';

const ProfilePageFollowButton = ({profileData}) => {
    const { user } = useContext(UserContext);

    let btnText = 'Following';
    let onClick = null;
    if (!profileData.isFollowing) {
        btnText = 'Follow';
        onClick = async () => {
            await follow({followerId: user.id, userId: profileData.id});
    
            // TODO: do something
        };
    }

    return (
        <button
            className='btn profile-page-content__side-btn'
            onClick={onClick}
        >
            {btnText}
        </button>
    );
}

export default ProfilePageFollowButton;
