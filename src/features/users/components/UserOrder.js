/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchLoggedInOrdersAsync, selectUserOrders } from "../userSlice";
import { discountPrice } from "../../../constants/constant";

const UserOrder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userOrders = useSelector(selectUserOrders);
  const orderStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-600";
      case "dispatched":
        return "bg-indigo-200 text-indigo-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-yellow-200 text-yellow-600";
    }
  };
  useEffect(() => {
    dispatch(fetchLoggedInOrdersAsync(user?.id));
  }, [dispatch, user]);
  return (
    <>
      {userOrders.map((order) => (
        <div key={order?.id} className="lg:col-span-2">
          <div className=" bg-white shadow-lg">
            <h1 className="text-2xl font-medium px-8 py-2 tracking-wide">
              Order {`#${order?.id}`}
            </h1>
            <p className={`text-md font-medium px-8 py-2 tracking-wide`}>
              Order Status :
              <span
                className={`${orderStatusColor(
                  order?.status
                )} mx-1 capitalize py-1 px-2 rounded-md`}
              >
                {order?.status}
              </span>
            </p>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((product) => (
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
                              <a href={product[0]?.href}>{product[0].title}</a>
                            </h3>
                            <p className="ml-4 text-md flex flex-col gap-1">
                              <span>
                                ${discountPrice(product[0]) * product.quantity}
                              </span>
                              <span className="line-through text-sm text-gray-400">
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
                              Qty : {product?.quantity}
                            </label>
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
                <p>${order?.totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items In Cart</p>
                <p>{order?.totalItems} Items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping Address</p>
              <div className="mt-2 space-y-6 border-2 border-solid border-gray-200 rounded-sm">
                <ul role="list" className="divide-y divide-gray-100">
                  <li className="flex items-center  gap-x-6 py-4 px-3 border-b border-b-gray-200">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order?.selectAddress?.name}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        Phone No: {order?.selectAddress?.phone}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Pincode : {order?.selectAddress?.pincode}
                      </p>
                    </div>

                    <div className="hidden shrink-0 w-32 sm:flex sm:flex-col sm:items-start">
                      <p className="text-sm leading-6 text-gray-900">
                        Street : {order?.selectAddress?.order?.selectAddress}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        City : {order?.selectAddress?.city}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        State : {order?.selectAddress?.state}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserOrder;
