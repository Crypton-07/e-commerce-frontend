import React from "react";
import ProductForm from "../features/admin/components/ProductForm";
import Navbar from "../features/navbar/Navbar";

const AdminProductForm = () => {
  return (
    <>
      <Navbar>
        <ProductForm />
      </Navbar>
    </>
  );
};

export default AdminProductForm;
