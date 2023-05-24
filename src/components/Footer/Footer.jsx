import React from "react";
import favicon from "../../assets/images/favicon.ico";

import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-100 rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img src={favicon} className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              E-Store
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/orders" className="mr-4 hover:underline md:mr-6 ">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="mr-4 hover:underline md:mr-6">
                Lists
              </Link>
            </li>
            <li>
              <Link to="/cart" className="mr-4 hover:underline md:mr-6 ">
                Cart
              </Link>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link to="/" className="hover:underline">
            E-Store™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
