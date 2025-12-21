# 🔴 CRITICAL BACKEND FIX REQUIRED

## The Problem

Your backend code is **missing the Stripe SDK initialization**. You have the `/create-payment-intent` endpoint but the `stripe` variable is never defined, causing a 500 error.

## The Fix

### Step 1: Install Stripe Package (if not already installed)

```bash
cd backend
npm install stripe
```

### Step 2: Add Stripe Initialization

In your `backend/index.js` file, add this line **at the top** with your other requires:

```javascript
require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // ✅ ADD THIS LINE
const port = process.env.PORT || 3000;
```

### Step 3: Add Stripe Secret Key to Backend .env

Create or update `backend/.env` file:

```env
# Your existing variables...
MONGO_USER=your_mongo_user
MONGO_PASS=your_mongo_pass

# Add this:
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

**⚠️ IMPORTANT**: Get your **SECRET KEY** (starts with `sk_test_`) from:
https://dashboard.stripe.com/test/apikeys

**DO NOT** use the publishable key in the backend!

### Step 4: Fix Payment History Route

Your current route is:

```javascript
app.get("/payment-history", verifyJWT, async (req, res) => {
```

Change it to:

```javascript
app.get("/payment-history/:email", verifyJWT, async (req, res) => {
  try {
    const hrEmail = req.params.email;

    // Verify user is accessing their own data
    if (hrEmail !== req.email) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const payments = await db
      .collection("payments")
      .find({ hrEmail })
      .sort({ paymentDate: -1 })
      .toArray();

    res.json(payments);
  } catch (error) {
    console.error("Payment history error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
```

### Step 5: Improve Error Handling in Create Payment Intent

Update your `/create-payment-intent` endpoint:

```javascript
app.post("/create-payment-intent", verifyJWT, async (req, res) => {
  try {
    const { price } = req.body;

    if (!price || price <= 0) {
      return res.status(400).json({ error: "Invalid price" });
    }

    const amount = parseInt(price * 100); // Convert to cents

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        userEmail: req.email,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    res.status(500).json({
      error: error.message || "Payment intent creation failed",
    });
  }
});
```

## Complete Backend .env File

Your backend `.env` should look like this:

```env
# MongoDB
MONGO_USER=your_mongo_username
MONGO_PASS=your_mongo_password

# Stripe (Get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Server
PORT=3000
```

## Testing After Fix

1. **Restart your backend server**:

   ```bash
   cd backend
   npm start
   # or
   node index.js
   ```

2. **Check the console** - you should see:

   ```
   Server is running on port 3000
   Pinged your deployment. You successfully connected to MongoDB!
   ```

3. **Test the payment flow**:
   - Go to your frontend Packages page
   - Click "Upgrade Now"
   - Fill in test card: `4242 4242 4242 4242`
   - Any future date, any CVC
   - Click "Pay"

## What Each Key Does

### Frontend (.env)

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...  # ✅ Starts with pk_test_
```

- Used in the browser
- Safe to expose publicly
- Used to create payment UI

### Backend (.env)

```env
STRIPE_SECRET_KEY=sk_test_...  # ✅ Starts with sk_test_
```

- Used on the server
- **NEVER** expose publicly
- Used to create payment intents and process payments

## Quick Checklist

- [ ] Install `stripe` package in backend
- [ ] Add `const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);` to index.js
- [ ] Add `STRIPE_SECRET_KEY` to backend/.env
- [ ] Fix `/payment-history/:email` route
- [ ] Restart backend server
- [ ] Test payment flow

## Expected Result

After these fixes:

- ✅ No more 500 errors on `/create-payment-intent`
- ✅ No more 404 errors on `/payment-history/:email`
- ✅ Stripe payment modal works
- ✅ Real payments can be processed (test mode)

## Security Reminder

🔒 **Never commit your `.env` files to Git!**

Make sure your backend `.gitignore` includes:

```
.env
.env.local
.env.*.local
```
