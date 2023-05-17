import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import { addToCart } from "../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../features/slices/productsSlice";
import { addToWishlist } from "../../features/slices/wishlistSlice";





const SingleProduct = () => {
  const product = useSelector((state) => state.products.singleProduct);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return <div>Loading...</div>;
  }


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
                  
                  <Tooltip content="Add to Cart" placement="bottom">
                    <Button
                      color="gray"
                      size="lg"
                      variant="outlined"
                      ripple={true}
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: product.id,
                            name: product.name,
                            image: product.image,
                            description: product.description,
                            price: product.price,
                            amount: 1,
                            totalPrice: product.price,
                        
                          })
                        )
                      }
                  
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
                      onClick={() =>
                        dispatch(
                          addToWishlist({
                            id: product.id,
                            name: product.name,
                            image: product.image,
                            description: product.description,
                            price: product.price,
                      
                        
                          })
                        )
                      }
                  
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
