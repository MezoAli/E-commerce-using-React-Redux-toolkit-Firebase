require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

app.use(express.json());
app.use(cors());
const array = [];
const calculateOrderAmount = (items) => {
	items.map((item) => {
		const { price, quantaty } = item;
		const cartItemAmount = price * quantaty;
		return array.push(cartItemAmount);
	});

	const totalAmont = array.reduce((a, b) => {
		return a + b;
	}, 0);

	return totalAmont * 100;
};

app.get("/", (req, res) => {
	res.send("hello from backend");
});

app.post("/create-payment-intent", async (req, res) => {
	const { items, shippingDetails, description } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: "usd",
		automatic_payment_methods: {
			enabled: true,
		},
		description,
		shipping: {
			address: {
				line1: shippingDetails.line1,
				line2: shippingDetails.line2,
				city: shippingDetails.city,
				postal_code: shippingDetails.postal_code,
				country: shippingDetails.country,
			},
			name: shippingDetails.name,
			phone: shippingDetails.phone,
		},
		// receipt_email: userEmail,
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
