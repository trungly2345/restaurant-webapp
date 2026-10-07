import React, { useEffect, useState } from "react";
import "./index.css";

function ViewCart({ setStep }) {
  const [items, setItems] = useState([]);

  // Fetch all cart items from backend
  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, []);

  // Group by item ID to get quantities
  const cartItems = Object.values(
    items.reduce((acc, item) => {
      const id = item._id;
      if (!acc[id]) {
        acc[id] = { ...item };
      } else {
        acc[id].quantity += item.quantity;
      }
      return acc;
    }, {})
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  const fees = 5.0;
  const taxes = subtotal * 0.07;
  const total = (subtotal + fees + taxes).toFixed(2);

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center">Your Cart</h2>
      {/* Add Clear cart button */}

      <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
        {/* LEFT: Cart Items */}
        <div className="w-full md:w-2/3 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg text-center">
              Your Cart is empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-6 p-4 justify-center rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.product_name}
                  className="sm:w-36 h-36 object-cover rounded "
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.product_name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="mt-2 font-medium text-gray-800">
                    Price: ${item.price}
                  </p>
                  <span className="text-sm">Quantity: {item.quantity}</span>
                  <div className="items-center mt-2">
                    <button
                      onClick={() => {
                        // Handle quantity increase
                        const newQuantity = Math.max(
                          1,
                          Math.floor(item.quantity + 1)
                        );
                        console.log(
                          "New Quantity:",
                          newQuantity,
                          typeof newQuantity
                        );
                        setItems((prevItems) =>
                          prevItems.map((i) =>
                            i._id === item._id
                              ? { ...i, quantity: newQuantity }
                              : i
                          )
                        );
                        fetch(`http://localhost:3000/cart/${item.product_id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            product_id: item.product_id,
                            quantity: newQuantity,
                          }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (data.error) {
                              console.error("Error updating item:", data.error);
                            } else {
                              console.log("Item updated in backend", data);
                              console.log("Updated quantity:", newQuantity);
                            }
                          })
                          .catch((err) =>
                            console.error("Request failed:", err)
                          );
                      }}
                      className="bg-[var(--color-tertiary)] text-white px-2 py-1 rounded mr-2 rounded hover:opacity-90"
                    >
                      Add
                    </button>

                    {/* Handle quantity decrease */}
                    <button
                      onClick={() => {
                        const newQuantity = Math.max(
                          1,
                          Math.floor(item.quantity - 1)
                        );
                        if (newQuantity <= 1) {
                          // Handle item removal
                          fetch(
                            `http://localhost:3000/cart/${item.product_id}`,
                            {
                              method: "DELETE",
                            }
                          )
                            .then((res) => res.json())
                            .then(() => {
                              setItems((prevItems) =>
                                prevItems.filter((i) => i._id !== item._id)
                              );
                              console.log("Item removed from cart");
                            })
                            .catch((err) =>
                              console.error("Error removing item:", err)
                            );
                        }

                        console.log(
                          "New Quantity:",
                          newQuantity,
                          typeof newQuantity
                        );
                        setItems((prevItems) =>
                          prevItems.map((i) =>
                            i._id === item._id
                              ? { ...i, quantity: newQuantity }
                              : i
                          )
                        );
                        fetch(`http://localhost:3000/cart/${item.product_id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            product_id: item.product_id,
                            quantity: newQuantity,
                          }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (data.error) {
                              console.error("Error updating item:", data.error);
                            } else {
                              console.log("Item updated in backend", data);
                              console.log("Updated quantity:", newQuantity);
                            }
                          })
                          .catch((err) =>
                            console.error("Request failed:", err)
                          );
                      }}
                      className="bg-[var(--color-tertiary)] text-white px-2 py-1 rounded mr-2 rounded hover:opacity-90"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: Summary */}
        <div className="w-full md:w-1/3 bg-[var(--color-secondary)] text-[var(--color-primary)] p-6 rounded-lg shadow-md sticky top-8 h-fit">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
          <div className="text-sm space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Fees:</span>
              <span>${fees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (7%):</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (items.length <= 0) {
                alert(
                  "Please add atleast one item to your cart before proceeding to payment."
                );
              } else {
                setStep("payment");
              }
            }}
            className="w-full py-2 bg-[var(--color-primary)] text-[var(--color-secondary)] rounded hover:opacity-90 mb-3"
          >
            Proceed to Payment
          </button>

          <button
            onClick={() => setStep("products")}
            className="w-full py-2 bg-[var(--color-tertiary)] text-[var(--color-primary)] rounded hover:opacity-90"
          >
            Continue Placing Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewCart;
