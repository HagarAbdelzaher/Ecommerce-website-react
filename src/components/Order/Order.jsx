import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder, cancelOrderState } from "../../features/slices/orderSlice";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import interceptorInstance from "../../axios";
import Navbar from "../Navbar/Navbar";

function Order() {
  const orders = useSelector((state) => state.orders.order);
  const dispatch = useDispatch();

  useEffect(() => {
    interceptorInstance
      .post("orders/payment/success/")
      .then((response) => {
        dispatch(setOrder(response.data));
      })
      .catch((error) => console.log(error));
  }, []);

  const cancelOrder = (id) => {
    interceptorInstance
      .post(`orders/${id}/cancel`)
      .then((response) => {
        console.log(response.data);
        dispatch(cancelOrderState(id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-4 bg-gray-100">
        <div className="md:shadow-md justify-center px-2">
          <div className="flex justify-between border-b pb-8 px-5">
            <h1 className="font-semibold text-2xl">My Orders</h1>
            <h2 className="font-semibold text-2xl uppercase">
              {orders.length}
              {orders.length > 1 ? " Orders" : " Order"}
            </h2>
          </div>
          {orders.length ? (
            <>
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className="md:shadow-md justify-center px-4 py-5 my-5"
                >
                  <div className="text-blue-500 text-lg pt-4 pb-6 text-center m-auto">
                    <strong>
                      <h1>Order {index + 1}</h1>
                    </strong>

                    <Button
                      color="red"
                      className="mt-4"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel Order
                    </Button>
                  </div>
                  <div className=" xs:hidden lg:flex">
                    <table className="w-full">
                      <thead className="text-lg py-5 mb-4">
                        <tr>
                          <th className="pt-4 text-center col-span-5">
                            Product
                          </th>
                          <th className="pt-4 text-center col-span-3">
                            Quantity
                          </th>
                          <th className="pt-4 text-center col-span-2">Price</th>
                          <th className="pt-4 text-center col-span-2">
                            Total Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="py-6">
                        {order.order_items.map((item) => (
                          <tr key={item.id} className="my-10 text-center py-5">
                            <td className="col-span-4 py-3 my-2">
                              <div className="flex flex-col justify-around text-center">
                                <span className="text-xl">
                                  {item.product.name}
                                </span>
                                <span className="text-red-500 text-sm">
                                  Zara
                                </span>
                              </div>
                            </td>
                            <td className="col-span-3 py-3 my-2">
                              <span className="text-center w-1/5 text-lg">
                                {item.quantity}
                              </span>
                            </td>
                            <td className="col-span-2 py-3 my-2">
                              <span className="text-center w-1/5 text-lg">
                                ${item.product.price}
                              </span>
                            </td>
                            <td className="col-span-2 py-3 my-2">
                              <span className="text-center w-1/5 text-lg">
                                ${item.product.price * item.quantity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="text-lg py-5 mb-5">
                        <tr>
                          <th className="pt-4 text-center col-span-5">
                            <strong>Date</strong>
                          </th>
                          <th className="pt-4 text-center col-span-3">
                            <strong>Status</strong>
                          </th>
                          <th className="pt-4 text-center col-span-2">
                            <strong>Payment</strong>
                          </th>
                          <th className="pt-4 text-center col-span-2">
                            <strong>Total Price</strong>
                          </th>
                        </tr>
                      </tfoot>
                      <tfoot className="text-lg py-5 mb-4">
                        <tr>
                          <th className="pt-4 text-center col-span-5">
                            <strong>{order.created_at.split("T")[0]}</strong>
                          </th>
                          <th className="pt-4 text-center col-span-3">
                            <strong>{order.status}</strong>
                          </th>
                          <th className="pt-4 text-center col-span-2">
                            <strong>{order.paid ? "Paid" : "Not Paid"}</strong>
                          </th>
                          <th className="pt-4 text-center col-span-2">
                            <strong>${order.total_price}</strong>
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className=" bg-white items-center p-10 ">
              <p className="text-center text-xl">No Orders Yet..</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <Link
          to="/"
          className="flex font-semibold text-gray-600 text-lg my-10 pl-10"
        >
          <i className="fa-solid fa-arrow-left text-gray-600 text-l pr-1 text-lg"></i>
          Continue Shopping
        </Link>
      </div>
    </>
  );
}

export default Order;
