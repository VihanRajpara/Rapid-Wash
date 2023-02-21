import React,{useEffect,useState} from "react";
import Footer from "../Components/Footer";
import requireAuth from "../utils/authWdash";
import Header from "../Components/Wheader";
import axios from "axios";
import { useLocation } from "react-router-dom";
function Wdashbord() {
  const location=useLocation();
  const [washerman,setwasherman]=useState(null);
  const [YearCount, setYearCount] = useState(0);
  const [MonthCount, setMonthCount] = useState(0);
  const [YearCost, setYearCost] = useState(0);

  useEffect(() => {
    // Query backend for count of orders placed in last year
    axios.post('http://localhost:5000/api/order/last-year-count')
      .then(response => setYearCount(response.data.count))
      .catch(error => console.log(error));

    axios.post('http://localhost:5000/api/order/last-month-count')
      .then(response => setMonthCount(response.data.count))
      .catch(error => console.log(error));

    axios.post('http://localhost:5000/api/order/last-year-done-cost')
      .then(response => setYearCost(response.data.totalCost))
      .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    if (location.state) {
      setwasherman(location.state.washerman);
      localStorage.setItem('washerman', JSON.stringify(location.state.washerman));
    } else {
      const userFromStorage = localStorage.getItem('washerman');
      if (userFromStorage) {
        setwasherman(JSON.parse(userFromStorage));
      }
    }
  }, [location.state]);
  console.log("this is from state",washerman);

  return (
  
    <>
      <div className="min-h-screen">
       <Header/>
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
                            Done order
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                            {YearCount}
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
                        <span className="whitespace-nowrap">
                          Since last year
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
                            Done Order
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                            {MonthCount}
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
                            Total Student
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                            {YearCost}
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                            <i className="fas fa-users"></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-400 mt-4">
                        <span className="text-orange-500 mr-2">
                          <i className="fas fa-arrow-down"></i> 1.10%
                        </span>
                        <span className="whitespace-nowrap">
                          Since last Year
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
                            Other
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                            20
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                            <i className="fas fa-percent"></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-400 mt-4">
                        <span className="text-emerald-500 mr-2">
                          <i className="fas fa-arrow-up"></i> 12%
                        </span>
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
  )
}

export default requireAuth(Wdashbord);