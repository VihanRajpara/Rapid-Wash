const express = require("express");
const router = express.Router();
// const session = require("express-session");
const User = require("../model/user");
// const {protectUser}= require("../middleware/authUser");
const jwt = require("jsonwebtoken");

// Signup route
router.post("/signup", async (req, res) => {
  try {
   
    const { username, email, password ,address,contact,pincode} = req.body;
    const us = await User.findOne({ email });
    if (!us) {
      const user = new User({ username, email, password,address,contact,pincode });
      await user.save();
      res.status(200).json({ message: "Signup successful" ,user:user});
    }
    if (us) {
      res.json({ message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error);
    // res.status(500).send({ message: 'Error creating user', error });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.password !== password) {
      res.json({ message: "Invalid Password" });
    }else{
      const token = await user.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      // console.log(token);
      res.status(200).json({ message: "Successfully logged in" ,user:user});
     
    }
  } catch (error) {
    console.log(error);

  }
});


//logout
router.get('/logout', (req, res) => {
  // destroy session

    try {  
      res.clearCookie("jwtoken", { path: "/" });
      res.json({ message: "Logged out successfully"});
      // console.log("logout finish ",req.cookies);
    } catch (error) {
      console.log(error);
    }
});
router.get('/check',async (req, res) => {
  const token = req.cookies.jwtoken;
  // console.log("this is check",token)
  if (!token) {
    res.json({ message: "user not login"});
  }
  else{
    try{
    const verify_token = jwt.verify(
      token,
      process.env.JWT_SECRET);
      root_user = await User.findOne({
        _id: verify_token._id,
        token: token,
      }); 
      // console.log(root_user)
      if(root_user){res.json({ message: "user already login"});}
      else{res.json({ message: "user not login"});}
    }
    catch{}
    
    }
  

});

router.get('/get',async (req, res) => {
  const token = req.cookies.jwtoken;
  // console.log("this is check",token)
  if (!token) {
    res.json({ message: "user not login"});
  }
  else{
    try{
    const verify_token = jwt.verify(
      token,
      process.env.JWT_SECRET);
      root_user = await User.findOne({
        _id: verify_token._id,
        token: token,
      }); 
      // console.log(root_user)
      if(root_user){res.json({ message:root_user});}
      else{res.json({ message: "user not login"});}
    }
    catch{}
    
    }
  

});




module.exports = router;
