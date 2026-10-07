const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;
const uri = 'mongodb+srv://trungly123:May042001@coms-319-database.bgoeykr.mongodb.net/'; // or your Atlas URI

app.use(cors());
app.use(express.json()); // to read JSON body

let db;

// Connect to MongoDB
async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db('COMS-319-Data'); // database name
  console.log('Connected to MongoDB');

  // Start the server only after DB connection is successful
  app.listen(PORT, () => {
    console.log(`🚀 Server running!`);
    console.log(`http://localhost:${PORT}/desserts`);
    console.log(`http://localhost:${PORT}/drinks`);
    console.log(`http://localhost:${PORT}/products`);
    console.log(`http://localhost:${PORT}/alcohol`);
    console.log(`http://localhost:${PORT}/cart`);
    console.log(`http://localhost:${PORT}/cart/product_id`);
    
  });
}

connectDB();

// Get /drinks 
app.get('/drinks', async (req, res) => {
  const drinks = await db.collection('drinks').find().toArray();
  res.json(drinks);
});

// Get /products
app.get('/products', async (req, res) => {
  const products = await db.collection('products').find().toArray();
  res.json(products);
});



// GET /desserts
app.get('/desserts', async (req, res) => {
  const desserts = await db.collection('desserts').find().toArray();
  res.json(desserts);
});

// get /alcohol
app.get('/alcohol', async (req, res) => {
  const alcohol = await db.collection('alcohol').find().toArray();
  res.json(alcohol);
});


app.post('/alcohol', async (req, res) => {
  const result = await db.collection('alcohol').insertOne(req.body);
  res.status(201).json(result); // result contains insertedId
}
);

// POST /desserts

app.post('/desserts', async (req, res) => {
  const result = await db.collection('desserts').insertOne(req.body);
  res.status(201).json(result); // result contains insertedId
});




// PUT /desserts/:id
app.put('/desserts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection('desserts').updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );
    if (result.matchedCount === 1) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Not found');
    }
  } catch (err) {
    res.status(400).send('Invalid ID format');
  }
});

// DELETE /desserts/:id
app.delete('/desserts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection('desserts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(204).send(); // Success - No Content
    } else {
      res.status(404).send('Not found');
    }
  } catch (err) {
    res.status(400).send('Invalid ID format');
  }
});

// get /cart
// GET /cart - combine all cart items
app.get('/cart', async (req, res) => {
  try {
    const cartDoc = await db.collection("cart").findOne({ session: "current" });

    if (!cartDoc || !cartDoc.items) {
      return res.json([]); // return empty cart if not found
    }

    // Group by product_id
    const grouped = {};
    for (const item of cartDoc.items) {
      const id = item.product_id;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 1;

      if (!grouped[id]) {
        grouped[id] = { ...item, quantity };
      } else {
        grouped[id].quantity += quantity;
      }
    }

    const result = Object.values(grouped);
    res.json(result);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).send("Server error");
  }
});

app.get('/cart/:product_id', async (req, res) => {
  const { id } = req.params;


  try {
    const item = await db.collection("cart").findOne({ _id: new ObjectId(id) });
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error("Error fetching cart item:", err);
    res.status(500).send("Server error for get");
  }
});


app.put('/cart/:product_id', async (req, res) => {
  const { product_id } = req.params;
  const { quantity } = req.body;

  if (quantity == null) return res.status(400).json({ error: "No quantity provided" });

  try {
    const result = await db.collection("cart").updateOne(
      { session: "current", "items.product_id": parseInt(product_id) }, // Convert to int if needed
      { $set: { "items.$.quantity": quantity } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item quantity updated" });
  } catch (err) {
    console.error("Cart item update failed:", err);
    res.status(500).json({ error: "Cart item update failed" });
  }
});

// POST /cart - upsert into a single cart document
app.post('/cart', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid items format" });
    }

    // Upsert into a single cart doc (e.g., session: "current")
    const result = await db.collection("cart").updateOne(
      { session: "current" }, // filter
      { $push: { items: { $each: items } } }, // append to items array
      { upsert: true }
    );

    res.status(200).json({ message: "Item(s) added to cart", result });
  } catch (err) {
    console.error("Failed to add to cart", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /cart - clear the current session cart
app.delete('/cart', async (req, res) => {
  try {
    const result = await db.collection("cart").deleteMany({ session: "current" }); // could be userId/sessionId in real use
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Cart clear failed", err);
    res.status(500).json({ error: "Cart clear failed" });
  }
});

// Delete /cart/:id - remove a specific item from the cart
app.delete('/cart/:product_id', async (req, res) => {
  const { product_id } = req.params;

  try {
    const result = await db.collection("cart").updateOne(
      { session: "current" },
      { $pull: { items: { product_id: parseInt(product_id) } } } // Convert to int if needed
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Cart item removal failed", err);
    res.status(500).json({ error: "Cart item removal failed" });
  }
});

// Add quantity to an item in the cart
app.post('/cart', async (req, res) => {
  const items = req.body.items.map(item => ({
    ...item,
    quantity: item.quantity || 1,  // default to 1 if not provided
  }));

  try {
    const result = await db.collection("cart").insertOne({ items });
    res.status(201).json(result);
  } catch (err) {
    console.error("Failed to insert cart item", err);
    res.status(500).json({ error: "Insert failed" });
  }
});



app.put('/cart/:product_id', async (req, res) => {
  const { product_id } = req.params;
  const { item, increment = 1 } = req.body;

  if (!item) return res.status(400).json({ error: "No item provided" });

  try {
    const cart = await db.collection("cart").findOne({ session: "current" });

    if (!cart) {
      // If no cart exists yet, create it with the item
      await db.collection("cart").insertOne({
        session: "current",
        items: [{ ...item, product_id: parseInt(product_id), quantity: increment }],
      });
    } else {
      // Check if item exists
      const items = cart.items || [];
      const index = items.findIndex(i => i.product_id === parseInt(product_id));

      if (index !== -1) {
        // Item exists: increment quantity
        items[index].quantity += increment;
      } else {
        // Item doesn't exist: add it
        items.push({ ...item, product_id: parseInt(product_id), quantity: increment });
      }

      // Update the cart document
      await db.collection("cart").updateOne(
        { session: "current" },
        { $set: { items } }
      );
    }

    res.status(200).json({ message: "Item incremented or added" });
  } catch (err) {
    console.error("Cart update failed", err);
    res.status(500).json({ error: "Cart update failed" });
  }
});


// POST /orders - saves the entire order to DB
app.post('/orders', async (req, res) => {
  const order = req.body;

  if (!order || !order.customer || !Array.isArray(order.items)) {
    return res.status(400).json({ error: "Invalid order format" });
  }

  try {
    const result = await db.collection("orders").insertOne(order);
    console.log("Order saved:", result.insertedId);

    await db.collection("cart").deleteMany({});

    res.status(201).json({ message: "Order placed", orderId: result.insertedId });
  } catch (err) {
    console.error("Order save failed:", err);
    res.status(500).json({ error: "Order save failed" });
  }
});

// POST /inquiries - save contact form submissions
app.post('/inquiries', async (req, res) => {
  const { name, email, message } = req.body;

  //Checks to see if all fields are filled out
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await db.collection("inquiries").insertOne({
      name,
      email,
      message,
      submittedAt: new Date()
    });
    console.log("Inquiry saved:", result.insertedId);
    res.status(201).json({ message: "Inquiry saved" });
  } catch (err) {
    console.error("Failed to save inquiry:", err);
    res.status(500).json({ error: "Server error" });
  }
});
