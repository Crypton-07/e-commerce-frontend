/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { ITEM_PER_PAGE } from "../../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../orders/orderSlice";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Pagination } from "../../common/Pagination";

const AdminOrder = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  //   console.log(orders);
  const handleShow = () => {};
  const handleEdit = (order) => {
    setEditableOrderId(order?.id);
  };
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(null);
  };

  const handlePagination = (page) => {
    setPage(page);
  };

  //? Sorting Order
  const handleSort = (option) => {
    const sortOrder = { _sort: option?.sort };
    setSort(sortOrder);
  };

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
    //TODO admin order pagination with data.
    const pagination = { _page: page, _per_page: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort, editableOrderId]);
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead className="cursor-pointer table-auto">
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-3 text-left flex items-center space-x-1.5"
                    onClick={() =>
                      handleSort({ sort: sort?._sort === "id" ? "-id" : "id" })
                    }
                  >
                    <span>Order</span>
                    <span>
                      {sort?._sort === "id" ? (
                        <ArrowUpIcon className="w-4 h-4" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4" />
                      )}
                    </span>
                  </th>
                  <th className="py-3 px-3 text-left">User</th>
                  <th className="py-3 px-3 text-left">Items</th>
                  <th
                    className="py-3 px-3 text-center flex items-center justify-center space-x-1.5"
                    onClick={() =>
                      handleSort({
                        sort:
                          sort?._sort === "totalAmount"
                            ? "-totalAmount"
                            : "totalAmount",
                      })
                    }
                  >
                    <span>Amount</span>
                    <span>
                      {sort?._sort === "totalAmount" ? (
                        <ArrowUpIcon className="w-4 h-4" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4" />
                      )}
                    </span>
                  </th>
                  <th className="py-3 px-3 text-center">Address</th>
                  <th className="py-3 px-3 text-center">Contact</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-medium cursor-pointer">
                {orders?.map((order) => (
                  <tr
                    key={order?.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-3 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">
                          {order?.selectAddress?.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-left my-1 flex items-center gap-2">
                      <>
                        {order.items.map((item, index) => (
                          <div key={index}>
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item?.product?.thumbnail}
                                />
                              </div>
                              <span className="truncate">
                                {item?.product?.title}
                              </span>
                            </div>
                          </div>
                        ))}
                      </>
                      <span>#{order?.totalItems}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <p className="flex items-center justify-center">
                        ${order?.totalAmount}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <p>
                        {order?.selectAddress?.street},
                        {order?.selectAddress?.city},
                      </p>
                      <p>
                        {order?.selectAddress?.state},
                        {order?.selectAddress?.pincode}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <p>{order?.selectAddress?.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          className="block py-1 px-2 w-full text-left text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                          onChange={(e) => handleUpdate(e, order)}
                        >
                          <option value={null}>Select</option>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <p
                          className={`${orderStatusColor(
                            order?.status
                          )} p-1 w-20 rounded-full text-xs font-medium capitalize text-center`}
                        >
                          {order?.status}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex item-center justify-center space-x-4">
                        <div className="w-5 transform hover:text-indigo-600 hover:scale-125 transition-all ease-in-out duration-200">
                          <EyeIcon onClick={() => handleShow(order)} />
                        </div>
                        <div className="w-5 transform hover:text-purple-600 hover:scale-125 transition-all ease-in-out duration-200">
                          <PencilIcon onClick={() => handleEdit(order)} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* pagination and filter */}
      <Pagination
        handlePagination={handlePagination}
        page={page}
        setPage={setPage}
        totalItemCount={totalOrders}
      />
    </div>
  );
};

export default AdminOrder;
