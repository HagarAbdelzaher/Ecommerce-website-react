import { useEffect, useState } from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import interceptorInstance from "../../axios";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  setCart,
  removeFromCart,
  editquantity,
} from "../../features/slices/cartSlice";
import Navbar from "../Navbar/Navbar";

function Cart() {
  const dispatch = useDispatch();
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [disableAdding, setDisableAdding] = useState(false);

  useEffect(() => {
    interceptorInstance
      .get("users/cart")
      .then((response) => {
        dispatch(setCart(response.data[0].cart));
      })
      .catch((error) => console.log(error));
  }, []);

  const updateQuantity = (quantity, item, action) => {
    const existed = cart.findIndex((cartItem) => item.id === cartItem.id);
    if (existed === -1) {
      interceptorInstance
        .post(`users/cart/items/${cart[existed].product.id}/${action}`, {
          quantity,
        })
        .then((response) => dispatch(setCart([...cart, response.data])))
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status >= 400) {
            if (error.response.data[0] === "product out of stock") {
              setDisableAdding(true);
            }
            toast.error(error.response.data[0] || "Wrong Credintials", {
              position: 'top-center',
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } else {
      interceptorInstance
        .patch(`users/cart/items/${cart[existed].product.id}/${action}`, {
          quantity,
        })
        .then((response) => {
          dispatch(
            editquantity({
              newQuantity: response.data.quantity,
              selected_item: item,
            })
          );
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status >= 400) {
            toast.error(error.response.data.error[0] || "Wrong Credintials", {
              position: "top-center",
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  };

  const removeItem = (selected_item) => {
    console.log(selected_item);
    interceptorInstance
      .delete(`users/cart/items/${selected_item.product.id}/remove`)
      .then((response) => dispatch(removeFromCart(selected_item)))
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status >= 400) {
          console.log(error.response.data);
          toast.error(error.response.data.error[0] || "Wrong Credintials", {
            position: 'top-center',
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mx-10 mt-20">
        <div className="flex mt-20">
          <div className="shadow-md px-2 w-full">
            <div className="flex justify-between border-b pb-8 px-5">
              <h1 className="font-semibold text-2xl">Cart</h1>
              <h2 className="font-semibold text-2xl uppercase">
                {totalAmount}
                {totalAmount > 1 ? " Items" : " Item"}
              </h2>
            </div>
            {totalAmount ? (
              <>
                <div className=" xs:hidden lg:flex">
                  <table className="w-full">
                    <thead>
                      <th className="pt-4 text-center col-span-5">Product</th>
                      <th className="pt-4 text-center col-span-3">Quantity</th>
                      <th className="pt-4 text-center col-span-2">Price</th>
                      <th className="pt-4 text-center col-span-2">
                        Total Price
                      </th>
                    </thead>
                    <tbody className="py-6">
                      {cart.map((item) => (
                        <tr key={item.id} className="my-10 text-center py-5">
                          <td className="flex items-center col-span-4">
                            <div className="p-5">
                              <img
                                className="h-40"
                                src={item.product.image}
                                alt={item.product.name}
                              />
                            </div>
                            <div className="flex flex-col justify-around">
                              <span className="font-bold text-xl">
                                {item.product.name}
                              </span>
                              <span className="text-red-500 text-sm">Zara</span>
                              <Link
                                to="/cart"
                                className="font-semibold hover:text-red-500 text-gray-500 text-s space-y-3"
                                onClick={() => removeItem(item)}
                              >
                                Remove
                              </Link>
                            </div>
                          </td>
                          <td className="col-span-3">
                            <div className="flex justify-between ml-4 "> 
                              <i
                                className={
                                  disableAdding || item.quantity >= 15
                                    ? "fa-solid fa-plus text-gray-500 text-lg pt-1 px-2"
                                    : "fa-solid fa-plus text-light-green-500 text-lg pt-1 px-2 cursor-pointer"
                                }
                                onClick={() =>{ if(item.quantity >= 15) return ; updateQuantity(1, item, "add")}}
                              ></i>
                              <Select
                                className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-md rounded-lg focus:ring-blue-500 focus:border-blue-500
                             block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                               dark:focus:border-blue-500"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(e, item, "edit")
                                }
                              >
                                {quantities.map((quantity) => (
                                  <Option
                                    value={quantity}
                                    key={`${item.id}+${item.product.id}+${quantity}`}
                                    selected={ quantity === item.quantity }
                                  >
                                    {quantity}
                                  </Option>
                                ))}
                              </Select>
                              <i
                                className="fa-solid fa-minus text-red-900 text-lg pt-1 px-2 cursor-pointer"
                                onClick={() =>
                                  updateQuantity(1, item, "remove")
                                }
                              ></i>
                            </div>
                          <p className={disableAdding || item.quantity >= 15 ? 'block text-s text-deep-orange-900' : 'hidden'}> No more than 15 Items </p> 
                          </td>
                          <td className="col-span-2">
                            <span className="text-center w-1/5 font-semibold text-lg">
                              ${item.product.price}
                            </span>
                          </td>
                          <td className="col-span-2">
                            <span className="text-center w-1/5 font-semibold text-lg">
                              ${item.product.price * item.quantity}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:hidden">
                  {cart.map((item) => (
                    <div
                      className="bg-white shadow-md rounded-lg  hover:bg-gray-200 border-gray-400 my-2"
                      key={`${item.id}+${item.product.id}`}
                    >
                      <div className="flex xs:flex-col md:flex-row  justify-start py-10 text-lg">
                        <img
                          className="h-40"
                          src={item.product.image}
                          alt={item.product.name}
                        />
                        <div className="flex flex-col items-center space-y-5 mx-auto ">
                          <span className="font-bold">{item.product.name}</span>
                          <span className="text-red-500 ">Zara</span>
                          <div className="flex flex-row">
                            <i
                              className={
                                item.product.quantity
                                  ? "fa-solid fa-plus text-light-green-500 text-lg pt-1 px-2 cursor-pointer"
                                  : "fa-solid fa-plus text-gray-500 text-lg pt-1 px-2"
                              }
                              onClick={() => updateQuantity(1, item, "add")}
                            ></i>
                            <Select
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(e.targer.value, item, "edit")
                              }
                            >
                              {quantities.map((quantity) => (
                                <Option
                                  value={quantity}
                                  key={`${item.id}+${item.product.id}+${quantity}`}
                                >
                                  {quantity}
                                </Option>
                              ))}
                            </Select>
                            <i
                              className="fa-solid fa-minus text-red-900 text-lg pt-1 px-1 cursor-pointer"
                              onClick={() => updateQuantity(1, item, "remove")}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div id="summary" className=" pl-10 bg-blue-300 text-white">
                    <h1 className="font-semibold text-2xl border-b pb-8">
                      Order Summary
                    </h1>
                    <div className="flex justify-between mt-10 mb-5">
                      <span className="font-semibold text-sm uppercase">
                        {totalAmount > 1 ? "Items" : "Item"} [{totalAmount}]
                      </span>
                      <span className="font-semibold text-sm">
                        {totalPrice}$
                      </span>
                    </div>
                    <div>
                      <label className="font-medium inline-block mb-3 text-sm uppercase">
                        Shipping
                      </label>
                      <select className="block p-2 text-gray-600 w-full text-sm">
                        <option>Standard shipping - $10.00</option>
                      </select>
                    </div>
                    <div className="py-10">
                      <label
                        htmlFor="promo"
                        className="font-semibold inline-block mb-3 text-sm uppercase"
                      >
                        Promo Code
                      </label>
                      <Input
                        type="text"
                        id="promo"
                        placeholder="Enter your code"
                        className="p-2 text-sm w-full bg-white"
                      />
                    </div>
                    <Button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                      Apply
                    </Button>
                    <div className="border-t mt-8">
                      <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total cost</span>
                        <span>{totalPrice + 10}$</span>
                      </div>
                      <Button className="bg-blue-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                        Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className=" bg-white items-center p-10 ">
                <p className="text-center text-xl">No Thing In your Cart</p>
              </div>
            )}
          </div>
          <div id="summary" className=" pl-10 bg-gray-300  hidden lg:block">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {totalAmount > 1 ? "Items" : "Item"} [{totalAmount}]
              </span>
              <span className="font-semibold text-sm">{totalPrice}$</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <Input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full bg-white"
              />
            </div>
            <Button className="bg-gray-600 hover:bg-red-900 px-5 py-2 text-sm text-white uppercase">
              Apply
            </Button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>{totalPrice + 10}$</span>
              </div>
              <Button className="bg-gray-700 font-semibold hover:bg-green-700 py-3 text-sm text-white uppercase w-full">
                Checkout
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Link
            to="/"
            className="flex font-semibold text-gray-600 text-lg mt-10"
          >
            <i className="fa-solid fa-arrow-left text-gray-600 text-l pr-1 text-lg"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
export default Cart;
