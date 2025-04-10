import React from 'react';
import './NewMessagePageContent.css';
import useAxiosWrapper from '../../../../../hooks/useAxiosWrapper';
import createChannel from './services/createChannel';

const NewMessagePageContent = () => {
    const {axiosWithHeader} = useAxiosWrapper();

    return (
        <div>
            New Message
        </div>
    );
}

export default NewMessagePageContent;
