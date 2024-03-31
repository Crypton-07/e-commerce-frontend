/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Cart } from "../features/cart/Cart";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemAsync,
  selectCartItems,
  updateItemAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/orders/orderSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectAddress, setSelectAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const totalAmount = items.reduce(
    (amount, item) =>
      Math.round(
        item[0].price * item.quantity * (1 - item[0]?.discountPercentage / 100)
      ) + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, product) => {
    // console.log(e.target.value);
    dispatch(updateItemAsync({ ...product, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemAsync(id));
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleAddress = (e) => {
    // console.log(e.target.value);
    setSelectAddress(user.address[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = () => {
    if (selectAddress && paymentMethod) {
      const order = {
        user,
        items,
        totalAmount,
        totalItems,
        paymentMethod,
        selectAddress,
        status: "pending", // other status can be delivered, received
      };
      dispatch(createOrderAsync(order));
    } else {
      alert("Please select address & payment method");
    }
  };
  return (
    <>
      {!items.length && <Navigate to={"/"} replace={true} />}
      {currentOrder && (
        <Navigate to={`/orderSuccess/${currentOrder?.id}`} replace={true} />
      )}
      <div className="mx-auto max-w-7xl mt-2 px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-5">
          {/* form column */}
          <div className="lg:col-span-3 shadow-lg">
            <form
              className="bg-white px-4 py-2"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                console.log({ ...user });
                // new dispatch
                dispatch(
                  updateUserAsync({ ...user, address: [...user.address, data] })
                );
                reset();
              })}
            >
              <div>
                <div className="border-b border-gray-900/10 pb-10">
                  <h2 className="text-2xl tracking-[0.020em] font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "Please enter your good name.",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.name && (
                        <span className=" font-medium text-sm text-red-400">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "Please enter your phone number.",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.phone && (
                        <span className=" font-medium text-sm text-red-400">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Please enter your valid email.",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.email && (
                        <span className=" font-medium text-sm text-red-400">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "Please select your country.",
                          })}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>United States</option>
                          <option>India</option>
                          <option>Australia</option>
                        </select>
                      </div>
                      {errors.country && (
                        <span className=" font-medium text-sm text-red-400">
                          {errors.country.message}
                        </span>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("address", {
                            required: "Please fill your correct address.",
                          })}
                          id="address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.address && (
                        <span className=" font-medium text-sm text-red-400">
                          {errors.address.message}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "Please select your city.",
                          })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.city && (
                        <span className=" font-medium text-sm text-red-400">
                          {errors.city.message}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "Please select your state.",
                          })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.state && (
                        <span className=" font-medium text-sm text-red-400">
                          {errors.state.message}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "Please enter your pin code.",
                          })}
                          id="pincode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.pincode && (
                        <span className=" font-medium text-sm text-red-400">
                          {errors.pincode.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* cancel and save */}
              <div className="py-4 flex items-center justify-end gap-x-3">
                <button
                  type="button"
                  className="text-sm bg-gray-200 rounded-md shadow-sm px-4 py-2 font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize"
                >
                  Add address
                </button>
              </div>
              {/* select address */}
              <div className="mt-1 space-y-8">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Select Address
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Kindly choose the address.
                  </p>
                  <div className="mt-2 space-y-6 border-2 border-solid border-gray-200 rounded-sm">
                    <ul role="list" className="divide-y divide-gray-100">
                      {user?.address?.map((address, i) => (
                        <li
                          key={i}
                          className="flex items-center  gap-x-6 py-4 px-3 border-b border-b-gray-200"
                        >
                          <input
                            onChange={handleAddress}
                            id={address.id}
                            value={i}
                            name="address"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              Phone No: {address.phone}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              Pincode : {address.pincode}
                            </p>
                          </div>

                          <div className="hidden shrink-0 w-32 sm:flex sm:flex-col sm:items-start">
                            <p className="text-sm leading-6 text-gray-900">
                              Street : {address.address}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              City : {address.city}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              State : {address.state}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </fieldset>
              </div>

              {/* payment method section */}
              <div className="mt-1.5 space-y-8">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment options
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Kindly choose the payment method.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        onChange={handlePayment}
                        value="cash"
                        checked={paymentMethod === "cash"}
                        id="cash"
                        name="payments"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash on payment
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        onChange={handlePayment}
                        value={"card"}
                        checked={paymentMethod === "card"}
                        id="card"
                        name="payments"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </form>
          </div>

          {/* order summary column */}
          <div className="lg:col-span-2">
            <div className=" bg-white shadow-lg">
              <h1 className="text-2xl font-medium px-8 py-2 tracking-wide">
                Order Summary
              </h1>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product[0].thumbnail}
                            alt={product[0].category}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product[0]?.href}>
                                  {product[0].title}
                                </a>
                              </h3>
                              <p className="ml-4 flex flex-col gap-1">
                                <span>
                                  $
                                  {Math.round(
                                    product[0].price *
                                      product.quantity *
                                      (1 - product[0]?.discountPercentage / 100)
                                  )}
                                </span>
                                <span className="line-through text-gray-400">
                                  $ {product[0].price * product.quantity}
                                </span>
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product[0].brand}
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
                                onChange={(e) => handleQuantity(e, product)}
                                className="bg-white-50 w-[50px] ml-5 border border-gray-300 text-gray-900 text-sm rounded-md block p-1"
                                value={product.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={(e) => handleRemove(e, product.id)}
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
                  <p>${totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total items in cart</p>
                  <p>{totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleOrder}
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 active:scale-90 transition ease-linear duration-100"
                  >
                    Order Now
                  </button>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
