import React, { useEffect, useState } from "react";

const OrderSummary = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("lastOrder"));
    setOrder(savedOrder);
  }, []);

  if (!order) return <p className="text-center py-20">Loading your order...</p>;

  const { customer, items, total } = order;

  return (
    <div className="min-h-screen p-10 bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <h1 className="text-5xl font-bold text-center mb-10">Thank You for Your Order!</h1>

      <div className="max-w-3xl mx-auto bg-white text-black rounded-lg p-8 shadow space-y-6">
        <h2 className="text-2xl font-bold">Order Details</h2>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Delivery Address:</strong> {customer.address}</p>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Items Ordered:</h3>
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b pb-1">
                <span>{item.product_name || item.name}</span>
                <span>Qty: {item.quantity}</span>
                <span>${parseFloat(item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-right text-xl mt-4 font-bold">
          Total Paid: ${total}
        </div>

        <p className="mt-6 text-center text-lg text-green-700">
          Thank you for your support!
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
