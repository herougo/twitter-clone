const express = require('express');
const { signUp } = require('../../services/user');
const { ExpressError } = require('../../utils/errors/expressErrors');
const { hashPassword } = require('../../utils/utils');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const user = req.body.user;
        const loginResult = await signUp(user);
        res.status(201).json(loginResult);
    } catch (e) {
        return next(e);
    }
});

module.exports = router;