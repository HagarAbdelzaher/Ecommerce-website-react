import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import ProductCard from "./ProductCard";
import { fetchSingleCategory } from "../../features/slices/productsSlice";

const SingleCategory = () => {
  const category = useSelector((state) => state.products.singleCategory);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleCategory(id));
  }, [dispatch, id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="pt-16">
        <div className="pl-14">
          <h1 className="text-gray-600 text-4xl font-inter font-bold tracking-normal leading-none">
            {category?.name}
          </h1>
          <div className="grid grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl">
           
          {category?.products.map((product, index) => {
              return (
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;