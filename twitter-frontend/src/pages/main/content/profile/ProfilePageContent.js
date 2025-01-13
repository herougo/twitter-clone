import React, { useContext } from 'react';
import './ProfilePageContent.css';
import UserContext from '../../../../context/UserContext';
import Post from '../../../../features/posts/components/Post';

const profile = {
    username: 'u',
    name: "User Name",
    numFollowers: 4,
    numFollowing: 5,
    backgroundImageUrl: null,
    profileImageUrl: null,
    posts: [
        {
            id: 1,
            author: {name: "User Name", username: "u" },
            contents: "Hello world",
            numLikes: 3,
            numDislikes: 1,
            createdDate: '2025-01-08T20:49:06.669+00:00',
            replyTo: {
                id: 5,
                author: {name: "User Name", username: "u" },
                contents: "The world says hello!",
                numLikes: 1,
                numDislikes: 0,
                createdDate: '2022-12-18T20:49:06.669+00:00'
            }
        },
        {
            id: 5,
            author: {name: "User Name", username: "u" },
            contents: "The world says hello!",
            numLikes: 1,
            numDislikes: 0,
            createdDate: '2022-12-18T20:49:06.669+00:00'
        }
    ]
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
            <h2 className='profile-page-content__posts-header'>
                Posts
            </h2>
            <div className='profile-page-content__posts'>
                {
                    profile.posts.map(
                        post => <Post post={post}></Post>
                    )
                }
            </div>
        </div>
    );
}

export default ProfilePageContent;
