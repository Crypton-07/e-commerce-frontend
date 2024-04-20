import React from "react";
import Navbar from "../features/navbar/Navbar";
import Order from "../features/orders/Order";

const CheckoutPage = () => {
  return (
    <div>
      <Navbar>
        <Order />
      </Navbar>
    </div>
  );
};

export default CheckoutPage;
