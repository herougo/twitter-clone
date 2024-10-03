const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // TODO
    res.status(200).json({"username": "hello"});
});

module.exports = router;