/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../features/navbar/Navbar";
import { ProductList } from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import { useSelector } from "react-redux";
import { selectStatus } from "../features/product/productListSlice";

const Home = () => {
  const status = useSelector(selectStatus);
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      {/* <Footer /> */}
      {/* {status === "idle" && <Footer />} */}
    </div>
  );
};

export default Home;
