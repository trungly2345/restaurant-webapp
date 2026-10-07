import React, { useEffect, useState } from "react";

const PaymentInfo = ({ setStep }) => {
  const [form, setForm] = useState({ name: "", card: "", address: "" });
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then(setItems)
      .catch((err) => console.error("Error fetching cart items:", err));
  }, []);

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);
  const fees = 5.0;
  const taxes = subtotal * 0.07;
  const total = (subtotal + fees + taxes).toFixed(2);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      customer: form,
      items,
      total,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        localStorage.setItem("lastOrder", JSON.stringify(order));
        setStep("orderSummary");
      } else {
        setStatus("Failed to process payment. Try again.");
      }
    } catch (err) {
      console.error("Order submission failed:", err);
      setStatus("Error occurred. Try again.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <h2 className="text-5xl font-bold text-center mb-10">
        Payment Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-lg p-8 shadow space-y-6"
      >
        <div>
          <label className="block text-lg mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-lg mb-1">Card Number</label>
          <input
            type="text"
            name="card"
            value={form.card}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div>
          <label className="block text-lg mb-1">Delivery Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
            placeholder="123 Street, City, ZIP"
          />
        </div>

        <div className="text-right">
          <p className="mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
          <p className="mb-2">Fees: ${fees.toFixed(2)}</p>
          <p className="mb-2">Taxes (7%): ${taxes.toFixed(2)}</p>
          <p className="font-bold text-xl">Total: ${total}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--color-tertiary)] text-white py-3 rounded hover:opacity-90"
        >
          Submit Payment
        </button>
        <button
          type="button"
          onClick={() => setStep("cart")}
          className="w-full bg-[var(--color-primary)] text-[var(--color-secondary)] py-3 rounded hover:opacity-90"
        >
          Back to Cart
        </button>

        {status && <p className="text-center text-red-600 mt-4">{status}</p>}
      </form>
    </div>
  );
};

export default PaymentInfo;
