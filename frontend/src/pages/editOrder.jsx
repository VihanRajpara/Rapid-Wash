import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function OrderDetail() {
  const [showSubmit, setShowsubmit] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state.order.username);
  const [contact, setContact] = useState(location.state.order.contact);
  const [address, setAdd] = useState(location.state.order.address);
  const [email, setEmail] = useState(location.state.order.uemail);
  const [pincode, setPin] = useState(location.state.order.pincode);
  const [cloth, setCloth] = useState(location.state.order.pair);
  const [city, setCity] = useState(location.state.order.city);
  const [wemail, setWemail] = useState(location.state.order.wemail);
  const [shopname, setshopname] = useState(location.state.order.shopname);
  // const coost = (location.state.order.cost/location.state.order.pair);
  axios
  .get("http://localhost:5000/api/users/check", { withCredentials: true })
  .then((response) => {console.log("dash");
    if (response.data.message === "user not login"){navigate("/user")}
    else if(response.data.message === "user already login"){}
    });
  // console.log(coost);
  const Close = () => {
    navigate(-1);
  };
  const handleOrder = async (Sevent) => {
    Sevent.preventDefault();
    if (
      name === "" ||
      contact === "" ||
      address === "" ||
      city === "" ||
      email === "" ||
      pincode === "" ||
      cloth === ""
    ) {
      toast.error("Fields are required");
    } else {
      await axios
        .post("http://localhost:5000/api/order/edit", {
          _id:location.state.order._id,
          username: name,
          contact: contact,
          uemail: email,
          wemail: wemail,
          shopname: shopname,
          address: address,
          city: city,
          pincode:pincode,
          cost: (location.state.order.cost/location.state.order.pair) * cloth,
          pair:cloth,
        })
        .then((response) => {
          if (response.data.message === "edit successful") {
            toast.success("Order Booked  (wailt a moment)");
            // window.location.reload();
              navigate("/user/order/approve");
          } else {
            toast.error("Retry");
          }
        });
    }
  };

  return (
    <>
      <div>
        <div class="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
          <div class="container max-w-screen-lg mx-auto">
            <div>
              <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div class="text-gray-600">
                    <p class="font-medium text-lg">Edit Order Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div class="md:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div class="md:col-span-3">
                        <label for="name">Full Name</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="contact">Contact</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={contact}
                          placeholder=""
                          onChange={(event) => setContact(event.target.value)}
                        />
                      </div>

                      <div class="md:col-span-5">
                        <label for="email">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={email}
                          placeholder="email@domain.com"
                          // onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>

                      <div class="md:col-span-3">
                        <label for="address">Address / Street</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={address}
                          placeholder="Plese give full Address"
                          onChange={(event) => setAdd(event.target.value)}
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="city">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={city}
                          placeholder=""
                          // onChange={(event) => setCity(event.target.value)}
                        />
                      </div>

                      <div class="md:col-span-2">
                        <label for="zipcode">Zipcode</label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                          value={pincode}
                          // onChange={(event) => setPin(event.target.value)}
                        />
                      </div>
                      <div class="md:col-span-3">
                        <label for="soda">How many Pair?</label>
                        <div class="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="number"
                            name="cloth"
                            id="cloth"
                            placeholder="0"
                            class="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"
                            value={cloth}
                            onChange={(event) => setCloth(event.target.value)}
                          />
                        </div>
                      </div>

                      <div class="md:col-span-5 text-right">
                        <div class="inline-flex items-end gap-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                            onClick={() => setShowsubmit(true)}
                          >
                            Submit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                            onClick={Close}
                          >
                            Close
                          </button>
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
      {showSubmit ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div class="w-full md:w-1/3 mx-auto">
              <div class="flex flex-col p-4 rounded-lg shadow bg-white">
                <div class="flex">
                  <div>
                  <svg class="w-6 h-6 fill-current text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                  </div>

                  <div class="ml-3">
                    <h2 class="font-semibold text-gray-800">
                      Book Your Order
                    </h2>
                    <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                      Are You Sure?
                    </p>
                  </div>
                </div>

                <div class="flex justify-end items-center mt-3">
                  <button
                    class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-md"
                    onClick={() => setShowsubmit(false)}
                  >
                    Cancel
                  </button>

                  <button
                    class="px-4 py-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                    onClick={handleOrder}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default OrderDetail;
