import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../features/slices/productsSlice";
import interceptorInstance from "../../axios";
import { setCart } from "../../features/slices/cartSlice";
import { setWishlist } from "../../features/slices/wishlistSlice";

const SingleProduct = () => {
  const product = useSelector((state) => state.products.singleProduct);
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
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
    <div className="flex justify-center items-center py-10">
      <div className="pl-44 grow-[2]">
        <img
          className="h-[850px] rounded-lg"
          src={product.image}
          alt={product.name}
        ></img>
      </div>
      <div className="grow-[3]">
        <div className="max-w-lg">
          <h5 className="text-2xl font-inter font-bold tracking-normal leading-none pb-4">
            {product.name}
          </h5>
          <p className="text-orange-700 text-xl font-inter font-bold tracking-normal leading-none pb-4">
            15% OFF
          </p>
          <p className="text-gray-600 text-xl font-inter font-bold tracking-normal leading-none pb-4">
            {product.description}
          </p>
          <p className="text-gray-600 text-xl font-inter font-bold tracking-normal leading-none pb-4">
            {product.price}
          </p>

          <Tooltip content="Add to Cart" placement="bottom">
            <Button
              color="gray"
              size="lg"
              variant="outlined"
              ripple={true}
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
              onClick={() => addToWishlist(product.id)}
            >
              Add to Wishlist
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
