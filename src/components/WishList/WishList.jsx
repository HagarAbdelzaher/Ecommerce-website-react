import { useEffect, useState } from "react";
import "./wishlist.css";
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

function WishList() {
  const user = useSelector((state) => state.user.user);
  const [wishlist, setWishlist] = useState([]);
  const config = {
    withCredentials: true,
    headers: {
      Authorization: `token ${user.token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/wishlist", config)
      .then((response) => {
        setWishlist(response.data[0].fav_items);
      })
      .catch((error) => console.log(error));
  }, []);

  const removeItem = (item) => {
    console.log(item.product.id);
    axios
      .delete(
        `http://127.0.0.1:8000/users/wishlist/items/${item.product.id}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        setWishlist(wishlist.filter((item) => item.id !== item.id));
      })
      .catch((error) => console.log(error));
    console.log(wishlist);
  };

  const addToCart = (item) => {
    console.log(item);
    axios
      .post(
        `http://127.0.0.1:8000/users/cart/items/${item.product.id}/add}`,
        { quantity: 1 },
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="md:shadow-md justify-center px-2 ">
        <div className="flex justify-between border-b pb-8 px-5">
          <h1 className="font-semibold text-2xl">Wish List</h1>
          <h2 className="font-semibold text-2xl uppercase">
            {wishlist.length}
            {wishlist.length > 1 ? " Items" : " Item"}
          </h2>
        </div>
        {wishlist.length ? (
          <>
            <div className="hidden lg:block">
              <table className="w-11/12">
                <tbody className="py-6">
                  {wishlist.map((item) => (
                    <tr key={item.id} className="my-10 text-center py-5">
                      <td className="flex items-center">
                        <div className="p-5">
                          <img
                            className="h-40"
                            src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between  flex-grow">
                          <span className="font-bold text-lg">
                            {item.product.name}
                          </span>
                          <span className="text-red-500 text-m">Zara</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-between ml-4  w-1/2 ">
                          <Button
                            className=" shadow-sm bg-blue-600 text-white"
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart &nbsp; &nbsp;
                            <i className="fa-solid fa-cart-plus text-white"></i>
                          </Button>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col justify-between ml-4  w-1/2">
                          <Button
                            className=" bg-red-500  text-white"
                            onClick={() => removeItem(item)}
                          >
                            Remove &nbsp; &nbsp;
                            <i className="fa-solid fa-x text-white"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 gap-4  lg:hidden">
              {wishlist.map((item) => (
                <>
                  <div className="bg-white shadow-md rounded-lg  hover:bg-gray-200 border-gray-400 my-2">
                    <div className="flex xs:flex-col md:flex-row  justify-start py-10 text-lg">
                      <img
                        className="h-40"
                        src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                        alt=""
                      />
                      <div className="flex flex-col items-center space-y-5 mx-auto ">
                        <span className="font-bold">{item.product.name}</span>
                        <span className="text-red-500 ">Zara</span>
                        <div className="flex flex-row">
                          <Button
                            className="text-m shadow-sm bg-blue-600 text-white mr-10"
                            onClick={() => addToCart(item)}
                          >
                            Add to Cart &nbsp; &nbsp;
                            <i className="fa-solid fa-cart-plus text-white"></i>
                          </Button>
                          <Button
                            className="text-m bg-red-500  text-white space-x-2"
                            onClick={() => removeItem(item)}
                          >
                            Remove &nbsp; &nbsp;
                            <i className="fa-solid fa-x text-white"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          <div className=" bg-white items-center p-10 ">
            <p className="text-center text-xl">No Thing In your wish List</p>
          </div>
        )}
      </div>
      <div>
        <Link
          to="/home"
          className="flex font-semibold text-indigo-600 text-lg mt-10"
        >
          <i className="fa-solid fa-arrow-left text-indigo-600 text-l pr-1 text-lg"></i>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
export default WishList;
