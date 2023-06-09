import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../features/slices/productsSlice";
import { Link, useNavigate } from "react-router-dom";

import interceptorInstance from "../../axios";
import { Button } from "@material-tailwind/react";
import { setCart, editquantity } from "../../features/slices/cartSlice";
import { setWishlist } from "../../features/slices/wishlistSlice";

const ProductCard = ({ id, name, description, image, price, quantity }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    if (!user.username) {
      navigate("/login");
      return;
    }
    const existed = cart.findIndex((cartItem) => cartItem.product.id === id);
    if (existed === -1) {
      interceptorInstance
        .post(`users/cart/items/${id}/add`, { quantity: 1 })
        .then((response) => dispatch(setCart([...cart, response.data])))
        .catch((error) => console.log(error));
    } else {
      interceptorInstance
        .patch(`users/cart/items/${id}/add`, { quantity: 1 })
        .then((response) => {
          console.log(response.data.quantity);
          dispatch(
            editquantity({
              newQuantity: response.data.quantity,
              selected_item: cart[existed],
            })
          );
        })
        .catch((error) => console.log(error));
    }
  };

  const addToWishlist = () => {
    if (!user.username) {
      navigate("/login");
      return;
    }
    const existed = wishlist.findIndex((item) => item.product.id === id);
    if (existed === -1) {
      interceptorInstance
        .post(`users/wishlist/items/${id}`)
        .then((response) => {
          dispatch(setWishlist([...wishlist, response.data]));
        })
        .catch((error) => console.log(error));
    } else return;
  };

  return (
    <div>
      <Card className="w-96">
        <Typography
          variant="h4"
          className="mb-2 absolute -rotate-45 top-12 right-8 z-10 text-red-700"
        >
          SALE%
        </Typography>
        <Link to={`/products/` + id}>
          <CardHeader floated={false} className="h-96 ">
            <img src={image} alt={name} />
          </CardHeader>

          <CardBody className="text-center h-48 ">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {name}
            </Typography>
            <Typography color="gray" className="font-medium" textGradient>
              {description}
            </Typography>
            <Typography variant="h4" color="red" className="mb-2">
              {price}
            </Typography>
          </CardBody>
        </Link>

        <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip content="Add to Cart" placement="bottom">
            <Button
              onClick={addToCartHandler}
              size="lg"
              color="gray"
              variant="outlined"
              ripple={true}
            >
              Add to Cart
            </Button>
          </Tooltip>
          <Tooltip content="Add to Wishlist" placement="bottom">
            <Button
              onClick={() => addToWishlist(id)}
              size="lg"
              ripple={true}
              className="bg-red-900"
            >
              Add to Wishlist
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
