import React, { useState } from "react";
import logo from "../../assets/images/logo2.jpg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/slices/authSlice";

import { Tooltip } from "@material-tailwind/react";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalwishlist = useSelector((state) => state.wishlist.totalAmount);
  const user = useSelector((state) => state.user.user);

  const { name } = user;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-red-700 p-4 w-full flex justify-center items-center rounded-md ">
        <p className="text-white font-inter text-2xl font-bold  ">
          Welcome to our store
        </p>
      </div>
      <div className="flex justify-around items-center bg-gray">
        <div>
          <Link
            to="/"
            className=" font-inter text-base font-medium tracking-normal leading-none text-center mr-2"
          >
            <img className="h-20 w-full" src={logo} alt="store"></img>
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <div
            className="flex flex-row items-center cursor-pointer p-5 hover:bg-black duration-300 ease-in-out hover:text-white rounded-md"
            onClick={handleOpen}
          >
            {totalwishlist > 0 ? (
              <span className="rounded-full bg-gray-300 px-2 font-inter text-sm mr-1">
                {totalwishlist}
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
            <Link
              to="/wishlist"
              className=" font-inter text-base font-medium tracking-normal leading-none text-center mr-2 "
            >
              Wish List
            </Link>
          </div>
          <div
            className="flex flex-row items-center cursor-pointer px-2  p-5 hover:bg-black duration-300 ease-in-out hover:text-white rounded-md"
            onClick={handleOpen}
          >
            {totalAmount > 0 ? (
              <span className="rounded-full bg-gray-300 px-2 font-inter text-sm mr-1">
                {totalAmount}
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            )}

            <Link
              to="/cart"
              className=" font-inter text-base font-medium tracking-normal leading-none text-center  px-2"
            >
              Cart
            </Link>
          </div>

          <div
            className="flex flex-row items-center cursor-pointer px-2 p-5 hover:bg-black duration-300 ease-in-out hover:text-white rounded-md"
            onClick={handleOpen}
          >
            <Link
              to={"/orders"}
              className=" font-inter text-base font-medium tracking-normal leading-none text-center mr-2"
            >
              My Orders
            </Link>
          </div>

          {!user.username ? (
            <div className="flex flex-row items-center cursor-pointer">
              <Link to={"/login"}>
                <p className="font-inter text-base font-medium tracking-normal leading-none text-center ">
                  Login
                </p>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-row items-center cursor-pointer p-5 hover:bg-black duration-300 ease-in-out hover:text-white rounded-md">
                <Link to={"/profile"}>
                  <p className="font-inter text-base font-medium tracking-normal leading-none text-center ">
                    Profile
                  </p>
                </Link>
              </div>
              <div className="flex flex-row items-center cursor-pointer pl-4 p-5 hover:bg-black duration-300 ease-in-out hover:text-white rounded-md">
                <div onClick={() => dispatch(logout())}>
                  <Tooltip content="Sign Out" placement="bottom">
                    <p className="font-inter text-sm font-meduim tracking-normal leading-none text-center">
                      Logout
                    </p>
                  </Tooltip>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-red-900 rounded-md p-4 w-full flex items-center justify-center mx-auto">
        <p className="text-white font-inter text-base font-medium ">
          Up to 50% OFF
        </p>
        <p className="text-white font-inter text-base font-medium mx-96">
          Free shipping and returns
        </p>
        <p className="text-white font-inter text-base font-medium ">
          Find all what you need
        </p>
      </div>
    </>
  );
};

export default Navbar;
