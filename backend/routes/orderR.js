const express = require("express");
const router = express.Router();
const Order = require("../model/order");

router.post("/book", async (req, res) => {
    try {
      const { username, contact,uemail,wemail,shopname, address,city,pincode,cost,pair} = req.body;
      
        const order = new Order({ username, contact,uemail,wemail,shopname, address,city,pincode,cost,pair,status:"Under Approval" });
        // console.log("this is",shopname);
        await order.save();
        res.json({ message: "Booked successful" });
   
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
      console.log("this is"+_id)
      const result = await Order.findByIdAndDelete(_id);
     
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

  router.post('/last-year-count', async (req, res) => {
    const lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    await Order.countDocuments({ date: { $gte: lastYear }, status: "Done" })
      .then(count => res.json({ count }))
      .catch(error => res.status(500).json({ error }));
  });

  router.post('/last-month-count', async (req, res) => {
    const lastYear = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await Order.countDocuments({ date: { $gte: lastYear }, status: "Done" })
      .then(count => res.json({ count }))
      .catch(error => res.status(500).json({ error }));
  });

  router.post('/last-year-done-cost', async(req, res) => {
    const lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    await Order.aggregate([
      { $match: { date: { $gte: lastYear }, status: "Done" } },
      { $group: { _id: null, totalCost: { $sum: "$cost" } } }
    ])
      .then(result => res.json({ totalCost: result[0].totalCost }))
      .catch(error => res.status(500).json({ error }));
  });

module.exports = router;