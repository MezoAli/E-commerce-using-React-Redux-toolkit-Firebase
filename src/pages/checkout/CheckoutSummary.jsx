import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../components/store/cartSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutDetails/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutSummary() {
	const dispatch = useDispatch();
	const [clientSecret, setClientSecret] = useState("");
	const [message, setMessage] = useState("Initializing Checkout");
	const cartItems = useSelector((state) => state.cart.cartItems);
	const cartQuantaty = useSelector((state) => state.cart.cartTotalQuantaty);
	const userEmail = useSelector((state) => state.auth.email);
	const shippingAdress = useSelector((state) => state.checkout.shippingAdress);
	const billingAdress = useSelector((state) => state.checkout.billingAdress);

	const description = `mezo shop payment : userEmail : ${userEmail} , Amount : ${cartQuantaty}`;

	useEffect(() => {
		dispatch(cartActions.handleQuantatyAndTotals());
	}, [dispatch, cartItems]);

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("http://localhost:4242/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				items: cartItems,
				userEmail,
				shippingDetails: shippingAdress,
				billingDetails: billingAdress,
				description,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return res.json().then((json) => Promise.reject(json));
			})
			.then((data) => setClientSecret(data.clientSecret))
			.catch((error) => {
				setMessage("failed to initialize checkout");
				toast.error("Something Went Wrong");
			});
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};
	return (
		<>
			{!clientSecret && <h3>{message}</h3>}
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</>
	);
}

export default CheckoutSummary;
