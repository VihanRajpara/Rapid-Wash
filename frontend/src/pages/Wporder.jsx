import React,{useState,useEffect} from "react";
import Footer from "../Components/Footer";
// import requireAuth from "../utils/authWdash";
import Details from "../Components/Wordertable";
import Header from "../Components/Wheader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Wporder() {
  const navigate=useNavigate();
  const [orders, setOrders] = useState([]);
  const [washerman, setwasherman] = useState([]);
  // const washerman = JSON.parse(localStorage.getItem("washerman"));
  useEffect(() => {
    axios
    .get("http://localhost:5000/api/washerman/check", { withCredentials: true })
    .then((response) => {console.log("dash");
      if (response.data.message === "washerman not login"){navigate("/washerman");window.location.reload();}
      else if(response.data.message === "washerman already login"){navigate("/washerman/order/pending")}
      });

      axios
      .get("http://localhost:5000/api/washerman/getwash", { withCredentials: true })
      .then((response) => {
        console.log("dash");
        if (response.data.message) {
          setwasherman(response.data.message);
          axios
      .post("http://localhost:5000/api/order/req", {wemail:response.data.message.email, status:"Processing" })
      .then((res) => {
        setOrders(res.data.orders);
       
      })
      .catch((err) => console.log(err));
        } else{
          navigate("/washerman");
        }
      });
     
    
  
  }, []);

  return (
  
    <>
      <div className="min-h-screen">
       <Header washerman={washerman} />
       <header className="bg-black shadow">
          <div className="mx-auto text-center">
            <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600">
              Under Process Order
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
  )
}

export default Wporder;