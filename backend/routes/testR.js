const express = require("express");
const session = require("express-session");
const router = express.Router();
const Test = require("../model/test");

router.post('/login', (req, res) => {
    // authenticate user and create session
    res.cookie('vihan',req.session.id)
    req.session.user = { id: 12453, name: 'Johsdfn Doe' };
    res.send('Logged in successfully');
});
router.post('/sig', (req, res) => {
    // authenticate user and create session
    req.session.user = { id: 12453, name: 'Johsdfn Doe' };
    res.cookie('sessionid',req.session.id)
    res.send('Logged in successfully');
});
router.get('/protected', (req, res) => {
    // check if user is logged in and authorized to access resource
    if (req.session && req.session.user) {
        console.log("hii",req.session.user)
        res.send('Protected resource');
    } else {
        res.sendStatus(401);
    }
});
router.post('/logout', (req, res) => {
    // destroy session
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.clearCookie('sessionid');
    res.send('Logged out successfully');
});


module.exports = router;
