import React, { Component } from "react";
import img1 from "../assets/img/1.jpg";
import Washerman from './Washerman'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import "../User/assets/css/User.css";
import { useState, useEffect } from "react";


export class Start extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        {/* <img src={img1} alt="5" className="object-cover w-full h-full" /> */}
        <section >
    <div className="container-fluid nav_bg">
      <div className="row">
        <div className="col-10 mx-auto">
          <div className="center">
            {/* <h1>Hello World!</h1> */}
             <div >
             
              
             <img src={img1} className="center" alt="washerman"/>
             </div>
  <Link to= "/washerman" >
  <button class="button-20" role="button" >I'm Washerman</button>
    </Link>        

    <Link to= "/user" >
  <button class="button-20" role="button" >I'm Client</button>
    </Link>




   
          </div>
        </div>
      </div>
    </div>
    </section>
      </div>
    );
  }
}

export default Start;
