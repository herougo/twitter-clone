const express = require('express');
const DI_NAMES = require("../dependency-injection/names");

const applyPostRouter = (app, diContainer) => {
    const router = express.Router();
    const postService = diContainer.resolve(DI_NAMES.postService);

    router.post('/create', async (req, res, next) => {
        try {
            const authorId = req.body.authorId;
            const content = req.body.content;
            const replyToId = req.body.replyToId;
            const createResult = await postService.createPost({authorId, content, replyToId});
            res.status(201).json(createResult);
        } catch (e) {
            return next(e);
        }
    });

    router.post('/like', async (req, res, next) => {
        try {
            const userFromId = req.body.userFromId;
            const postId = req.body.postId;
            await postService.like(userFromId, postId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    router.post('/dislike', async (req, res, next) => {
        try {
            const userFromId = req.body.userFromId;
            const postId = req.body.postId;
            await postService.dislike(userFromId, postId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    router.post('/unlike', async (req, res, next) => {
        try {
            const userFromId = req.body.userFromId;
            const postId = req.body.postId;
            await postService.unlike(userFromId, postId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    router.post('/undislike', async (req, res, next) => {
        try {
            const userFromId = req.body.userFromId;
            const postId = req.body.postId;
            await postService.undislike(userFromId, postId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    router.get('/byUsername/:username', async (req, res, next) => {
        try {
            const username = req.params.username;
            const loggedInUserId = req.query.loggedInUserId;
            let result = await postService.getPosts(username, loggedInUserId);
            res.status(200).json(result);
        } catch (e) {
            return next(e);
        }
    });

    router.get('/:postId', async (req, res, next) => {
        try {
            const postId = req.params.postId;
            const loggedInUserId = req.query.loggedInUserId;
            let result = await postService.getPost(postId, loggedInUserId);
            res.status(200).json(result);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/post", router);
}

module.exports = {
    applyPostRouter
};