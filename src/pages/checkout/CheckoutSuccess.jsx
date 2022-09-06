import React from "react";
import { Link } from "react-router-dom";
function CheckoutSuccess() {
	return (
		<div>
			<h3>Payment Successful</h3>
			<p>Thank You</p>
			<button className="btn btn-outline-info">
				<Link to="/order-history">View Orders</Link>
			</button>
		</div>
	);
}

export default CheckoutSuccess;
