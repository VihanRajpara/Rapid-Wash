import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Wheader from "../Components/Wheader";
import axios from "axios";
import { redirect, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Wdashbord() {
  const navigate = useNavigate();
  // const location = useLocation();
  const [washerman, setwasherman] = useState([]);
  const [totalcount, setTotalCount] = useState(0);
  const [totalMcount, setTotalMCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalMCost, setTotalMCost] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/washerman/check", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("dash");
        if (response.data.message === "washerman not login") {
          navigate("/washerman");
        } else if (response.data.message === "washerman already login") {
          navigate("/washerman/dashboard");
        }
      });

    axios
      .get("http://localhost:5000/api/washerman/getwash", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("dash");
        if (response.data.message) {
          setwasherman(response.data.message);
        } else {
          navigate("/washerman");
        }
      });
  }, []);
  axios
    .post("http://localhost:5000/api/order/dashorderdetail", {
      email: washerman.email,
    })
    .then((response) => {
      setTotalCount(response.data.count);
      setTotalMCount(response.data.mcount);
      setTotalCost(response.data.totalCost);
      setTotalMCost(response.data.totalMCost);
      // console.log("count", response.data.totalMCost);
    });

    axios
    .post("http://localhost:5000/api/order/orderdetailuemail", {
      email: washerman.email,
    })
    .then((response) => {
      console.log(response.data.response)
    });
  console.log("this is from state", washerman);

  return (
    <>
      <div className="min-h-screen">
        <Wheader washerman={washerman} />
        <header className="bg-black shadow">
          <div className="mx-auto text-center">
            <h2 className="font-medium leading-tight py-2 text-4xl mt-0 mb-2 text-blue-600">
              Washerman Dashboard
            </h2>
          </div>
        </header>

        <div className="bg-blue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                            Total order
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                            {totalcount}
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                            <i className="far fa-chart-bar"></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-400 mt-4">
                        {/* <span className="text-emerald-500 mr-2">
                          <i className="fas fa-arrow-up"></i> 3.48%
                        </span> */}
                        <span className="whitespace-nowrap">All Time</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                            Total Earing
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                          ₹ {totalCost}
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                            <i className="fas fa-chart-pie"></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-400 mt-4">
                        {/* <span className="text-red-500 mr-2">
                          <i className="fas fa-arrow-down"></i> 3.48%
                        </span> */}
                        <span className="whitespace-nowrap">All Time</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                            Total Earing
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                          ₹ {totalMCost}
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                            <i className="fas fa-users"></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-400 mt-4">
                        
                        <span className="whitespace-nowrap">
                          Since last Month
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                            Total Order
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                            {totalMcount}
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                            <i className="fas fa-percent"></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-400 mt-4">
                        <span className="whitespace-nowrap">
                          Since last month
                        </span>
                      </p>
                    </div>
                  </div>
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

export default Wdashbord;
