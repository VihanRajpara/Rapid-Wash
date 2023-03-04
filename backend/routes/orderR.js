const express = require("express");
const router = express.Router();
const Order = require("../model/order");

router.post("/book", async (req, res) => {
    try {
      const { username, contact,uemail,wemail,shopname, address,city,pincode,cost,pair,costp} = req.body;
      
        const order = new Order({ username, contact,uemail,wemail,shopname, address,city,pincode,cost,pair,status:"Under Approval" ,costp});
        // console.log("this is",shopname);
        await order.save();
        res.json({ message: "Booked successful" });
   
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/edit", async (req, res) => {
    try {
      const { _id,username, contact,uemail,wemail,shopname, address,city,pincode,cost,pair} = req.body;
      
      Order.findById(_id, (err, order) => {
        if (err) return res.status(500).send(err);
        order.username=username;
        order.contact=contact;
        order.uemail=uemail;
        order.wemail=wemail;
        order.shopname=shopname;
        order.address=address;
        order.city=city;
        order.pincode=pincode;
        order.cost=cost;
        order.pair=pair;
       order.save();
       res.json({ message: "edit successful" });
      });
   
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/req", async (req, res) => {
    try {
      const { wemail,status} = req.body;
  
      const orders = await Order.find({wemail,status });
      if(!orders){
        res.json({message:"no Order"});
      }
      else{
        
        res.json({ message: "Order Detail",orders:orders});
      }
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/detail", async (req, res) => {
    try {
      const { uemail,status} = req.body;
  
      const orders = await Order.find({uemail,status });
      if(!orders){
        res.json({message:"no Order"});
      }
      else{
        
        res.json({ message: "Order Detail",orders:orders});
      }
    } catch (error) {
      console.log(error);
    }
  });


  router.post("/status", async (req, res) => {
    try {
      const {_id} = req.body;
  
     Order.findById(_id, (err, order) => {
        if (err) return res.status(500).send(err);
    
        if (order.status === 'Under Approval') {
          order.status = 'Processing';   
        } else if (order.status === 'Processing') {
          order.status = 'Done';
        }
    
        order.save((err, orders) => {
          if (err) return res.status(500).send(err);
          res.send(orders);
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/delete', async (req, res) => {
    try {
      const{_id}  = req.body;
      // console.log("this is"+_id)
      const result = await Order.findByIdAndDelete(_id);
     
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });


module.exports = router;