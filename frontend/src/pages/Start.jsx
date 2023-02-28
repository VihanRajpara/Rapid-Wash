import React from "react";
import img1 from "../assets/img/homepic.png";
import Washerman from './Washerman'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import "../User/assets/css/User.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Start(){
const navigate=useNavigate();
  axios
  .get("http://localhost:5000/api/users/check", { withCredentials: true })
  .then((response) => {console.log("dash");
    if (response.data.message === "user not login"){}
    else if(response.data.message === "user already login"){navigate("/user/dashboard")}
    });
    axios
      .get("http://localhost:5000/api/washerman/check", { withCredentials: true })
      .then((response) => {
        console.log("dash");
        if (response.data.message === "washerman not login") {
       
        } else if (response.data.message === "washerman already login") {navigate("/washerman/dashboard")}
      });

    return (
      <div>
        

        {/* <img src={img1} alt="5" className="object-cover w-full h-full" /> */}
        <section >
    <div className="container-fluid nav_bg">
      <div className="row">
        <div className="col-10 mx-auto">
          <div className="center">
          <Link to= "/washerman" >
  <button class="button-20 bg-blue-500" role="button" >I'm Washerman</button>
    </Link>        

    <Link to= "/user" >
  <button class="button-20 bg-blue-500" role="button" >I'm Client</button>
    </Link>
    
            {/* <h1>Hello World!</h1> */}
             <div >
             
              
             <img src={img1} className="center" alt="washerman"/>
             </div>
  
   
          </div>
        </div>
      </div>
    </div>
    </section>
      </div>
    );
  }


export default Start;
