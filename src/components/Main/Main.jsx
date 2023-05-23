import React from "react";
import Navbar from "../Navbar/Navbar";
import Categories from "../Categories/Categories";
import ProductSection from "../ProductSection/ProductSection";
import Footer from "../Footer/Footer";
//import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div className="bg-gray-100">
      <Navbar></Navbar>

      <Categories></Categories>
      <ProductSection></ProductSection>
      {/* <ProductSection></ProductSection>
      <Footer></Footer>  */}
      <Footer></Footer>
    </div>
  );
};

export default Main;
