import React, { useCallback, useContext, useState } from 'react';
import UserContext from '../../../context/UserContext';
import { USER_INTERACTION } from '../../../utils/enums';
import like from '../services/like';
import unlike from '../services/unlike';
import dislike from '../services/dislike';
import undislike from '../services/undislike';


const routeChangeOnLike = (userInteraction) => {
    switch (userInteraction) {
        case USER_INTERACTION.like:
            return -1;
        case USER_INTERACTION.dislike:
            return 0;
        case USER_INTERACTION.empty:
            return 1;
        default:
            throw new Error("Unseen USER_INTERACTION");
    }
}

const routeChangeOnDislike = (userInteraction) => {
    switch (userInteraction) {
        case USER_INTERACTION.like:
            return 0;
        case USER_INTERACTION.dislike:
            return -1;
        case USER_INTERACTION.empty:
            return 1;
        default:
            throw new Error("Unseen USER_INTERACTION");
    }
}

const performLike = async ({userFromId, post, setPost}) => {
    const payload = {
        userFromId,
        postId: post.id
    }
    await like(payload);

    const newPost = JSON.parse(JSON.stringify(post));
    newPost.numLikes += 1;
    newPost.userInteraction = USER_INTERACTION.like;
    setPost(newPost);
}

const performUnlike = async ({userFromId, post, setPost}) => {
    const payload = {
        userFromId,
        postId: post.id
    }
    await unlike(payload);

    const newPost = JSON.parse(JSON.stringify(post));
    newPost.numLikes -= 1;
    newPost.userInteraction = USER_INTERACTION.empty;
    setPost(newPost);
}

const performDislike = async ({userFromId, post, setPost}) => {
    const payload = {
        userFromId,
        postId: post.id
    }
    await dislike(payload);

    const newPost = JSON.parse(JSON.stringify(post));
    newPost.numDislikes += 1;
    newPost.userInteraction = USER_INTERACTION.dislike;
    setPost(newPost);
}

const performUndislike = async ({userFromId, post, setPost}) => {
    const payload = {
        userFromId,
        postId: post.id
    }
    await undislike(payload);

    const newPost = JSON.parse(JSON.stringify(post));
    newPost.numDislikes -= 1;
    newPost.userInteraction = USER_INTERACTION.empty;
    setPost(newPost);
}


const useUserInteractionAxios = ({ post, setPost }) => {
    const {user, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const onLikeClicked = useCallback(async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const change = routeChangeOnLike(post.userInteraction);
        if (change !== 0) {
            try {
                if (change === 1) {
                    await performLike({ userFromId: user.id, post, setPost });
                } else if (change === -1) {
                    await performUnlike({ userFromId: user.id, post, setPost });
                }
            } catch (ex) {

            }
        }
        setLoading(false);
    }, [user, post]);

    const onDislikeClicked = useCallback(async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const change = routeChangeOnDislike(post.userInteraction);
        if (change !== 0) {
            try {
                if (change === 1) {
                    await performDislike({ userFromId: user.id, post, setPost });
                } else if (change === -1) {
                    await performUndislike({ userFromId: user.id, post, setPost });
                }
            } catch (ex) {

            }
        }
        setLoading(false);
    }, [user, post]);

    return { onLikeClicked, onDislikeClicked };
}

export default useUserInteractionAxios;
