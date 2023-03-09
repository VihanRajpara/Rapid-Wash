import React from "react";
import img from "../assets/img/5jpg.jpg";
import { useNavigate } from "react-router-dom";

function Washcard({ user, luser }) {
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();
  const detail = () => {
    navigate("/user/order/book", { state: { luser: luser, washerman: user } });
  };

  return (
    <>
      <div class="max-w-xs overflow-hidden bg-white rounded-xl shadow-lg dark:bg-gray-800 transform hover:scale-105 transition duration-500">
        <div class="px-4 py-2">
          <h1 class="text-xl font-bold text-gray-800 uppercase dark:text-black">
            {user.shopname}
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400 truncate">
            {user.address}
          </p>
        </div>

        <img class="object-cover w-full h-48 mt-2" src={user.simage||img} alt="NIKE AIR" />

        <div class="flex items-center justify-between px-4 py-2 bg-gray-800">
          <h1 class="text-lg font-bold text-white">{user.city}</h1>
          <button
            class="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
            onClick={() => setShowModal(true)}
          >
            View
          </button>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    About {user.shopname}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <table class="table table-striped-columns">
                    <tbody>
                      <tr>
                        <th scope="row">Shop owner Name</th>
                        
                        <td>{user.username}</td>
                      </tr>
                      <tr>
                        <th scope="row">Contact</th>
                        <td>{user.contact}</td>
                    
                      </tr>
                      <tr>
                        <th scope="row">Shop Address</th>
                        <td>{user.address}</td>
                    
                      </tr>
                      <tr>
                        <th scope="row">Shop City</th>
                        <td>{user.city}</td>
                    
                      </tr>
                      <tr>
                        <th scope="row">Shop pincode</th>
                        <td>{user.pincode}</td>
                    
                      </tr>
                      <tr>
                        <th scope="row">&nbsp;Cost per pair</th>
                        <td><table>
                            <tr scope="row">
                              <td>Normal Wash : {user.cost}</td>
                              <td>Hard wash : {user.hw}</td>
                            </tr>
                            <tr scope="row">
                              <td>Only Dry Cleaning : {user.dc}</td>
                              <td>Only Iron : {user.oi}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" onClick={detail}>
                          Book
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

export default Washcard;
