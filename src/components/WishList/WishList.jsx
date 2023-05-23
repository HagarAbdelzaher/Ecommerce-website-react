import { useEffect } from "react";
import "./wishlist.css";
import { useSelector, useDispatch } from "react-redux";
import interceptorInstance from "../../axios";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { setWishlist } from "../../features/slices/wishlistSlice";
import { setCart, editquantity } from "../../features/slices/cartSlice";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../Footer/Footer";

function WishList() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    interceptorInstance
      .get("users/wishlist")
      .then((response) => {
        console.log(response);
        dispatch(setWishlist(response.data[0].fav_items));
      })
      .catch((error) => console.log(error));
  }, []);

  const removeItem = (item) => {
    interceptorInstance
      .delete(`users/wishlist/items/${item.product.id}`)
      .then((response) => {
        dispatch(
          setWishlist(
            wishlist.filter((wishlist_item) => wishlist_item.id !== item.id)
          )
        );
      })
      .catch((error) => console.log(error));
    console.log(wishlist);
  };

  const addToCartHandler = (item) => {
    const existed = cart.findIndex(
      (cartItem) => cartItem.product.id === item.product.id
    );
    if (existed === -1) {
      interceptorInstance
        .post(`users/cart/items/${item.product.id}/add`, { quantity: 1 })
        .then((response) => dispatch(setCart([...cart, response.data])))
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
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
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
                              src={item.product.image}
                              alt={item.product.name}
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
                          <div className="flex flex-col justify-between ml-4  ">
                            {cart.find(
                              (selected_item) =>
                                selected_item.product.id === item.product.id
                            ) ? (
                              <Button
                                className=" shadow-sm bg-blue-600 text-white mx-2 my-2 md:my-1 w-2/3"
                                onClick={() => navigate("/cart")}
                              >
                                see purchase options &nbsp; &nbsp;
                                <i className="fa-solid fa-cart-plus text-white mx-2 my-2 md:my-1"></i>
                              </Button>
                            ) : (
                              <Button
                                className=" shadow-sm bg-blue-600 text-white mx-2 my-2 md:my-1"
                                onClick={() => addToCartHandler(item)}
                              >
                                Add to Cart &nbsp; &nbsp;
                                <i className="fa-solid fa-cart-plus text-white"></i>
                              </Button>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col justify-between ml-4 ">
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
              <div className="grid grid-cols-1 gap-4  lg:hidden mx-auto">
                {wishlist.map((item) => (
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
                        <div className="flex flex-col md:flex-row">
                          {cart.find(
                            (selected_item) =>
                              selected_item.product.id === item.product.id
                          ) ? (
                            <Button
                              className=" shadow-sm bg-blue-600 text-white mx-2 my-2 md:my-1 "
                              onClick={() => navigate("/cart")}
                            >
                              see purchase options &nbsp; &nbsp;
                              <i className="fa-solid fa-cart-plus text-white"></i>
                            </Button>
                          ) : (
                            <Button
                              className=" shadow-sm bg-blue-600 text-white mx-2 my-2 md:my-1 "
                              onClick={() => addToCartHandler(item)}
                            >
                              Add to Cart &nbsp; &nbsp;
                              <i className="fa-solid fa-cart-plus text-white"></i>
                            </Button>
                          )}

                          <Button
                            className="text-m bg-red-500  text-white lg:space-x-2 my-2 md:my-1"
                            onClick={() => removeItem(item)}
                          >
                            Remove &nbsp; &nbsp;
                            <i className="fa-solid fa-x text-white"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
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
            to="/"
            className="flex font-semibold text-indigo-600 text-lg mt-10"
          >
            <i className="fa-solid fa-arrow-left text-indigo-600 text-l pr-1 text-lg"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default WishList;
