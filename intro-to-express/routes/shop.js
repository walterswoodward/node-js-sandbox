const express = require('express');

const router = express.Router();

// note that with router.get -- the first param is an exact matched route path
router.get('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>');
})

module.exports = router;