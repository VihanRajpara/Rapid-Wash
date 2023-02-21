import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function OrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state.luser.username);
  const [contact, setContact] = useState(location.state.luser.contact);
  const [address, setAdd] = useState(location.state.luser.address);
  const [email, setEmail] = useState(location.state.luser.email);
  const [pincode, setPin] = useState(location.state.luser.pincode);
  const [cloth, setCloth] = useState("");
  const [city, setCity] = useState(location.state.washerman.city);
  const [luser, setLuser] = useState(null);
  const [washerman, setWasherman] = useState(null);
  const cost = location.state.washerman.cost;

  const Close = () => {
    navigate("/user/dashboard");
    localStorage.removeItem("luser");
    localStorage.removeItem("lwash");
  };

  //Login User Information from WashCard
  useEffect(() => {
    if (location.state) {
      setLuser(location.state.luser);
      setWasherman(location.state.washerman);
      localStorage.setItem("luser", JSON.stringify(location.state.luser));
      localStorage.setItem("lwash", JSON.stringify(location.state.washerman));
    } else {
      const userFromStorageu = localStorage.getItem("luser");
      const userFromStoragew = localStorage.getItem("lwash");
      if (userFromStorageu && userFromStoragew) {
        setLuser(JSON.parse(userFromStorageu));
        setWasherman(JSON.parse(userFromStoragew));
      }
    }
  }, [location.state]);
  // console.log("w d",washerman.shopname);
  //submit
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
        .post("http://localhost:5000/api/order/book", {
          username: name,
          contact: contact,
          uemail: email,
          wemail: washerman.email,
          shopname: washerman.shopname,
          address: address,
          city: city,
          pincode: pincode,
          cost: cost * cloth,
          pair: cloth,
        })
        .then((response) => {
          if (response.data.message === "Booked successful") {
            toast.success("Order Booked  (wailt a moment)");
            setTimeout(() => {
              navigate("/user/order/approve");
              localStorage.removeItem("luser");
              localStorage.removeItem("lwash");
            });
          } else {
            toast.error("Retry");
          }
        });
    }
  };

  return (
    <div>
      <div>
        <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div class="container max-w-screen-lg mx-auto">
            <div>
              <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div class="text-gray-600">
                    <p class="font-medium text-lg">Order Details</p>
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
                          onChange={(event) => setEmail(event.target.value)}
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
                          onChange={(event) => setCity(event.target.value)}
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
                          onChange={(event) => setPin(event.target.value)}
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
                            onClick={handleOrder}
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
    </div>
  );
}

export default OrderDetail;
