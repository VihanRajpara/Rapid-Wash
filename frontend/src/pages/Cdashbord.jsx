import React from "react";

import Footer from "../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Washcard from "../Components/Washcard";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";

function Cdashbord(props) {
  const location=useLocation();
  const [luser,setLuser]=useState();
  const [area,setArea]=useState("all");
  const navigate =useNavigate();
  const [washerman, setUsers] = useState([]);

  
  useEffect(() => {
    axios
  .get("http://localhost:5000/api/users/check", { withCredentials: true })
  .then((response) => {console.log("dash");
    if (response.data.message === "user not login"){navigate("/user")}
    else if(response.data.message === "user already login"){}
    });

    axios
    .get("http://localhost:5000/api/users/get", { withCredentials: true })
    .then((response) => {console.log("dash");
      if (response.data.message){
      setLuser(response.data.message);
      localStorage.setItem('user', JSON.stringify(location.state.user));
    }
      else if(!response.data.message){}
      });
  }, []);
  console.log("this is login user",luser);
 
  //Washerman Detail from Database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/washerman/all")
      .then((res) => {
        setUsers(res.data);
       
      })
      .catch((err) => console.log(err));
  }, []);


  

  return (
    <>
      <div className="min-h-screen">
       <Header user={luser}/>
       <header className="bg-black shadow">
          <div className="mx-auto text-center">
            <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600">
              Find best Option for you
  
            </h2>
          </div>
        </header>
        {/* <Navbar/> */}
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-3 px-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center space-x-10">
                <div className="w-100px">
                  <select
                    label="Select City"
                    id="area"
                    value={area}
                    onChange={(event)=>{
                      console.log(`${event.target.value}`);
                      setArea(event.target.value);
                    }}
                  >
                    <option value="all" selected>All</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="surat">Surat</option>
                    <option value="vadodara">Vadodara</option>
                    <option value="rajkot">Rajkot</option>
                    <option value="bhavnagar">Bhavnagar</option>
                    <option value="gandhinagar">Gandhinagar</option>
                  </select>
                </div>
                <button
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </header>
        <div>
          <div>
            <div className="min-h-screen from-red-300 to-yellow-200 flex justify-center items-center py-20">
              <div className="md:px-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 space-y-4 md:space-y-0">
                {washerman.map((user) => (
                  <Washcard key={user._id} user={user} luser={luser} />
                ))}
              </div>
          
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cdashbord;

