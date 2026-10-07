
import ViewMenu from "./ViewMenu";
import { useState, useEffect } from "react";
import './index.css';

function EntreeMenu({cart, setCart, setStep}) {
  const [drinks, setDrinks] = useState([]);
  

  

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/drinks").then(res => res.json()),
      fetch("http://localhost:3000/alcohol").then(res => res.json())
    ])
      .then(([drinksData, alcoholData]) => {
        setDrinks([...drinksData, ...alcoholData]); // Combine both arrays
      })
      .catch((error) => {
        console.error("Error fetching drinks and alcohol:", error);
      });
  }, []);
  // Empty dependency array to run only once on mount
  const addToCart = async (item) => {
    setCart([...cart, item]);
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [item] }),
      });

      if (response.ok) {
        console.log("Item saved to backend");
        setStep("cart");
      }
    } catch (err) {
      console.error("Backend save error:", err);
    }
  };
  
  return (
    <div>
      <div className="bg-[var(--color-primary)] text-[var(--color-secondary)] text-center py-10">
        <h1 className="text-6xl font-bold">Drinks</h1>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-8">
        {drinks.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              className="w-full h-52 object-cover"
              src={item.image}
              alt={item.name}
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{item.product_name}</h2>
              <p className="text-sm italic mb-2">{item.description}</p>
              <p className="text-lg font-semibold mb-4">Price: ${item.price.toFixed(2)}</p>
              <button
                onClick={() => {
                    addToCart(item);
                  }}
                className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-5 py-2 rounded hover:opacity-90 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default EntreeMenu;