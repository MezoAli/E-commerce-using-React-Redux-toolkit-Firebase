import React from "react";
import { useSelector } from "react-redux";
import "./CheckoutDetails.css";

function CheckoutDetails() {
	const { cartItems } = useSelector((state) => state.cart);
	const { cartTotalBalance } = useSelector((state) => state.cart);

	return (
		<div className="items-container">
			<div>
				<h4 className="text-center pb-3">Checkout Summary</h4>
				{cartItems.map((item, index) => {
					return (
						<div key={index} className="single-item">
							<h6 title={item.title}>product : {item.title}</h6>
							<h6>amount : {item.quantaty}</h6>
							<h6>price : {item.quantaty * item.price} $</h6>
						</div>
					);
				})}
			</div>

			<div>
				<h6>Subtotal : {cartTotalBalance.toFixed(1)} $</h6>
				<h6>Taxes (14%) : {(cartTotalBalance * 0.14).toFixed(1)} $</h6>
				<h5>Total : {(cartTotalBalance * 1.14).toFixed(1)} $</h5>
			</div>
		</div>
	);
}

export default CheckoutDetails;
