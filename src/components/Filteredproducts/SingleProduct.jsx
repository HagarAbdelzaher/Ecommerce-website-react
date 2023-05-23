import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../features/slices/productsSlice";
import interceptorInstance from "../../axios";
import { setCart } from "../../features/slices/cartSlice";
import { setWishlist } from "../../features/slices/wishlistSlice";
import Navbar from "../Navbar/Navbar";
import { fetchSingleCategory } from "../../features/slices/productsSlice";
import ProductCard from "./ProductCard";
import Footer from "../Footer/Footer";

const SingleProduct = () => {
  const product = useSelector((state) => state.products.singleProduct);
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const category = useSelector((state) => state.products.singleCategory);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    dispatch(fetchSingleCategory(product.category_id));
    console.log(category);
  }, [dispatch, id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = (productId) => {
    if (!user.username) {
      console.log("HERE");
      navigate("/login");
      return;
    }
    const existed = cart.findIndex(
      (cartItem) => cartItem.product.id === productId
    );
    if (existed === -1) {
      interceptorInstance
        .post(`users/cart/items/${productId}/add`, {
          quantity: 1,
        })
        .then((response) => dispatch(setCart([...cart, response.data])))
        .catch((error) => console.log(error));
    } else {
      interceptorInstance
        .patch(`users/cart/items/${cart[existed].product.id}/add`, {
          quantity: 1,
        })
        .then((response) => {
          cart[existed].quantity = response.data.quantity;
          dispatch(setCart([...cart]));
        })
        .catch((error) => console.log(error));
    }
  };

  const addToWishlist = (productId) => {
    if (!user.username) {
      navigate("/login");
      return;
    }
    const existed = wishlist.findIndex((item) => item.product.id === productId);
    if (existed === -1) {
      interceptorInstance
        .post(`users/wishlist/items/${productId}`)
        .then((response) => {
          dispatch(setWishlist([...wishlist, response.data]));
        })
        .catch((error) => console.log(error));
    } else return;
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center py-10 ">
        <div className="pl-44  ">
          <img
            className="h-[400px] rounded-lg"
            src={product.image}
            alt={product.name}
          ></img>
        </div>
        <div className="grow-[3]">
          <div className="max-w-lg  bg-gray-100 h-400 p-20 rounded-lg ">
            <h5 className="text-2xl font-inter font-bold tracking-normal leading-none pb-4">
              {product.name}
            </h5>
            <p className="text-orange-700 text-xl font-inter font-bold tracking-normal leading-none pb-4">
              15% OFF
            </p>
            <p className="text-gray-600 text-xl font-inter font-bold tracking-normal leading-none pb-4">
              {product.description}
            </p>
            <p className="text-red-600 text-xl font-inter font-bold tracking-normal leading-none pb-4">
              {product.price}
            </p>

            <Tooltip content="Add to Cart" placement="bottom">
              <Button
                color="gray"
                size="lg"
                variant="outlined"
                ripple={true}
                className="mr-2"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
              </Button>
            </Tooltip>
            <Tooltip content="Add to Wishlist" placement="bottom">
              <Button
                color="gray"
                size="lg"
                variant="outlined"
                ripple={true}
                className="bg-red-900 text-white"
                onClick={() => addToWishlist(product.id)}
              >
                Add to Wishlist
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div>
        <div className="">
          <div className="pt-16">
            <div className="pl-14">
              <h1 className="text-gray-600 text-4xl font-inter font-bold tracking-normal leading-none">
                Related Products
              </h1>
              <div className="grid grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl">
                {category?.products.map((product, index) => {
                  return product.id != id ? (
                    <div key={index}>
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                        quantity={product.quantity}
                      ></ProductCard>
                    </div>
                  ) : (
                    <></>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
