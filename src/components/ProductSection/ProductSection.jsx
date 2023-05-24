import React, { useState, useEffect } from "react";
import ProductCard from "../Filteredproducts/ProductCard";
import axios from "axios";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://127.0.0.1:8000/products/");
      setProducts(response.data.results);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="bg-red-300 p-2 w-[50%] mx-auto rounded-md">
        <h2 className="text-white text-center text-lg font-inter font-bold tracking-normal leading-none">
          Trending Products
        </h2>
      </div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl">
        {products.map((product, index) => {
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
  );
};

export default ProductSection;
