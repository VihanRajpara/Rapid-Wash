const express = require("express");
const router = express.Router();
const Washerman = require("../model/washerman");
const jwt = require("jsonwebtoken");
// Signup route
router.post("/signup", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      address,
      city,
      pincode,
      shopname,
      contact,
      cost,
    } = req.body;
    const us = await Washerman.findOne({ email });
    if (!us) {
      const user = new Washerman({
        username,
        email,
        password,
        address,
        city,
        pincode,
        shopname,
        contact,
        cost,
      });
      await user.save();
      res.json({ message: "Signup successful", washerman: user });
    }
    if (us) {
      res.json({ message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Washerman.findOne({ email });
    if (!user) {
      res.json({ message: "User not found" });
    } else if (user.password !== password) {
      res.json({ message: "Invalid Password" });
    } else {
      const token = await user.generateAuthTokenwash();
      res.cookie("jwtokenwasherman", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });
      // console.log("token ",token)
      res.status(200).json({ message: "Successfully logged in", washerman: user });
    }
    // if email and password match, log the user in and return a token
    // req.session.user=user.email;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: 'Error while logging in' });
  }
});

router.get("/all", (req, res) => {
  Washerman.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(users);
  });
});

router.get('/logout', (req, res) => {
  // destroy session

    try {  
      res.clearCookie("jwtokenwasherman", { path: "/" });
      res.json({ message: "Logged out successfully"});
      // console.log("logout finish ",req.cookies);
    } catch (error) {
      console.log(error);
    }
});
router.get('/check', (req, res) => {
  const token = req.cookies.jwtokenwasherman;
  // console.log("this is check",token)
  if (!token) {
    res.json({ message: "washerman not login"});
  }
  else{
    
    res.json({ message: "washerman already login"});
  }

});

router.get('/getwash',async (req, res) => {
  const token = req.cookies.jwtokenwasherman;
  // console.log("this is get",token)
  if (!token) {
    // res.json({ message: "user not login"});
  }
  else{
    try{
    const verify_token = jwt.verify(
      token,
      process.env.JWT_SECRET);
      root_user = await Washerman.findOne({
        _id: verify_token._id,
        token: token,
      }); 
      // console.log(root_user)
      if(root_user){res.json({ message:root_user});}
      // else{res.json({ message: "user not login"});}
    }
    catch{}
    
    }
});


router.post('/update',async (req, res) => {
  try{
    const{_id,username,contact,pincode,address,shopname,city,cost,postImage,postsImage}=req.body;
    Washerman.findById(_id,(err,washerman)=>{
      washerman.username=username;
      washerman.contact=contact;
      washerman.pincode=pincode;
      washerman.address=address;
      washerman.shopname=shopname;
      washerman.city=city;
      washerman.cost=cost;
      if(postImage){
        washerman.image=postImage;
      }if(postsImage){
        washerman.simage=postsImage;
      }
      
      washerman.save();
      res.json({ message: "edit washerman" ,washerman:washerman});
    })
  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;
