import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Minus } from "lucide-react";
import Model from "./model/Model";
import {
  decrementAction,
  deleteCartAction,
  fetchCartAction,
  incrementAction,
} from "../../redux/slices/cartSlices/cartAction";

const LoggedIn = ({ token }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartStore.data);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartAction());
    }
  }, [dispatch, token]);

  const handleRemoveItem = (productId) => {
    dispatch(deleteCartAction({ productId: productId }));
  };

  const handleIncrement = (productId, productQuantity) => {
    if (productQuantity < 10) {
      dispatch(incrementAction({ productId: productId }));
    }
  };

  const handleDecrement = (productId, productQuantity) => {
    if (productQuantity > 1) {
      dispatch(decrementAction({ productId: productId }));
    }
  };

  const formatPrice = (amount) => {
    if (!amount) return amount;
    return `Rs ${amount.toLocaleString("en-IN")}`;
  };

  let subTotal = 0;
  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      const itemTotal = parseInt(item.productPrice) * item.productQuantity;
      subTotal += itemTotal;
    });
  }

  let shippingCharge = subTotal === 0 ? 0 : subTotal >= 1000 ? 0 : 50;
  const tax = subTotal * 0.05;
  const orderTotal = subTotal + shippingCharge + tax;

  const [open, setOpen] = useState(false);

  const handlePopUp = () => {
    if (cartItems.length > 0) {
      setOpen(!open);
    } else {
      alert("Please add items to the cart");
    }
  };

  return (
    <>
      {open && (
        <Model handlePopUp={handlePopUp} data={cartItems} total={orderTotal} />
      )}
      <div className="relative flex flex-col sm:p-10 p-2 bg-loginBG">
        <div className="text-4xl font-semibold">Shopping Cart</div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <div className="col-span-2 flex flex-col sm:p-5 p-2 gap-5 bg-white sm:m-5 m-2 order-2 sm:order-1">
            {cartItems && cartItems.length > 0 ? (
              <>
                {cartItems.map((item, i) => {
                  const {
                    _id,
                    productImg,
                    productPrice,
                    productName,
                    productQuantity,
                  } = item;
                  return (
                    <div
                      key={i}
                      className="grid sm:grid-cols-3 bg-gray-100 p-2 rounded sm:h-[16rem] w-full"
                    >
                      <img
                        src={productImg}
                        alt="Product illustration"
                        className="mx-auto h-[15rem] w-[15rem] object-contain"
                      />

                      <div className="sm:col-span-2 grid grid-cols-4 w-full p-2 gap-2 items-center">
                        <div>Name</div>
                        <div className="col-span-3">{productName}</div>
                        <div>Price</div>
                        <div className="col-span-3">
                          {formatPrice(productPrice)}
                        </div>
                        <div>Quantity</div>
                        <div className="flex col-span-3 items-center sm:mx-0 mx-auto">
                          <span className="flex gap-2 border-2 rounded-lg">
                            <Plus
                              onClick={() =>
                                handleIncrement(_id, productQuantity)
                              }
                            />
                            <span className="border-r-2 border-l-2 px-4">
                              {productQuantity}
                            </span>
                            <Minus
                              onClick={() =>
                                handleDecrement(_id, productQuantity)
                              }
                            />
                          </span>
                        </div>
                        <div>Total Price</div>
                        <div className="col-span-3 flex sm:flex-row flex-col justify-between">
                          <div className="text-center font-bold text-xl">
                            {formatPrice(productPrice * productQuantity)}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(_id)}
                            className="bg-red-700 p-2 text-white w-[10rem]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  Cart Empty !!!
                  <img src="/IMG/missingcartlog.png" alt="" />
                </div>
              </>
            )}
          </div>

          <div className="h- rounded-xl  m-2 order-1 sm:order-2">
            <div className="flex flex-col sm:p-10 p-2 gap-5 bg-gray-100">
              <div className="text-xl font-bold">Order Summary</div>
              <div className="flex justify-between border-b-2 border-gray-200 p-2">
                <span>Subtotal</span>
                <span>{formatPrice(parseInt(subTotal))}</span>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 p-2">
                <span>Shipping estimate </span>
                <span>{formatPrice(parseInt(shippingCharge))}</span>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 p-2">
                <span>Tax estimate</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex font-bold text-md justify-between">
                <span>Order Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
              <button
                onClick={handlePopUp}
                className="bg-green-700 text-white p-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggedIn;
