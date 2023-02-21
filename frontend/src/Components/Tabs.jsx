import React from 'react'
import { useState } from 'react'
import InputText from './InputText';

export default function Tabs() {

    const [toggleState, setToggleState] = useState(1);
  

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className='min-h-[80vh] flex my-16 mx-1 sm:mx-6 shadow-2xl border-t border-blue-600'>
            <div className="container flex flex-col relative min-h-[40vh]">
                <div className="bloc-tabs flex border-b border-[#bec2cb]">
                    <button className={toggleState === 1 ? "tabs active-tabs w-[50%] p-[15px] bg-blue-600 text-white rounded flex flex-col justify-center items-center sm:flex-row" : "tabs w-[50%] cursor-pointer p-[15px] flex flex-col  justify-center items-center sm:flex-row"} onClick={() => toggleTab(1)}>
                        <i className='bx bx-user-plus sm:pr-2 text-2xl'></i>
                        <p>Personal</p>
                    </button>
                    <button className={toggleState === 2 ? "tabs active-tabs w-[50%] p-[15px] bg-blue-600 text-white rounded flex flex-col justify-center items-center sm:flex-row" : "tabs text-center w-[50%] cursor-pointer p-[15px] flex flex-col justify-center items-center sm:flex-row"} onClick={() => toggleTab(2)}>
                        <i className='bx bx-book-add sm:pr-2 text-2xl' ></i>
                        <p>Academic</p>
                    </button>
                    <button className={toggleState === 3 ? "tabs active-tabs w-[50%] p-[15px] bg-blue-600 text-white rounded flex flex-col justify-center items-center sm:flex-row" : "tabs p-[15px] text-center w-[50%] cursor-pointer flex flex-col justify-center items-center sm:flex-row"} onClick={() => toggleTab(3)}>
                        <i class='bx bx-add-to-queue sm:pr-2 text-2xl' ></i>
                        <p>Resume</p>
                    </button>
                </div>

                <div className="content-tabs flex grow">
                    <div className={toggleState === 1 ? "content  active-content bg-white p-[20px] w-[100%] h-[100%] block " : "content bg-white p-[20px] w-[100%] h-[100%] hidden"}>
                        <h2 className='p-[5px] text-2xl text-blue-600'>Fill up the Personal Information</h2>
                        <hr />
                        
                        <form action="#" className='my-8 sm:mx-8 flex flex-col'>
                            <div className='w-[100%] grid gap-x-6 gap-y-16 sm:grid-cols-2'>
                                <InputText placeholderVal="Enter Your First Name" />
                                <InputText placeholderVal="Enter Your Last Name" />
                                <InputText placeholderVal="Enter Your Email Address" />
                                <InputText placeholderVal="Enter Your Phone Number" />
                                <InputText placeholderVal="Enter Your Permanent Address" />
                                <InputText placeholderVal="Enter Your Gender" />
                            </div>
                            <input type='submit' className='my-12 px-5 py-3 border border-blue-600 hover:bg-blue-50 hover:shadow-inner cursor-pointer rounded-lg' />
                        </form>
                    </div>

                    <div className={toggleState === 2 ? "content  active-content bg-white p-[20px] w-[100%] h-[100%] block" : "content bg-white p-[20px] w-[100%] h-[100%] hidden"}>
                        <h2 className='p-[5px] text-2xl text-blue-600'>Fill up the Academic Information</h2>
                        <hr />
                        
                        <form action="#" className='my-8 sm:mx-8 flex flex-col'>
                            <div className='w-[100%] grid gap-x-6 gap-y-16 sm:grid-cols-2'>
                                <InputText placeholderVal="Enter Your Enrollment ID" />
                                <InputText placeholderVal="Enter Your Enrollment Year" />
                                <InputText placeholderVal="Enter Your 10th Percentage" />
                                <InputText placeholderVal="Enter Your 12th / Diploma Percentage" />
                                <InputText placeholderVal="Enter Your CPI" />
                                <InputText placeholderVal="Enter Your Current SPI" />
                            </div>
                            <input type='submit' className='my-12 px-5 py-3 border border-blue-600 hover:bg-blue-50 hover:shadow-inner cursor-pointer rounded-lg' />
                        </form>
                    </div>

                    <div className={toggleState === 3 ? "content  active-content bg-white p-[20px] w-[100%] h-[100%] block" : "content bg-white p-[20px] w-[100%] h-[100%] hidden"}>
                        <h2 className='p-[5px] text-2xl text-blue-600'>Upload your Resume</h2>
                        <hr />
                        
                        <form action="#" className='my-8'>
                            <div class="flex items-center justify-center w-full">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">PDF or WORD (MAX. 10KB)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" class="hidden" />
                                </label>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
