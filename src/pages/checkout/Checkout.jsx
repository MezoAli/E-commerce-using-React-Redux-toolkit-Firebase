import "./checkout.css";
import { CountryDropdown } from "react-country-region-selector";
import { useSelector } from "react-redux";
function Checkout() {
	const { cartItems } = useSelector((state) => state.cart);
	const { cartTotalBalance } = useSelector((state) => state.cart);
	return (
		<>
			{console.log(cartItems, cartTotalBalance)}
			<div>
				<h2 className="text-center mb-2">Checkout Details</h2>
				<form className="d-block">
					<div className="d-flex">
						<div className="check-container">
							<h3>Shipping Address</h3>
							<label>Recipient Name</label>
							<input
								type="text"
								placeholder="Recipient Name"
								required
								name="name"
							/>
							<label>Address line 1</label>
							<input
								type="text"
								placeholder="Address line 1"
								required
								name="line1"
							/>
							<label>Address line 2</label>
							<input type="text" placeholder="Address line 2" name="line2" />
							<label>City</label>
							<input type="text" placeholder="City" required name="city" />
							<label>State</label>
							<input type="text" placeholder="State" required name="state" />
							<label>Postal code</label>
							<input
								type="text"
								placeholder="Postal code"
								required
								name="postal_code"
							/>
							{/* COUNTRY INPUT */}
							<CountryDropdown valueType="short" />
							<label>Phone</label>
							<input type="text" placeholder="Phone" required name="phone" />
						</div>
					</div>
				</form>
				<div className="items-container">
					<div>
						{cartItems.map((item) => {
							return (
								<div className="single-item">
									<h6 title={item.title}>
										product : {item.title.substring(0, 12)}...
									</h6>
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
						<button className="btn btn-outline-success w-100 my-2">
							Proceed To Payment
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Checkout;
