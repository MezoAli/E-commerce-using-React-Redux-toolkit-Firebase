import React, { useEffect, useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import CheckoutDetails from "./CheckoutDetails";
import spinnerImage from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "../../firebase/config";
import { cartActions } from "../store/cartSlice";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.userId);
	const userEmail = useSelector((state) => state.auth.email);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const cartTotalAmount = useSelector((state) => state.cart.cartTotalBalance);
	const shippingAddress = useSelector((state) => state.checkout.shippingAdress);
	const orderStatus = "Order Placed...";

	const saveOrder = () => {
		const today = new Date();
		const orderDate = today.toDateString();
		const orderTime = today.toLocaleTimeString();
		const orderConfig = {
			userId,
			cartItems,
			cartTotalAmount,
			orderStatus,
			orderDate,
			orderTime,
			userEmail,
			shippingAddress,
			createdAt: Timestamp.now().toDate(),
		};
		try {
			addDoc(collection(database, "orders"), orderConfig);
			dispatch(cartActions.setCartOnLogout());
			navigate("/checkout-success");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		// stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
		// 	switch (paymentIntent.status) {
		// 		case "succeeded":
		// 			setMessage("Payment succeeded!");
		// 			break;
		// 		case "processing":
		// 			setMessage("Your payment is processing.");
		// 			break;
		// 		case "requires_payment_method":
		// 			setMessage("Your payment was not successful, please try again.");
		// 			break;
		// 		default:
		// 			setMessage("Something went wrong.");
		// 			break;
		// 	}
		// });
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const confirmPayment = await stripe
			.confirmPayment({
				elements,
				confirmParams: {
					// Make sure to change this to your payment completion page
					return_url: "http://localhost:3000/checkout-success",
				},
				redirect: "if_required",
			})
			.then((result) => {
				if (result.error) {
					toast.error(result.error.message);
					setMessage(result.error.message);
					return;
				}
				if (result.paymentIntent) {
					if (result.paymentIntent.status === "succeeded") {
						setIsLoading(false);
						toast.success("payment successful");
						saveOrder();
					}
				}
			});

		setIsLoading(false);
	};

	return (
		<section>
			<h2>Checkout</h2>
			<div className="d-flex">
				<CheckoutDetails />
				<form className="pay-form" onSubmit={handleSubmit}>
					<div>
						<h3>Stripe Checkout</h3>
						<PaymentElement id="payment-element" />
						<button
							disabled={isLoading || !stripe || !elements}
							id="submit"
							className="btn btn-outline-success w-100 my-3"
						>
							<span id="button-text">
								{isLoading ? (
									<img
										src={spinnerImage}
										alt="loading..."
										style={{ width: "20px" }}
									/>
								) : (
									"Pay now"
								)}
							</span>
						</button>
						{/* Show any error or success messages */}
						{message && <div id="payment-message">{message}</div>}
					</div>
				</form>
			</div>
		</section>
	);
};

export default CheckoutForm;
