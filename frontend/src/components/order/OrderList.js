import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderAction } from "../../redux/slices/orderSlices/orderAction";
const OrderList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orderStore.data);
  useEffect(() => {
    dispatch(fetchOrderAction());
  }, [dispatch]);
  const formatPrice = (amount) => {
    return `Rs ${amount.toLocaleString("en-IN")}`;
  };

  const getStatus = (status) => {
    switch (status) {
      case "pending":
        return { label: "Pending", color: "text-red-700" };
      case "shipped":
        return { label: "Shipped", color: "text-blue-700" };
      case "delivered":
        return { label: "Delivered", color: "text-green-700" };
      default:
        return {};
    }
  };
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="text-5xl font-bold p-10">Order</div>
          <div className="flex justify-center w-full p-10">
            <div className="grid md:grid-cols-2 gap-3 ">
              {data && data.length > 0 ? (
                data.map((item, i) => {
                  const { label, color } = getStatus(item.productStatus);
                  return (
                    <div
                      key={i}
                      className="grid sm:grid-cols-2 grid-cols-1 p-2 bg-gray-100 "
                    >
                      <img
                        src={item.productImg}
                        alt=""
                        className="mx-auto h-[15rem] w-[30rem] object-contain"
                      />
                      <div className="flex flex-col gap-2 p-2">
                        <div className="font-bold text-2xl">
                          {item.productName.slice(0, 60)}
                        </div>
                        <div className="grid grid-cols-2 w-full text-xl">
                          <div>Quantity:</div>
                          <div>{item.productQuantity}</div>
                          <div>Total Price:</div>
                          <div>
                            {formatPrice(
                              parseInt(item.productPrice * item.productQuantity)
                            )}
                          </div>
                          <div>Status:</div>
                          <div className={`${color}`}>{label}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-2xl font-bold">No Order Yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
