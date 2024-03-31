/* eslint-disable no-undef */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

export function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  // console.log(user);
  const [selectedEdit, setSelectedEdit] = useState(-1);
  const [addAddress, setAddAddress] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const handleEditForm = (index) => {
    setSelectedEdit(index);
    setAddAddress(false);
    const address = user?.address[index];
    setValue("name", address.name);
    setValue("phone", address.phone);
    setValue("email", address.email);
    setValue("address", address.address);
    setValue("country", address.country);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pincode", address.pincode);
  };
  const handleEdit = (editedAddress, index) => {
    const newUser = { ...user, address: [...user.address] };
    // console.log(newUser);
    newUser.address.splice(index, 1, editedAddress);
    // console.log(newUser);
    dispatch(updateUserAsync(newUser));
    setSelectedEdit(-1);
  };
  const handleAdd = (data) => {
    const newUser = { ...user, address: [...user.address, data] };
    console.log(newUser);
    dispatch(updateUserAsync(newUser));
    setAddAddress(false);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, address: [...user.address] };
    // console.log(newUser);
    newUser.address.splice(index, 1);
    // console.log(newUser);
    dispatch(updateUserAsync(newUser));
  };
  return (
    <>
      <div className="lg:col-span-2">
        <div className=" bg-white shadow-lg">
          <h1 className="text-2xl font-medium px-8 py-2 tracking-wide">
            User's Id : {user?.id}
          </h1>
          <p className="text-md font-medium px-8 py-2 tracking-wide">
            User's Email : {user.email}
          </p>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            {/* <p className="mt-0.5 text-sm text-gray-500">Your Address</p> */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedEdit(-1);
                  setAddAddress(true);
                  reset();
                }}
                type="submit"
                className="flex justify-end rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 capitalize"
              >
                Add address
              </button>
            </div>
            <div className="lg:col-span-3 shadow-lg">
              {addAddress && (
                <form
                  className="bg-white px-4 py-2"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    // console.log(data);
                    // console.log({ ...user });
                    handleAdd(data);
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
                      onClick={() => setAddAddress(false)}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize"
                    >
                      Add address
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="mt-2 space-y-6 border-2 border-solid border-gray-200 rounded-sm">
              <ul className="divide-y divide-gray-100">
                {user?.address?.map((address, index) => (
                  <div key={index}>
                    <div className="lg:col-span-3 shadow-lg">
                      {selectedEdit === index && (
                        <form
                          className="bg-white px-4 py-2"
                          noValidate
                          onSubmit={handleSubmit((data) => {
                            // console.log(data);
                            // console.log({ ...user });
                            handleEdit(data, index);
                            reset();
                          })}
                        >
                          <div>
                            <div className="border-b border-gray-900/10 pb-10">
                              <h2 className="text-2xl tracking-[0.020em] font-semibold leading-7 text-gray-900">
                                Personal Information
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
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
                                        required:
                                          "Please enter your good name.",
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
                                        required:
                                          "Please enter your phone number.",
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
                                        required:
                                          "Please enter your valid email.",
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
                                        required:
                                          "Please fill your correct address.",
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
                              onClick={() => setSelectedEdit(-1)}
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize"
                            >
                              Edit address
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                    <li
                      key={address?.email}
                      className="flex fle justify-between py-4 px-3 border-b border-b-gray-200"
                    >
                      <div className="min-w-0">
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

                      <div className="hidden shrink-0 w-52 sm:flex sm:flex-col sm:items-start">
                        <p className="flex justify-between space-x-1 items-center text-sm leading-6 text-gray-900">
                          <span className="w-16">Street : </span>
                          <span className="text-center">{address.address}</span>
                        </p>
                        <p className="flex justify-between space-x-1 items-center text-sm leading-6 text-gray-900">
                          <span className="w-16">City : </span>
                          <span className="text-center">{address.city}</span>
                        </p>
                        <p className="flex justify-between space-x-1 items-center text-sm leading-6 text-gray-900">
                          <span className="w-16">State : </span>
                          <span className="text-center">{address.state}</span>
                        </p>
                      </div>
                      <div
                        className="hidden shrink-0 w-32 sm:flex sm:flex-col sm:items-start lg:flex-row lg:items-center lg:justify-around
                    "
                      >
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-400"
                          onClick={() => handleEditForm(index)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-400"
                          onClick={(e) => handleRemove(e, index)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
