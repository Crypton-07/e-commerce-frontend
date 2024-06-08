/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  cartLoaded,
  deleteItemAsync,
  selectCartItems,
  updateItemAsync,
} from "./cartSlice";
import { discountPrice } from "../../constants/constant";
import Modal from "../common/Modal";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";

export function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const items = useSelector(selectCartItems);
  const cartItemsLoaded = useSelector(cartLoaded);
  const totalAmount = items.reduce(
    (amount, item) =>
      Math.round(discountPrice(item.product) * item.quantity) + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, itemId) => {
    // console.log(e.target.value);
    dispatch(updateItemAsync({ id: itemId, quantity: +e.target.value }));
  };
  const handleRemove = (id) => {
    dispatch(deleteItemAsync(id));
    toast.success("Item has removed from cart !", {
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
  };

  return (
    <>
      {!items.length && cartItemsLoaded && <Navigate to={"/"} replace={true} />}
      <ToastContainer />
      <div className=" bg-white shadow-lg">
        <h1 className="text-3xl font-bold px-8 py-4 tracking-wide">Cart</h1>
        <div className="border-t border-gray-200 px-4 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.category}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product?.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4 flex flex-col gap-1">
                          <span>
                            $ {discountPrice(item.product) * item.quantity}
                          </span>
                          <span className="line-through text-gray-400">
                            {`$ ${item.product.price * item.quantity}`}
                          </span>
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500 flex items-center">
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium leading-3 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, item.id)}
                          className="bg-white-50 w-[50px] ml-5 border border-gray-300 text-gray-900 text-sm rounded-md block p-1"
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal
                          title={`Delete ${item.product.title} from cart ?`}
                          message={
                            "Are you sure to remove this item from your cart ?"
                          }
                          dangerOption={"Delete"}
                          cancelOption={"Cancel"}
                          dangerAction={() => handleRemove(item.id)}
                          cancelAction={() => setShowModal(-1)}
                          showModal={showModal === item.id}
                        />
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => setShowModal(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total items in cart</p>
            <p>
              {totalItems} {totalItems > 1 ? "items" : "item"}
            </p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to={"/checkout"}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 active:scale-90 transition ease-linear duration-100"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to={"/"}>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
