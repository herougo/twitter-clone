import React, { useState } from 'react';
import { useParams } from 'react-router';
import './ProfilePageContent.css';
import { usePostsAxios, useProfileAxios } from './hooks';
import ProfilePageProfileInfo from './ProfilePageProfileInfo';
import ProfilePagePosts from './ProfilePagePosts';

const ProfilePageContent = () => {
    const params = useParams();
    const profileUsername = params.username;

    const profileData = useProfileAxios(profileUsername);
    const postsData = usePostsAxios(profileUsername);

    return (
        <div>
            <ProfilePageProfileInfo
                username={profileUsername}
                data={profileData}
            />
            <h2 className='profile-page-content__posts-header'>
                Posts
            </h2>
            <ProfilePagePosts postsData={postsData} />
        </div>
    );
}

export default ProfilePageContent;
