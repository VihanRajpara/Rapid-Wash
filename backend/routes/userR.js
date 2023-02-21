const express = require("express");
const router = express.Router();
const User = require("../model/user");
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
      res.status(200).json({ message: "Successfully logged in" ,user:user});
    }
    
      
    
  } catch (error) {
    console.log(error);

  }
});



module.exports = router;
