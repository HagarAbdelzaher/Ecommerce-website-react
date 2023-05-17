import { useEffect, useState } from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Cart() {
  const user = useSelector((state) => state.user.user);
  const [cart, setCart] = useState([]);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const config = {
    withCredentials: true,
    headers: {
      Authorization: `token ${user.token}`,
    },
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/cart", config)
      .then((response) => {
        setCart(response.data[0].cart);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateQuantity = (quantity, itemId, action) => {
    const cartItem = cart.find((item) => item.id === itemId);
    axios
      .patch(
        `http://127.0.0.1:8000/users/cart/items/${cartItem.product.id}/${action}`,
        { quantity },
        config
      )
      .then((response) => {
        console.log(response.data);
        setCart(
          cart.map((item) => {
            if (item.id === itemId) item.quantity = response.data.quantity;
            return item;
          })
        );
      })
      .catch((error) => console.log(error));
    console.log(cart);
  };

  const removeItem = (productId) => {
    console.log(productId);
  };

  return (
    <div className="container mx-auto mt-10 bg-blue-200">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl uppercase">
              {cart.length}
              {cart.length > 1 ? " Items" : " Item"}
            </h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>
          {cart.map((item) => (
            <div
              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
              key={item.id}
            >
              <div className="flex w-2/5">
                <div className="w-20">
                  <img
                    className="h-24"
                    src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.product.name}</span>
                  <span className="text-red-500 text-xs">Zara</span>
                  <Link
                    to="/cart"
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    onClick={() => removeItem(item.product.id)}
                  >
                    Remove
                  </Link>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <i
                  className= { "fa-solid fa-plus text-light-green-500 text-lg pt-1 px-1 cursor-pointer" }
                  onClick={() => {
                    updateQuantity(1, item.id, "add");
                  }}
                ></i>
                <Select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(e, item.id, "edit")}
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
                  onClick={() => updateQuantity(1, item.product.id, "remove")}
                ></i>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.product.price}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.product.price * item.quantity}
              </span>
            </div>
          ))}

          <a
            href="#"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <i className="fa-solid fa-arrow-left text-indigo-600 text-l p-1"></i>
            Continue Shopping
          </a>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              {cart.length > 1 ? "Items" : "Item"} [{cart.length}]
            </span>
            <span className="font-semibold text-sm">{getTotalPrice()}$</span>
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
              <span>{getTotalPrice()+10}$</span>
            </div>
            <Button className="bg-blue-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
