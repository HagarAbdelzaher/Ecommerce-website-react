import React, { useState, useEffect } from "react";
import ProductCard from "../Filteredproducts/ProductCard";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/products/?page=${currentPage}`
      );
      setProducts(response.data.results);
      setTotalPages(response.data.total_pages);
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber.selected + 1);
  };

  return (
    <div>
      <div className="bg-black p-2 w-[50%] mx-auto rounded-md">
        <h2 className="text-red-600 text-center text-lg font-inter font-bold tracking-normal leading-none">
          SUMMER T-Shirt SALE 30%
        </h2>
      </div>
      <div className="grid grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl">
        {products.map((product,index) => {
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
      <div className="flex justify-center">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLinkClassName={"previous_page"}
          nextLinkClassName={"next_page"}
        />
      </div>
    </div>
  );
};

export default ProductSection;