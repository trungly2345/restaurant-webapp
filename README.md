## Full-Stack Setup

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas URI (set `MONGODB_URI` in `.env`)

# Type the following in the command line 
### Backend
1. `cd src/backend`
2. `node server.js` # starts at http://localhost:3000

### Frontend
1. `npm install`
2. `cd src\frontend\final_app` 
3. `npm run dev` # starts at http://localhost:5173







### API Endpoints

## Drinks

**GET** `/drinks`  
Returns all drink items from the database.

---

### Products (Entrees)

**GET** `/products`  
Returns all entree product items.

---

## Desserts

**GET** `/desserts`  
Returns all dessert items.

**POST** `/desserts`  
Adds a new dessert item.

**Request Body**:
```json
{
  "product_id": 14,
  "product_name": "Bánh Trôi",
  "description": "Sticky rice dumpling with mung bean paste",
  "image": "https://...",
  "price": 2.99
}
```

**PUT** `/desserts/:id`  
Updates a dessert by its MongoDB `_id`.

**DELETE** `/desserts/:id`  
Deletes a dessert by its MongoDB `_id`.

---

## 🍺 Alcohol

**GET** `/alcohol`  
Returns all alcohol items.

**POST** `/alcohol`  
Adds a new alcohol item.

**Request Body**:
```json
{
  "product_id": 9,
  "name": "Tiger Beer",
  "description": "Singaporean lager...",
  "image": "https://...",
  "price": 2.99
}
```

---

### 🛒 Cart

**GET** `/cart`  
Returns the aggregated current session cart.

**GET** `/cart/:product_id`  
Returns a specific item in the cart by `product_id`.

**POST** `/cart`  
Adds item(s) to the cart. If the cart doesn't exist, it creates one.

**Request Body**:
```json
{
  "items": [
    {
      "product_id": 1,
      "product_name": "Pho",
      "quantity": 1,
      "image": "https://...",
      "price": 14.99
    }
  ]
}
```

**PUT** `/cart/:product_id`  
Updates the quantity of a specific item by `product_id`. If not found, it will be added.

**Request Body**:
```json
{
  "item": {
    "product_id": 1,
    "product_name": "Pho",
    "price": 14.99,
    "image": "https://..."
  },
  "increment": 1
}
```

**DELETE** `/cart`  
Clears all items in the current cart session.

**DELETE** `/cart/:product_id`  
Removes a specific item by `product_id`.

---

## Orders

**POST** `/orders`  
Submits a finalized customer order and clears the cart.

**Request Body**:
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "items": [
    {
      "product_id": 2,
      "product_name": "Larb",
      "quantity": 2,
      "price": 10.99
    }
  ]
}
```

**Response**:
```json
{
  "message": "Order placed",
  "orderId": "some-object-id"
}
```

---

## Inquiries

**POST** `/inquiries`  
Saves a contact form submission.

**Request Body**:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "message": "I want to book a party!"
}
```

**Response**:
```json
{
  "message": "Inquiry saved"
}
```





#### Data Flow
#### Data Flow

1. **Menu Pages**  
   Fetch item lists from:
   - `GET /products` (Entrees)
   - `GET /drinks`
   - `GET /desserts`

2. **Add to Cart**  
   Sends:
   ```json
   POST /cart
   {
     "items": [ { "product_id": 1, "product_name": "Pho", ... } ]
   }
   ```


3. **Cart Page**  
   - Fetches: `GET /cart`
   - Displays grouped items, total cost, fees, and taxes.

4. **Quantity Adjustments**
   - Clicking **“Add”** → `PUT /cart/:product_id` with `{ item, increment }`
   - Clicking **“Remove”** → `DELETE /cart/:product_id` (removes item from cart when quantity hits 0)

5. ### 💳 Payment & Order Summary Flow

1. **Frontend collects order data** (e.g., customer name, email, cart items).
2. On submission, it sends a `POST` request to the backend:

   **Endpoint:** `POST /orders`

   **Request Body:**
   ```json
   {
     "customer": {
       "name": "John Doe",
       "email": "john@example.com"
     },
     "items": [
       {
         "product_id": 1,
         "product_name": "Pho",
         "quantity": 2,
         "price": 14.99
       }
     ]
   }


6. **Contact Form Submission**
   - Sends:
   ```json
   POST /inquiries
   {
     "name": "User",
     "email": "user@example.com",
     "message": "I have a question!"
   }
   ```
