const express = require("express");
const router = express.Router();
const Washerman = require("../model/washerman");

// Signup route
router.post("/signup", async (req, res) => {
    try {
      const { username, email, password ,address,city,pincode,shopname,contact,cost} = req.body;
      const us = await Washerman.findOne({ email });
      if (!us) {
        const user = new Washerman({ username, email, password ,address,city,pincode,shopname,contact,cost });
        await user.save();
        res.json({ message: "Signup successful",washerman:user });
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
      }else{
        res.status(200).json({ message: "Successfully logged in",washerman:user });
      }
        // if email and password match, log the user in and return a token
        // req.session.user=user.email;
        
       
        
  
    } catch (error) {
      console.log(error);
      // res.status(500).json({ message: 'Error while logging in' });
    }
  });

  router.get('/all', (req, res) => {
    Washerman.find({}, (err, users) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(users);
    });
});

module.exports = router;