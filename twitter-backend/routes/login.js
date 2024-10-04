const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // TODO
    const username = req.body.username;
    const passwordHash = req.body.passwordHash;
    res.status(200).json({username, passwordHash});
});

module.exports = router;