import React from "react";
import SignUp from "./components/sign_up/SignUp";
import Login from "./components/login/Login";
// import ProductList from "./components/product_list/ProductList";
import ProductCategory from "./components/product_category/ProductCategory";
import NavBar from "./components/navbar/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/home_page/HomePage";
import Cart from "./components/cart/Cart";
import OrderList from "./components/order/OrderList";
import Profile from "./components/profile/Profile";
// import Search from "./components/search/Search";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import EmailVerification from "./components/otp/EmailVerification";
import OTPVerification from "./components/otp/OTPVerification";
import UpdatePassword from "./components/otp/UpdatePassword";
import { REACT_APP_SERVER } from "./constant";

const App = () => {
  console.log(REACT_APP_SERVER);
  const token =
    useSelector((state) => state.userStore.token) || Cookies.get("token");
  return (
    <>
      <NavBar token={token} />
      <div className="min-h-screen">
        <Routes>
          <Route path="/order" element={<OrderList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyEmail" element={<EmailVerification />} />
          <Route path="/verifyOTP" element={<OTPVerification />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/categories/:category"
            element={<ProductCategory token={token} />}
          />
          <Route path="/cart" element={<Cart token={token} />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
