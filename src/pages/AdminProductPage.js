import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductDetails from "../features/admin/components/AdminProductDetails";
import Footer from "../features/common/Footer";

const AdminProductPage = () => {
  return (
    <div>
      <Navbar>
        <AdminProductDetails />
      </Navbar>
      <Footer />
    </div>
  );
};

export default AdminProductPage;
