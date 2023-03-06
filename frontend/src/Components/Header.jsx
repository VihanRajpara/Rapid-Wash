import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import img from "../assets/img/user.png"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/img/2d.png"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



function Header(props) {
  const user=props.user;
  console.log("this is cheader",user.email)
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get("http://localhost:5000/api/users/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "Logged out successfully") {
          localStorage.clear();
          navigate("/user");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <Disclosure as="nav" className="bg-black shadow">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="-ml-2 mr-2 flex items-center md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                      {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                      <NavLink
                        to="/user/dashboard"
                        className="border-transparent text-white hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/user/order/approve"
                        className="border-transparent text-white hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Approval Order
                      </NavLink>
                      <NavLink
                        to="/user/order/pending"
                        className="border-transparent text-white hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Processing Order
                      </NavLink>
                      <NavLink
                        to="/user/order/done"
                        className="border-transparent text-white hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Done Order
                      </NavLink>
                      <NavLink
                        to="/aboutus"
                        className="border-transparent text-white hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        About Us
                      </NavLink>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                      <button
                        type="button"
                        className="bg-black p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.image||img}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <p className="bg-gray-100 block px-4 py-2 text-sm text-blue-500 truncate">
                                {user.email}
                              </p>
                            </Menu.Item>
                            <Menu.Item>
                              <NavLink
                                to="/user/profile "
                               
                              >
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    My Profile
                                  </a>
                                )}
                              </NavLink>
                            </Menu.Item>
                            <Menu.Item>
                            <NavLink
                                to="/user/editprofile"
                              >
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Edit Profile
                                </a>
                              )}
                              </NavLink>
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={logout}
                                >
                                  Sign out
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                  <NavLink to="/user/dashboard"
                      className=" text-white hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                    >
                      Home
                    
                  </NavLink>
                  <NavLink to="/user/order/approve"
                      className=" text-white hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                    >
                      Approval Order
                    
                  </NavLink>
                  <NavLink to="/user/order/pending"
                      className=" text-white hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                    >
                      Processing Order
                  
                  </NavLink>
                  <NavLink to="/user/order/done"
                      className=" text-white hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                    >
                      Done Order
                   
                  </NavLink>
                  <NavLink to="/aboutus"
                      className=" text-white hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
                    >
                      About Us
                    
                  </NavLink>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.image||img}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-blue-500">
                        {user.username}
                      </div>
                      <div className="text-sm font-medium text-blue-500">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 bg-black p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    <NavLink
                      to="/user/profile"
                      className="block px-4 py-2 text-base font-medium text-white hover:text-gray-700 sm:px-6"
                    >
                      Your Profile
                    </NavLink>
                    <NavLink
                        to="/user/editprofile"
                        className="block px-4 py-2 text-base font-medium text-white hover:text-gray-700 sm:px-6"
                      >
                        Edit Profile
                      
                    </NavLink>
                    <NavLink
                      className="block px-4 py-2 text-base font-medium text-white hover:text-gray-700 sm:px-6"
                      onClick={logout}
                    >
                      Sign out
                    </NavLink>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
export default Header;
