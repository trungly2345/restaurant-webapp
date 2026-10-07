import recipe from "./assets/recipe.svg";
import cookingbook from "./assets/cookingbook.svg";
import thunder from "./assets/thunder.svg";
import React, { useState } from "react";
import EntreeMenu from "./EntreeMenu.jsx";
import DrinksMenu from "./drinksMenu.jsx";
import DessertsMenu from "./dessertsMenu.jsx";
import Contact from "./Contact.jsx";
import About from "./About_Us.jsx";
import ViewCart from "./ViewCart.jsx";
import PaymentInfo from "./PaymentInfo.jsx";
import OrderSummary from "./OrderSummary.jsx";

function App() {
  const [step, setStep] = useState("home");
  const [cart, setCart] = useState([]); // Cart state to manage items in the cart

  const navbar = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <nav className="bg-[var(--color-primary)] text-[var(--color-secondary)] px-5 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">S.E.A Food</h1>

          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="text-4xl">&#9776;</span> {/* ☰ */}
            </button>
          </div>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8 text-2xl">
            <li onClick={() => setStep("home")} className="cursor-pointer">
              Home
            </li>
            <li onClick={() => setStep("products")} className="cursor-pointer">
              Menu
            </li>
            <li onClick={() => setStep("cart")} className="cursor-pointer">
              Cart
            </li>
            <li onClick={() => setStep("Contact")} className="cursor-pointer">
              Contact us
            </li>
            <li onClick={() => setStep("about")} className="cursor-pointer">
              About Us
            </li>
          </ul>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <ul className="flex flex-col gap-4 mt-4 md:hidden text-xl">
            <li
              onClick={() => {
                setStep("home");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                setStep("products");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              Menu
            </li>
            <li
              onClick={() => {
                setStep("cart");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              Cart
            </li>
            <li
              onClick={() => {
                setStep("Contact");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              Contact us
            </li>
            <li
              onClick={() => {
                setStep("about");
                setMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              About Us
            </li>
          </ul>
        )}
      </nav>
    );
  };

  const hero = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 p-5">
       
        <div className="order-1 md:order-2 p-4">
          <img
            className="w-full h-60 sm:h-72 md:h-96 object-cover rounded-lg shadow-lg"
            src="https://images.pexels.com/photos/14906578/pexels-photo-14906578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Southeast Asian dish"
          />
        </div>
  
       
        <div className="order-2 md:order-1 p-4 flex flex-col justify-center text-center md:text-left">
          <p className="text-[var(--color-secondary)] text-2xl md:text-4xl mt-5">
            Discover the vibrant flavors of Southeast Asia, where each dish is
            crafted with the freshest, hand-picked ingredients.
          </p>
          <p className="text-[var(--color-secondary)] text-lg md:text-2xl mt-4">
            Experience the culinary journey of a lifetime with our expertly
            curated menu, featuring the finest dishes that will tantalize your
            taste buds.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-center ">
            <button
              onClick={() => setStep("products")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-4 py-2 rounded-sm"
            >
              Order Now
            </button>
            <button
              onClick={() => setStep("about")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-4 py-2 rounded-sm"
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    );
  };
  
 
  const aboutUs = () => {
    return (
      <section className="grid md:grid-cols-3 gap-8 px-6 py-10 bg-[var(--color-secondary)] text-[var(--color-primary)]">
        {/* Left: Text Content */}
        <div className="md:col-span-1 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6 mt-1">About SEA FOOD</h1>
          <p className="text-lg mb-6">
            At <span className="text-[var(--color-tertiary)]">SEA FOOD</span>,
            we are passionate about bringing the vibrant flavors of Southeast
            Asia to your table. Our commitment to using only the freshest
            ingredients ensures that every dish is a delightful experience.
            <br />
            <br />
            From the bustling streets of Bangkok to the markets of Hanoi, we
            draw inspiration from real places and real people.
          </p>
          <h2 className="text-3xl font-semibold mt-8 mb-2">Our Mission</h2>
          <p className="text-lg">
            Our mission is to provide an unforgettable culinary experience that
            celebrates the diverse flavors of Southeast Asia while ensuring the
            highest standards of quality and service.
          </p>
        </div>

        {/* Right: Asymmetrical Image Grid */}
        <div className="md:col-span-2 grid grid-cols-2 grid-rows-2 gap-2 mt-5">
          <img
            src="https://images.pexels.com/photos/4508641/pexels-photo-4508641.jpeg"
            className="w-full h-full object-cover rounded-lg"
            alt="Market"
          />

          <img
            src="https://images.pexels.com/photos/20994429/pexels-photo-20994429/free-photo-of-photo-of-a-chef-cooking-asian-food.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-full object-cover rounded-lg"
          ></img>
          <img
            src="https://images.pexels.com/photos/2355088/pexels-photo-2355088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-50 object-cover rounded-lg row-span-2"
          />
          <img
            src="https://images.pexels.com/photos/12027630/pexels-photo-12027630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="w-full h-50 object-cover rounded-lg row-span-1"
          />
        </div>
      </section>
    );
  };

  const content = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-20">
        {/* Card 1 */}
        <div className="bg-[var(--color-secondary)] rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <p className="text-lg font-semibold text-[var(--color-primary)]">
              <img
                src={recipe}
                alt="Recipe Logo"
                className="w-20 h-full block p-3"
              />
              - "Locally sourced ingredients, hand-picked for exceptional freshness and quality—bringing the heart of Southeast Asia to every dish."
            </p>
          </div>
        </div>
  
        {/* Card 2 */}
        <div className="bg-[var(--color-secondary)] rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <p className="text-lg font-semibold text-[var(--color-primary)]">
              <img
                src={cookingbook}
                alt="Cookbook logo"
                className="w-20 h-full block p-3"
              />
              - "Authentic family recipes passed down through generations, preserving the rich culinary heritage in every bite."
            </p>
          </div>
        </div>
  
        {/* Card 3 */}
        <div className="bg-[var(--color-secondary)] rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <p className="text-lg font-semibold text-[var(--color-primary)]">
              <img
                src={thunder}
                alt="Thunder Logo"
                className="w-20 h-full block p-3"
              />
              - "Fast and efficient service for here and to go, ensuring your dining experience is as delightful as the dishes we serve."
            </p>
          </div>
        </div>
      </div>
    );
  };
  

  const viewButton = (label, stepValue) => {
    return (
      <div className="flex justify-center">
        <button
          onClick={() => setStep(stepValue)}
          className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-4 py-2 rounded-sm mt-5"
        >
          {label}
        </button>
      </div>
    );
  };

  const menuCard = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-20">
        <div className="bg-[var(--color-secondary)] rounded-lg shadow-lg overflow-hidden text-[var(--color-primary)]">
          <img
            className="w-full h-52 object-cover"
            src="https://images.pexels.com/photos/6646072/pexels-photo-6646072.jpeg"
            alt="Menu Item"
          />
          <div className="p-6 mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Entrees</h3>
            {viewButton("View Menu", "products")}
          </div>
        </div>

        <div className="bg-[var(--color-secondary)] rounded-lg shadow-lg overflow-hidden text-[var(--color-primary)]">
          <img
            className="w-full h-52 object-cover"
            src="https://images.pexels.com/photos/29807814/pexels-photo-29807814/free-photo-of-refreshing-iced-berry-smoothie-on-wooden-tray.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Menu Item"
          />
          <div className="p-6 mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Drinks</h3>
            {viewButton("View Drinks", "drinks")}
          </div>
        </div>

        <div className="bg-[var(--color-secondary)] rounded-lg shadow-lg overflow-hidden text-[var(--color-primary)]">
          <img
            className="w-full h-52 object-cover"
            src="https://images.pexels.com/photos/26225563/pexels-photo-26225563/free-photo-of-snack-balls-with-seeds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Menu Item"
          />
          <div className="p-6 mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Desserts</h3>
            {viewButton("View Desserts", "desserts")}
          </div>
        </div>
      </div>
    );
  };

  const divider = () => {
    return <div className="h-1 bg-[var(--color-primary)] py-18"></div>;
  };

  // TODO add a footer component
  const footer = () => {
    return (
      <div className="bg-[var(--color-primary)] text-[var(--color-secondary)] text-center py-10">
        <p>© 2025 SEA FOOD. All rights reserved.</p>
      </div>
    );
  };

  return (
    <div className="App">
      {step === "home" && (
        <>
          {navbar()}
          {hero()}
          {divider()}
          {aboutUs()}
          {divider()}
          {content()}
          <div className="h-1 bg-[var(--color-primary)] py-10"></div>

          <h1 className="text-6xl text-center bg-[var(--color-primary)] py-10">
            Our menus
          </h1>
          {menuCard()}
          <div className="h-1 bg-[var(--color-primary)] py-10"></div>
          {footer()}
        </>
      )}
      
      {step === "orderSummary" && (
          <>
            {navbar()}
            <OrderSummary />
            {footer()}
          </>
        )}

        {step === "payment" && (
          <>
            {navbar()}
            <PaymentInfo setStep={setStep} />
            {footer()}
          </>
        )}

      {step === "products" && (
        <>
          {navbar()}
          <EntreeMenu cart={cart} setCart={setCart} setStep={setStep} />
          <div className="flex flex-row sm:flex-row justify-center items-center gap-4 mt-8 px-4">
            <button
              onClick={() => setStep("home")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Back to Home
            </button>

            <button
              onClick={() => setStep("drinks")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Drinks
            </button>

            <button
              onClick={() => setStep("desserts")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Desserts
            </button>

            <button
              onClick={() => setStep("cart")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              View Cart
            </button>
          </div>
          {footer()}
        </>
      )}

      {step === "drinks" && (
        <>
          {navbar()}
          <DrinksMenu cart={cart} setCart={setCart} setStep={setStep} />
          <div className="flex flex-row sm:flex-row justify-center items-center gap-4 mt-8 px-4">
            <button
              onClick={() => setStep("home")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Back to Home
            </button>

            <button
              onClick={() => setStep("products")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Entrees
            </button>

            <button
              onClick={() => setStep("desserts")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Desserts
            </button>

            <button
              onClick={() => setStep("cart")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              View Cart
            </button>
          </div>
          {footer()}
        </>
      )}
      {step === "Contact" && (
        <>
          {navbar()}
          <Contact />
          {footer()}
        </>
      )}
      {step === "about" && (
        <>
          {navbar()}
          <About />
          {footer()}
        </>
      )}

      {step === "cart" && (
        <>
          {navbar()}
          <ViewCart cart={cart} setCart={setCart} setStep={setStep} />
          {footer()}
        </>
      )}

      {step === "desserts" && (
        <>
          {navbar()}
  
          <DessertsMenu cart={cart} setCart={setCart} setStep={setStep} />

          <div className="flex flex-row sm:flex-row justify-center items-center gap-4 mt-8 px-4">
            <button
              onClick={() => setStep("home")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Back to Home
            </button>

            <button
              onClick={() => setStep("drinks")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Drinks
            </button>

            <button
              onClick={() => setStep("products")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              Entrees
            </button>

            <button
              onClick={() => setStep("cart")}
              className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-2 rounded"
            >
              View Cart
            </button>
          </div>
          {footer()}
        </>
      )}
    </div>
  );
}

export default App;
