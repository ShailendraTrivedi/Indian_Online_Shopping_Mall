import React from "react";
import NotLoggedIn from "./NotLoggedIn";
import LoggedIn from "./LoggedIn";
const Cart = ({ token }) => {
  return (
    <>{token ? <LoggedIn token={token} /> : <NotLoggedIn token={token} />}</>
  );
};

export default Cart;
