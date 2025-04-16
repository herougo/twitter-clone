import React from 'react';
import CONFIG from '../../lib/config';

const ImgFromPath = ({path}) => {
    if (!path) {
        return <img/>
    }

    const url = `${CONFIG.backendBaseURL}/${path}`;
    return (
        <img src={url}>
            
        </img>
    );
}

export default ImgFromPath;
