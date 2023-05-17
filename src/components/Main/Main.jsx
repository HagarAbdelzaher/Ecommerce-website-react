import React from "react";
import Navbar from "../Navbar/Navbar";
import Categories from "../Categories/Categories";
import ProductSection from "../ProductSection/ProductSection";
//import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      
      <Categories></Categories>
      <ProductSection></ProductSection>
      {/* <ProductSection></ProductSection>
      <Footer></Footer>  */}
    </div>
  );
};

export default Main;