import React from 'react';
import { useParams } from 'react-router';
import './ProfilePageContent.css';
import Post from '../../../../features/posts/components/Post';
import { useProfileAxios } from './hooks';
import ProfilePageProfileInfo from './ProfilePageProfileInfo';

const profilePosts = [
    {
        id: 1,
        author: {name: "User Name", username: "u" },
        contents: "Hello world",
        numLikes: 3,
        numDislikes: 1,
        createdDate: '2025-01-08T20:49:06.669+00:00',
        userInteraction: 'dislike',
        replyTo: {
            author: {name: "User Name", username: "u" },
            contents: "The world says hello!",
            createdDate: '2022-12-18T20:49:06.669+00:00'
        }
    },
    {
        id: 5,
        author: {name: "User Name", username: "u" },
        contents: "The world says hello!",
        numLikes: 1,
        numDislikes: 0,
        userInteraction: 'like',
        createdDate: '2022-12-18T20:49:06.669+00:00'
    }
];

const ProfilePageContent = () => {
    const params = useParams();
    const profileUsername = params.username;

    const profileData = useProfileAxios(profileUsername);

    return (
        <div>
            <ProfilePageProfileInfo
                username={profileUsername}
                data={profileData}
            />
            <h2 className='profile-page-content__posts-header'>
                Posts
            </h2>
            <div className='profile-page-content__posts'>
                {
                    profilePosts.map(
                        post => <Post key={post.id} post={post}></Post>
                    )
                }
            </div>
        </div>
    );
}

export default ProfilePageContent;
