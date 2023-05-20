import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../../features/slices/orderSlice";
import { Button } from "@material-tailwind/react";
import interceptorInstance from "../../axios";
import Navbar from "../Navbar/Navbar";

function Order() {
  // i want to get order from redux
  const order = useSelector((state) => state.orders.order);
  const shipping_address = useSelector(
    (state) => state.orders.shipping_address
  );
  const order_items = useSelector((state) => state.orders.order_items);
  const total_price = useSelector((state) => state.orders.total_price);
  console.log(order);
  console.log(order.shipping_address);
  const dispatch = useDispatch();

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
      .post("orders/payment/")
      .then((response) => {
        console.log(response.data);
        // redirect to stripe payment page
        window.location.href = response.data.url;
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-10 p-4">
        <div className="md:shadow-md justify-center px-2 ">
          <div className="flex justify-between border-b pb-8 px-5">
            <h1 className="font-semibold text-2xl mt-5">Order Summary</h1>
          </div>
          {/* <div className="grid grid-cols-1 items-center justify-items-center h-screen bg-white"> */}
          <div className="grid items-center justify-items-center">
            <div className="w-2/5 mt-n20 p-5 shadow">
              <div className="flex flex-col gap-4">
                <p>
                  <strong>Total Price: </strong> {total_price}
                </p>
                <strong className="pt-3">Shipping Address: </strong>
                <p>detailed_address: {shipping_address.detailed_address}</p>
                <p>country: {shipping_address.country}</p>
                <p>city: {shipping_address.city}</p>
                <p>street: {shipping_address.street}</p>
                <p>district: {shipping_address.district}</p>
                <p>building_no: {shipping_address.building_no}</p>
                <p>apartment_no: {shipping_address.apartment_no}</p>
                <p>floor_no: {shipping_address.floor_no}</p>

                <strong className="pt-4">Order Items: </strong>
                {order_items.map((item) => (
                  <div key={item.id} >
                    <p>product: {item.product.name}</p>
                    <p>quantity: {item.quantity}</p>
                    <p className="pb-3">price: {item.price}</p>
                  </div>
                ))}
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
        </div>
      </div>
    </>
  );
}

export default Order;
