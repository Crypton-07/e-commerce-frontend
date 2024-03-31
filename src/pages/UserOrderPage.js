import React from "react";
import UserOrder from "../features/users/components/UserOrder";
import Navbar from "../features/navbar/Navbar";

const UserOrderPage = () => {
  return (
    <>
      <Navbar>
        <h1 className="text-center text-2xl font-bold text-white py-2 flex items-center justify-center capitalize mb-2 w-full bg-[#6366f1] rounded-sm shadow-sm">
          My Orders
        </h1>
        <UserOrder />
      </Navbar>
    </>
  );
};

export default UserOrderPage;
