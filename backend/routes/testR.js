const express = require("express");
const router = express.Router();
const Test = require("../model/test");

router.post('/login', (req, res) => {
    // authenticate user and create session
    req.session.user = { id: 123, name: 'John Doe' };
    res.send('Logged in successfully');
});
router.get('/protected', (req, res) => {
    // check if user is logged in and authorized to access resource
    if (req.session && req.session.user) {
        res.send('Protected resource');
    } else {
        res.sendStatus(401);
    }
});
router.post('/logout', (req, res) => {
    // destroy session
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send('Logged out successfully');
});


module.exports = router;
