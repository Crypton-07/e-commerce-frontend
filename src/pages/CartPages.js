import React from "react";
import { Cart } from "../features/cart/Cart";
import Navbar from "../features/navbar/Navbar";

const CartPages = () => {
  return (
    <>
      <Navbar>
        <Cart />
      </Navbar>
    </>
  );
};

export default CartPages;
