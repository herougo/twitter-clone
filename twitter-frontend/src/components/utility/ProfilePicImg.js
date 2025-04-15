import React from 'react';
import CONFIG from '../../lib/config';

const ProfilePicImg = ({path}) => {
    if (!path) {
        return <img src={'/blank-profile-picture.png'} />
    }

    const url = `${CONFIG.backendBaseURL}/${path}`;
    return (
        <img src={url}>
            
        </img>
    );
}

export default ProfilePicImg;
