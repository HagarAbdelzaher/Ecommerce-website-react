import React, { useEffect } from "react";
import queryString from "query-string";
// import { API_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../../features/slices/orderSlice";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import interceptorInstance from "../../axios";

function Order() {
  // i want to get order from redux
  const order = useSelector((state) => state.orders.order);
  const shipping_address = useSelector((state) => state.orders.shipping_address);
  const order_items = useSelector((state) => state.orders.order_items);
  const total_price = useSelector((state) => state.orders.total_price);
  const payment_status = useSelector((state) => state.orders.payment_status);
  console.log(order);
  console.log(order.shipping_address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    interceptorInstance
      .post("orders/create/")
      .then((response) => {
        console.log(response.data);
        dispatch(setOrder(response.data));
      })
      .catch((error) => console.log(error));
  }, []);

  const payWithStripe = () => {
    interceptorInstance
      .post("orders/checkout/")
      .then((response) => {
        console.log(response.data);
        dispatch(setOrder(response.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="grid grid-cols-1 items-center justify-items-center h-screen bg-white">
        <div className="w-2/5 mt-n20 p-5 shadow">
          <div className="m-1 mb-4 grid h-28 place-items-center shadow">
            <h3 className="mt-4">Order Summary</h3>
          </div>
          <div className="flex flex-col gap-4">
            <p>
              <strong>Total Price: </strong> {total_price}
            </p>
            <strong>Shipping Address: </strong>
            <p>detailed_address: {shipping_address.detailed_address}</p>
            <p>country: {shipping_address.country}</p>
            <p>city: {shipping_address.city}</p>
            <p>street: {shipping_address.street}</p>
            <p>district: {shipping_address.district}</p>
            <p>building_no: {shipping_address.building_no}</p>
            <p>apartment_no: {shipping_address.apartment_no}</p>
            <p>floor_no: {shipping_address.floor_no}</p>

            <strong>Order Items: </strong>
            {order_items.map((item) => (
              <div key={item.id}>
                <p>product: {item.product.name}</p>
                <p>quantity: {item.quantity}</p>
                <p>price: {item.price}</p>
              </div>
            ))}
            <p className="py-4">
              <strong>Payment Status: </strong> {payment_status}
            </p>
          </div>
          {/* Pay button linked with stripe and change the paid attribute */}
          <Button
            className="bg-gray-700 font-semibold hover:bg-green-700 py-3 text-sm text-white uppercase w-full"
            onClick={() => payWithStripe()}
          >
            Pay
          </Button>
        </div>
      </div>
    </>
  );
}

export default Order;
