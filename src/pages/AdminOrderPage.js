import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminOrder from "../features/admin/components/AdminOrder";

const AdminOrderPage = () => {
  return (
    <div>
      <Navbar>
        <AdminOrder />
      </Navbar>
    </div>
  );
};

export default AdminOrderPage;
