import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { fetchSingleProduct} from "../../features/slices/productsSlice";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../features/slices/cartSlice";
import { Button } from "@material-tailwind/react";
import { addToWishlist } from "../../features/slices/wishlistSlice";


const ProductCard = ({ id, name, description, image, price, quantity }) => {
  const dispatch = useDispatch();


  return (
    <Link to={`/products/` + id}>
      <div>
      <Card className="w-96 relative">
        <Typography
          variant="h4"
          className="mb-2 absolute -rotate-45 top-12 right-8 z-10 text-red-700"
        >
          SALE%
        </Typography>
        <CardHeader floated={false} className="h-96">
          <img src={image} alt={name} />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography color="gray" className="font-medium" textGradient>
            {description}
          </Typography>
          
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip content="Add to Cart" placement="bottom">
            <Button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: id,
                    image: image,
                   description:description,
                    amount: 1,
                    price: price,
                    totalPrice: price,
                    name: name,
              
                  })
                )
              }
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
              onClick={() =>
                dispatch(
                  addToWishlist({
                    id: id,
                    image: image,
                   description:description,
                 
                    price: price,
                   
                    name: name,
              
                  })
                )
              }
              size="lg"
              color="gray"
              variant="outlined"
              ripple={true}
            >
              Add to Wishlist
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  
    </Link>
  );
};

export default ProductCard;
