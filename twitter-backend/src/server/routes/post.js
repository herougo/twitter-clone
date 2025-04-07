const express = require('express');
const DI_NAMES = require("../dependency-injection/names");
const requireLoggedIn = require('../middleware/requireLoggedIn');

const applyPostRouter = (app, diContainer) => {
    const router = express.Router();
    const postService = diContainer.resolve(DI_NAMES.postService);

    router.post('/post', async (req, res, next) => {
        try {
            const authorId = res.locals.user.id;
            const content = req.body.content;
            const replyToId = req.body.replyToId;
            const createResult = await postService.createPost({authorId, content, replyToId});
            res.status(201).json(createResult);
        } catch (e) {
            return next(e);
        }
    });

    router.post('/post/:postId/like', async (req, res, next) => {
        try {
            const loggedInUserId = res.locals.user.id;
            const postId = req.params.postId;
            await postService.like(loggedInUserId, postId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    router.post('/post/:postId/dislike', async (req, res, next) => {
        try {
            const loggedInUserId = res.locals.user.id;
            const postId = req.params.postId;
            await postService.dislike(loggedInUserId, postId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    router.delete('/post/:postId/like', async (req, res, next) => {
        try {
            const loggedInUserId = res.locals.user.id;
            const postId = req.params.postId;
            await postService.unlike(loggedInUserId, postId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    router.delete('/post/:postId/dislike', async (req, res, next) => {
        try {
            const loggedInUserId = res.locals.user.id;
            const postId = req.params.postId;
            await postService.undislike(loggedInUserId, postId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    router.get('/user/name/:username/post', async (req, res, next) => {
        try {
            const username = req.params.username;
            const loggedInUserId = res.locals.user.id;
            let result = await postService.getPosts(username, loggedInUserId);
            res.status(200).json(result);
        } catch (e) {
            return next(e);
        }
    });

    router.get('/post/feed', async (req, res, next) => {
        try {
            const loggedInUserId = res.locals.user.id;
            let result = await postService.getFullFeed(loggedInUserId);
            res.status(200).json(result);
        } catch (e) {
            return next(e);
        }
    });

    router.get('/post/:postId', async (req, res, next) => {
        try {
            const postId = req.params.postId;
            const loggedInUserId = res.locals.user.id;
            let result = await postService.getPost(postId, loggedInUserId);
            res.status(200).json(result);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/", requireLoggedIn, router);
}

module.exports = {
    applyPostRouter
};