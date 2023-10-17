import React from "react";

const UPI = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="">
          <img src="QR_CODE.jpg" alt="" className="h-[14rem] w-[14rem]" />
          <span className="text-sm flex justify-center">
            Scan to pay with any UPI app
          </span>
        </div>
        <div className="flex gap-2">
          <span>UPI Id:</span>
          <div>shailendratrivedi009@okicici</div>
        </div>
      </div>
    </>
  );
};

export default UPI;
