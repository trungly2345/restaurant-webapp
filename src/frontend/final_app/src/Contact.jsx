import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:3000/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        console.error("Server error:", data);
        setStatus(`Submission failed: ${data.error}`);
      }
  
      if (res.ok) {
        console.log("Form submitted:", form);
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)] text-[var(--color-secondary)] py-10 px-6">
      <h1 className="text-5xl font-bold text-center mb-10">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border border-[var(--color-secondary)] text-black"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-xl mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border border-[var(--color-secondary)] text-black"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-xl mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 rounded border border-[var(--color-secondary)] text-black"
              placeholder="Write your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[var(--color-tertiary)] text-[var(--color-primary)] px-6 py-3 rounded-sm"
          >
            Send Message
          </button>

          {status && <p className="mt-4 text-green-600">{status}</p>}
        </form>

        
        <div className="flex flex-col justify-center gap-6">
          <p className="text-xl">
            We would love to hear from you! Whether it's feedback, quick hello or looking for a job. Drop us a message and we'll respond as soon as possible.
            
          </p>
          <p className="text-lg">
            Address : 123 SEAFOOD Street, Flavortown, SEA 10010 <br />
            Phone # : (123) 456-7890 <br />
            Email : hello@seafood.com
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
