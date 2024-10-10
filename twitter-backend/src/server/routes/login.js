const express = require('express');
const { logIn } = require('../../services/user');
const { ExpressError } = require('../../utils/errors/expressErrors');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
    
        const loginResult = await logIn(username, password);
        res.status(200).json(loginResult);
    } catch (e) {
        return next(e);
    }
});

module.exports = router;