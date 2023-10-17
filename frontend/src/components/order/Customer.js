import React from "react";

const Customer = () => {
  return (
    <>
      <div class="fixed right-0 top-0 -z-10 w-96 flex flex-col justify-end items-center p-2 py-auto gap-2 h-full ">
        <div class="flex flex-col w-full gap-2 bg-white">
          <div class="flex flex-col ">
            <div class="flex w-full px-5 items-center py-4 border-b border-gray-200 gap-5">
              <img className="h-14 w-14" src="/IMG/USER.avif" alt="avatar" />
              <div class="flex justify-start flex-col space-y-2">
                Shialendra Trivedi
              </div>
            </div>

            <div class="flex p-2 border-b-2  px-10">
              <img
                class=""
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                alt="email"
              />
              <p class="cursor-pointer text-sm leading-5 ">david89@gmail.com</p>
            </div>
          </div>
          <div class="flex flex-col justify-between p-2 w-full gap-4">
            <div className="flex flex-col gap-5">
              <span className="font-bold">Shipping Address</span>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consectetur, aperiam!
              </span>
            </div>
            <div class="flex w-full items-center md:justify-start md">
              <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                Edit Details
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center p-2 w-full bg-gray-50 dark:bg-gray-800 gap-4">
          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            Shipping
          </h3>
          <div class="flex justify-between w-full">
            <div class="flex justify-center items-center space-x-4">
              <div class="w-8 h-8">
                <img
                  class="w-full h-full"
                  alt="logo"
                  src="https://i.ibb.co/L8KSdNQ/image-3.png"
                />
              </div>
              <div class="flex flex-col justify-start items-center">
                <p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                  DPD Delivery
                  <br />
                  <span class="font-normal">Delivery with 24 Hours</span>
                </p>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-center items-center">
            <button class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
