import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import Details from "../Components/Wordertable";
import Header from "../Components/Wheader";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function Waorder() {
  const navigate=useNavigate();
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const washerman = JSON.parse(localStorage.getItem("washerman"));
  useEffect(() => {
    axios
    .get("http://localhost:5000/api/washerman/check", { withCredentials: true })
    .then((response) => {console.log("dash");
      if (response.data.message === "washerman not login"){navigate("/washerman");window.location.reload();}
      else if(response.data.message === "washerman already login"){navigate("/washerman/order/approve")}
      });
    axios
      .post("http://localhost:5000/api/order/req", { wemail:washerman.email,status: "Under Approval" })
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => console.log(err));
  }, []);




 
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <header className="bg-black shadow">
          <div className="mx-auto text-center">
            <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600">
              Under Approveal Order
            </h2>
          </div>
        </header>
        <div className="container">
          <div class="overflow-x-auto">
            <div>
              <div class="w-full">
                <div class="shadow-md rounded my-5">
                  <table class="min-w-max bg-white w-full table-auto">
                    <thead>
                      <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th class="py-3 px-6 text-left">Order ID</th>
                        <th class="py-3 px-6 text-left">User Name</th>
                        <th class="py-3 px-6 text-left">Total Pair</th>
                        <th class="py-3 px-6 text-left">Total Price</th>
                        <th class="py-3 px-6 text-left">Status</th>
                        <th class="py-3 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    {orders.map((order) => (
                      <Details order={order} />
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Waorder;
