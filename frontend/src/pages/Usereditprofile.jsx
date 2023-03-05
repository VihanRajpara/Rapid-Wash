import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Usereditprofile() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [luser, setLuser] = useState();
  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [address, setAdd] = useState();
  const [pincode, setPin] = useState();
  const [occupation, setOcc] = useState();
  const [postImage, setPostImage] = useState();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log("my image", base64);
    setPostImage(base64);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/get", { withCredentials: true })
      .then((response) => {
        if (response.data.message) {
          setLuser(response.data.message);
          setName(response.data.message.username);
          setContact(response.data.message.contact);
          setEmail(response.data.message.email);
          setCity(response.data.message.city);
          setAdd(response.data.message.address);
          setPin(response.data.message.pincode);
          setOcc(response.data.message.occ);
          setId(response.data.message._id);
        } else if (!response.data.message) {
        }
      });
  }, []);
  console.log("luser from edit", luser);

  const handleedit = async (event) => {
    console.log("under update");
    event.preventDefault();
    await axios
      .post("http://localhost:5000/api/users/update", {
        _id: id,
        username: name,
        pincode: pincode,
        city: city,
        occ: occupation,
        contact: contact,
        address: address,
        postImage: postImage,
      })
      .then((response) => {
        if (response.data.message === "edit user") {
          console.log("done update", response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/user/profile");
        }
      });
  };

  return (
    <div>
      <div>
        <div>
          
            <div class="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
              <div class="container max-w-screen-lg mx-auto">
                <div>
                  <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                      <div class="text-gray-600">
                        <p class="font-medium text-lg">Edit Profile Details</p>
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
                              onChange={(event) =>
                                setContact(event.target.value)
                              }
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
                              placeholder="Your City"
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
                              placeholder="Your zipcoe"
                              value={pincode}
                              onChange={(event) => setPin(event.target.value)}
                            />
                          </div>
                          <div class="md:col-span-2">
                            <label for="zipcode">Occupation</label>
                            <input
                              type="text"
                              name="occupation"
                              id="occupation"
                              class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder="Your occupation"
                              value={occupation}
                              onChange={(event) => setOcc(event.target.value)}
                            />
                          </div>
                          <div class="md:col-span-3">
                           
                            <label>Upload Profile Photo</label>
                            <input
                              class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent  dark:focus:bg-transparent"
                              type="file"
                              id="formFileMultiple"
                              onChange={(e) => handleFileUpload(e)}
                            />
                          </div>

                          <div class="md:col-span-5 text-right">
                            <div class="inline-flex items-end gap-2">
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={handleedit}
                              >
                                Submit
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={() => {
                                  navigate(-1);
                                }}
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
            
          </div>
     
      </div>
      <ToastContainer />
    </div>
  );
}

export default Usereditprofile;

// function convertToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//     fileReader.onerror = (error) => {
//       reject(error);
//     };
//   });
// }
function convertToBase64(file, maxWidth = 800, maxHeight = 600, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const img = new Image();
      img.src = fileReader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        let compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        while (compressedDataUrl.length / 1024 >= 95) {
          quality -= 0.05;
          compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(compressedDataUrl);
      };
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}


