import React, { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAction } from "../../redux/slices/cartSlices/cartAction";
import Cookies from "js-cookie";

const NavBar = ({ token }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const cartLength = useSelector((state) => state.cartStore.length);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartAction());
    }
  }, [dispatch, token]);

  // Auto close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <nav ref={sidebarRef} className="bg-black">
      <div className="flex items-center justify-between mx-10">
        <Link to="/">
          <img
            className="h-16 w-auto"
            src="/IMG/LOGO_copy.png"
            alt="Your Company"
          />
        </Link>
        <div className="flex gap-10 items-center">
          <div className="relative sm:block hidden">
            <input
              type="search"
              className="lg:p-2 p-0 xl:w-[30rem] lg:w-[20rem] w-[0rem] transition-all ease-in-out delay-75 rounded lg:pr-10 pr-0"
            />
            <Search className="absolute lg:text-black text-white lg:top-2 lg:right-2 top-0" />
          </div>
          <div className="flex gap-10">
            <div className="order-2 sm:order-1">
              {token ? (
                <>
                  <Menu
                    onClick={toggleMenu}
                    className="md:hidden flex"
                    color="#ffffff"
                  />
                  <div className="md:flex hidden gap-10">
                    <Link to="/profile" className="text-white">
                      Profile
                    </Link>
                    <Link to="/order" className="text-white">
                      Your Order
                    </Link>
                    <button className="text-white" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                  <div
                    className={`${
                      menuOpen
                        ? "absolute z-40 md:hidden text-sm flex flex-col top-14 right-10 w-[8rem] items-center bg-green-700 text-white rounded p-1"
                        : "hidden"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="text-center w-full hover:bg-gray-200 transition-all duration-500 ease-in-out p-2"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/order"
                      className="text-center w-full hover-bg-gray-200 hover:bg-gray-200 transition-all duration-500 ease-in-out p-2"
                    >
                      Your Order
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-center w-full hover:bg-gray-200 transition-all duration-500 ease-in-out p-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link to="/signin" className="text-white">
                  Login
                </Link>
              )}
            </div>
            <div className="order-1 sm:order-2">
              <Link to="/cart" className="relative text-white">
                {cartLength > 0 && (
                  <span className="absolute flex items-center justify-center -top-3 -right-3 bg-green-700 rounded-[100%] w-6 h-6 text-white">
                    {cartLength}
                  </span>
                )}
                <ShoppingCart />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
