import React from "react";
import { Link } from "react-router-dom";
function CheckoutSuccess() {
	return (
		<div>
			<h3>Payment Successful</h3>
			<p>Thank You For Your Purchase</p>
			<Link className="btn btn-outline-info" to="/order-history">
				View Order Status
			</Link>
		</div>
	);
}

export default CheckoutSuccess;
