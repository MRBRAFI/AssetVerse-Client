# Stripe Payment Integration - Setup Guide

## Issues Found and Fixed

### 1. **Missing Stripe Integration**
- **Problem**: The `Packages.jsx` component was using mock data and `setTimeout` to simulate payments
- **Solution**: Integrated actual Stripe Elements and CheckoutForm component

### 2. **No Stripe Elements Provider**
- **Problem**: CheckoutForm uses `useStripe()` and `useElements()` hooks without a provider
- **Solution**: Wrapped CheckoutForm in `<Elements stripe={stripePromise}>` provider

### 3. **Missing Environment Variables**
- **Problem**: No Stripe publishable key configured
- **Solution**: Added `.env.example` file with required variables

### 4. **No API Integration**
- **Problem**: Component wasn't fetching real data from backend
- **Solution**: Added API calls to fetch packages, user data, and payment history

## Setup Instructions

### Frontend Setup

1. **Install Dependencies** (Already installed based on package.json)
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Stripe publishable key:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
   - Get your key from: https://dashboard.stripe.com/test/apikeys

### Backend Setup (Required)

You need to create these backend endpoints:

#### 1. **GET /packages**
Returns available subscription packages:
```javascript
// Example response
[
  {
    _id: "1",
    name: "Basic",
    employeeLimit: 5,
    price: 5,
    features: ["Asset Tracking", "Employee Management", "Basic Support"]
  },
  {
    _id: "2",
    name: "Standard",
    employeeLimit: 10,
    price: 8,
    features: ["All Basic features", "Advanced Analytics", "Priority Support"]
  },
  {
    _id: "3",
    name: "Premium",
    employeeLimit: 20,
    price: 15,
    features: ["All Standard features", "Custom Branding", "24/7 Support"]
  }
]
```

#### 2. **POST /create-payment-intent**
Creates a Stripe PaymentIntent:
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-payment-intent', async (req, res) => {
  const { price } = req.body;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100, // Convert to cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
    
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
```

#### 3. **POST /upgrade-package**
Handles package upgrade after successful payment:
```javascript
app.post('/upgrade-package', async (req, res) => {
  const { packageName, employeeLimit, price, transactionId, paymentStatus } = req.body;
  const userEmail = req.user.email; // From auth middleware
  
  try {
    // Update user's subscription
    await User.updateOne(
      { email: userEmail },
      {
        $set: {
          subscription: packageName.toLowerCase(),
          packageLimit: employeeLimit
        }
      }
    );
    
    // Save payment record
    await Payment.create({
      userEmail,
      packageName,
      amount: price,
      transactionId,
      paymentStatus,
      paymentDate: new Date()
    });
    
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
```

#### 4. **GET /payment-history/:email**
Returns user's payment history:
```javascript
app.get('/payment-history/:email', async (req, res) => {
  const { email } = req.params;
  
  try {
    const payments = await Payment.find({ userEmail: email })
      .sort({ paymentDate: -1 })
      .limit(10);
    
    res.send(payments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
```

### Backend Environment Variables

Add to your backend `.env`:
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## Testing the Integration

### Test Card Numbers (Stripe Test Mode)

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

Use any future expiry date, any 3-digit CVC, and any ZIP code.

### Testing Flow

1. Navigate to the Packages page in your dashboard
2. Click "Upgrade Now" on a package different from your current one
3. Fill in the test card details in the modal
4. Click "Pay $X"
5. Payment should process and update your subscription

## Common Issues and Solutions

### Issue 1: "Stripe has not been properly initialized"
**Solution**: Make sure `VITE_STRIPE_PUBLISHABLE_KEY` is set in your `.env` file

### Issue 2: "Failed to initialize payment"
**Solution**: Check that your backend `/create-payment-intent` endpoint is working and returning a `clientSecret`

### Issue 3: "Payment succeeded but upgrade failed"
**Solution**: Check your backend `/upgrade-package` endpoint and database connection

### Issue 4: CORS errors
**Solution**: Make sure your backend allows requests from your frontend origin:
```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Dashboard/
│   │       └── CheckoutForm.jsx (Stripe payment form)
│   ├── pages/
│   │   └── Dashboard/
│   │       └── HR/
│   │           └── Packages.jsx (Main package selection page)
│   └── hooks/
│       ├── useAuth.jsx
│       └── useAxiosSecure.jsx
├── .env (Your actual environment variables)
└── .env.example (Template)
```

## Next Steps

1. ✅ Set up your Stripe account at https://stripe.com
2. ✅ Get your API keys from the Stripe Dashboard
3. ✅ Add the publishable key to your frontend `.env`
4. ✅ Add the secret key to your backend `.env`
5. ✅ Implement the required backend endpoints
6. ✅ Test with Stripe test cards
7. ✅ Switch to live mode when ready for production

## Security Notes

- ⚠️ **Never** commit your `.env` file to version control
- ⚠️ **Never** expose your Stripe secret key in the frontend
- ⚠️ Always validate payments on the backend
- ⚠️ Use webhook events for production to handle payment confirmations
