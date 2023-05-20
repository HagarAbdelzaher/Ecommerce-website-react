// I want to show all my orders here
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get("http://127.0.0.1:8000/orders/");
            setOrders(response.data.results);
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <div className="bg-black p-2 w-[50%] mx-auto rounded-md">
                <h2 className="text-red-600 text-center text-lg font-inter font-bold tracking-normal leading-none">
                    My Orders
                </h2>
            </div>
            <div className="grid grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl">
                {orders.map((order, index) => {
                    return (
                        <div key={index}>
                            <div className="bg-white shadow-md rounded-md">
                                <div className="flex flex-col gap-4">
                                    <p>
                                        <strong>Total Price: </strong>{" "}
                                        {order.total_price}
                                    </p>
                                    <strong>Shipping Address: </strong>
                                    <p>
                                        detailed_address:{" "}
                                        {order.shipping_address.detailed_address}
                                    </p>
                                    <p>
                                        country: {order.shipping_address.country}
                                    </p>
                                    <p>
                                        city: {order.shipping_address.city}
                                    </p>
                                    <p>
                                        district: {order.shipping_address.district}
                                    </p>
                                    <p>
                                        street: {order.shipping_address.street}
                                    </p>

                                    <strong>Order Items: </strong>
                                    {order.order_items.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p>
                                                    <strong>Product Name: </strong>{" "}
                                                    {item.product.name}
                                                </p>
                                                <p>
                                                    <strong>Product Price: </strong>{" "}
                                                    {item.product.price}
                                                </p>
                                                <p>
                                                    <strong>Product Quantity: </strong>{" "}
                                                    {item.quantity}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;