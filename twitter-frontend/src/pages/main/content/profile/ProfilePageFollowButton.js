import React, { useCallback, useContext, useState } from 'react';
import UserContext from '../../../../context/UserContext';
import { follow, unfollow } from '../../../../features/user';
import useAxiosWrapper from '../../../../hooks/useAxiosWrapper';

const ProfilePageFollowButton = ({profileData}) => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const {axiosWithHeader} = useAxiosWrapper();

    const btnText = profileData.value.isFollowing ? 'Following' : 'Follow';
    const onClick = useCallback(
        async () => {
            if (loading) {
                return;
            }
            try {
                setLoading(true);
                const newValue = JSON.parse(JSON.stringify(profileData.value));
                if (profileData.value.isFollowing) {
                    await unfollow({
                        axiosFunction: axiosWithHeader,
                        payload: {followerId: user.id, userId: profileData.value.id}
                    });
                    newValue.numFollowers -= 1;
                } else {
                    await follow({
                        axiosFunction: axiosWithHeader,
                        payload: {followerId: user.id, userId: profileData.value.id}
                    });
                    newValue.numFollowers += 1;
                }
                newValue.isFollowing = !newValue.isFollowing;
                profileData.setValue(newValue);
            } catch (ex) {

            }
            setLoading(false);
        }
    );

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
