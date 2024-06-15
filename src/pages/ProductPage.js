import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/ProductDetails";
// import { useSelector } from "react-redux";
// import { selectStatus } from "../features/product/productListSlice";

const ProductPage = () => {
  // const status = useSelector(selectStatus);
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
      {/* {status === "idle" && <Footer />} */}
    </div>
  );
};

export default ProductPage;
