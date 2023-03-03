import Reac, { useState, useEffect } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../assets/img/user.png"
export default function UserProfile() {
  const navigate=useNavigate();
  const [luser, setLuser] = useState("");
  const goback = () => {
   
    navigate("/user/dashboard");
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/get", { withCredentials: true })
      .then((response) => {
        if (response.data.message) {
          setLuser(response.data.message);
        } else if (!response.data.message) {
        }
      });
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    // navigate(-1);
    return <Navigate to="/" />;
  }
  // const img=user.img;
  return (
    <div>
      <div class="p-16">
        <div class="p-8 bg-white shadow mt-24">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p class="font-bold text-gray-700 text-xl">22</p>
                <p class="text-gray-400">Order</p>
              </div>
              <div>
                <p class="font-bold text-gray-700 text-xl">10</p>
                <p class="text-gray-400">Total Cost</p>
              </div>
              {/* <div>
                <p class="font-bold text-gray-700 text-xl">89</p>
                <p class="text-gray-400">Comments</p>
              </div> */}
            </div>
            <div class="relative">
              <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  className="h-48 w-48 rounded-full"
                  src={user.image||img}
                    // src={user.img}
                  alt=""
                />
              </div>
            </div>

            <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center"></div>
          </div>

          <div class="mt-20 text-center pb-12">
            <h1 class="text-4xl font-medium text-gray-700 uppercase">
              {luser.username} <span class="font-light text-gray-500"></span>
            </h1>
            <p class="font-light text-gray-600 mt-3 lowercase">{user.email}</p>

            <p class="mt-8 text-gray-500 uppercase">{luser.address}</p>
            <p class="mt-2 text-gray-500 uppercase">
              {user.city} - {user.pincode}
            </p>
            <p class="mt-2 text-gray-500 uppercase">
              {user.occ}
            </p>
          </div>
          <div className="content-center ">
          <button
                            className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md"
                          onClick={goback}
                          >
                            Go Back
                          </button>
                          </div>
        </div>
      </div>
    </div>
  );
}