import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import requireAuthu from "../utils/authuser";
import "react-toastify/dist/ReactToastify.css";
import "../User/assets/css/User.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function User() {

  const [logemail, setEmail] = useState("");
  const [logpass, setPassword] = useState("");
  const [signame, setName] = useState("");
  const [sigemail, setSemail] = useState("");
  const [sigpass, setSpass] = useState("");
  const [sigadd, setAdd]=useState("");
  const[sigcon,setCon]=useState("");
  const[sigpin,setPin]=useState("");
  const [sessionExpiration, setSessionExpiration] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);


  // const [data, setData] = useState({ name: 'John', age: 30 });
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionExpiration && Date.now() > sessionExpiration) {
      localStorage.removeItem("isLoggedIn");
      setSessionExpiration(null);
    }
  }, [sessionExpiration]);

  const handlelogin = async (event) => {
    event.preventDefault();
    if (logemail === "" || logpass === "") {
      toast.error("Email and password fields are required");
    } else {
      // make a POST request to the login route on the back-end server

      await axios
        .post("http://localhost:5000/api/users/login", {
          email: logemail,
          password: logpass,
        })
        .then((response) => {
          if (response.data.message === "Successfully logged in") {
            localStorage.setItem("isLoggedIn", true);
            // localStorage.setItem('userDetail',response.data.user)
            setSessionExpiration(Date.now() + 3600000);
            navigate('/user/dashboard',{state:{user:response.data.user}})
            // window.location.href = "/user/dashboard";
          } else if (response.data.message === "Invalid Password") {
            toast.error("Invalid Password");
          } else if (response.data.message === "User not found") {
            toast.error("User not found");
          } else {
            console.log(response.data.message);
            toast.error("Email and Password fields are invalid");
          }
        });
    }
  };
  const handlesignup = async (Sevent) => {
    Sevent.preventDefault(); console.log("click")
    if (sigemail === "" || sigpass === "" || signame === "" ||sigadd===""||sigcon===""||sigpin==="") {
      toast.error("Email and password fields are required");
    } else {
      // make a POST request to the login route on the back-end server

      await axios
        .post("http://localhost:5000/api/users/signup", {
          username: signame,
          email: sigemail,
          password: sigpass,
          address:sigadd,
          contact:sigcon,
          pincode:sigpin,
        })
        .then((response) => {
           if (response.data.message === "User Already Exists") {
            toast.error("User Already Exists");
          }else if (response.data.message=== "Signup successful") {
           
            localStorage.setItem("isLoggedIn", true);
            // setSessionExpiration(Date.now() + 3600000)
            navigate('/user/dashboard' ,{state:{user:response.data.user}});
          }
        });
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  }
  const handleprev = () => {
    setCurrentStep(currentStep - 1);
  }

  return (
    <div>
      

      <div className="st.section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                  
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <div className="body">
                            <h4 className="mb-4 pb-3 text-2xl">User Log In</h4>
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              value={logemail}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              value={logpass}
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                         
                          <button
                            type="submit"
                            className="btn mt-4"
                            onClick={handlelogin}
                          >
                            submit
                          </button>
                       
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <div className="body">
                            <h4 className="mb-4 pb-3 text-2xl">User Sign Up</h4>
                          </div>
                          {currentStep === 1 && (<div>
                            <div className="form-group">
                            <input
                              type="text"
                              name="signame"
                              className="form-style"
                              placeholder="Your Full Name"
                              id="signame"
                              value={signame}
                              onChange={(Sevent) =>
                                setName(Sevent.target.value)
                              }
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="sigemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="sigemail"
                              value={sigemail}
                              onChange={(Sevent) =>
                                setSemail(Sevent.target.value)
                              }
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="sigpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="sigpass"
                              value={sigpass}
                              onChange={(Sevent) =>
                                setSpass(Sevent.target.value)
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            type="submit"
                            className="btn mt-4"
                            onClick={handleNext}
                          >
                            next
                          </button>
                          </div>
                          )}

                          {currentStep === 2 && (
                            <div>
                              <div className="form-group">
                            <input
                              type="text"
                              name="sigadd"
                              className="form-style"
                              placeholder="Your Address"
                              id="sigadd"
                              value={sigadd}
                              onChange={(Sevent) =>
                                setAdd(Sevent.target.value)
                              }
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="tel"
                              name="sigcon"
                              className="form-style"
                              placeholder="Enter Your Contact"
                              id="sigcon"
                              value={sigcon}
                              onChange={(Sevent) =>
                                setCon(Sevent.target.value)
                              }
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              name="sigpin"
                              className="form-style"
                              placeholder="Your Pincode"
                              id="sigpin"
                              value={sigpin}
                              onChange={(Sevent) =>
                                setPin(Sevent.target.value)
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            type="submit"
                            className="btn mt-4"
                            onClick={handleprev}
                          >
                            Previous
                          </button>
                          <button
                            type="submit"
                            className="btn mt-4"
                            onClick={handlesignup}
                          >
                            submit
                          </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default requireAuthu(User);
// export default User;
