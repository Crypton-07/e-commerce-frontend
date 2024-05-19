/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/orders/orderSlice";
import { Slide, ToastContainer, toast } from "react-toastify";

const OrderSuccess = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(resetCartAsync(user?.id));
    dispatch(resetOrder());
    params.id &&
      toast.success("Order placed successfully !", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
  }, [dispatch, user, params.id]);
  return (
    <>
      {!params.id && <Navigate to={"/"} replace={true} />}
      <ToastContainer />
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Placed Successfully
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your order id is : {params.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your orders in <b>my account &gt; my orders</b>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccess;
