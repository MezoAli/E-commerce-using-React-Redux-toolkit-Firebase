import "./checkout.css";
import { CountryDropdown } from "react-country-region-selector";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CheckoutDetails from "../../components/checkoutDetails/CheckoutDetails";
import { checkoutActions } from "../../components/store/checkoutSlice";
import { useNavigate } from "react-router-dom";
const initialState = {
	name: "",
	line1: "",
	line2: "",
	city: "",
	state: "",
	postal_code: "",
	country: "",
	phone: "",
};
function Checkout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [shippingDetails, setShippingDetails] = useState({
		...initialState,
	});
	const [billingDetails, setBillingDetails] = useState({
		...initialState,
	});

	const handleShippingDetails = (e) => {
		const { name, value } = e.target;
		setShippingDetails({
			...shippingDetails,
			[name]: value,
		});
	};
	const handleBillingDetails = (e) => {
		const { name, value } = e.target;
		setBillingDetails({
			...billingDetails,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(checkoutActions.addShippingAdress(shippingDetails));
		dispatch(checkoutActions.addBillingAdress(billingDetails));
		navigate("/checkout-summary");
	};
	return (
		<>
			<div>
				<h2 className="text-center mb-2">Checkout Details</h2>
				<div className="d-flex">
					<form className="d-block" onSubmit={handleSubmit}>
						<div className="d-flex">
							<div className="check-container">
								<h3 className="text-center">Shipping Address</h3>
								<label>Recipient Name</label>
								<input
									type="text"
									placeholder="Recipient Name"
									required
									name="name"
									value={shippingDetails.name}
									onChange={handleShippingDetails}
								/>
								<label>Address line 1</label>
								<input
									type="text"
									placeholder="Address line 1"
									required
									name="line1"
									value={shippingDetails.line1}
									onChange={handleShippingDetails}
								/>
								<label>Address line 2</label>
								<input
									type="text"
									placeholder="Address line 2"
									name="line2"
									value={shippingDetails.line2}
									onChange={handleShippingDetails}
								/>
								<label>City</label>
								<input
									type="text"
									placeholder="City"
									required
									name="city"
									value={shippingDetails.city}
									onChange={handleShippingDetails}
								/>
								<label>State</label>
								<input
									type="text"
									placeholder="State"
									required
									name="state"
									value={shippingDetails.state}
									onChange={handleShippingDetails}
								/>
								<label>Postal code</label>
								<input
									type="text"
									placeholder="Postal code"
									required
									name="postal_code"
									value={shippingDetails.postal_code}
									onChange={handleShippingDetails}
								/>
								{/* COUNTRY INPUT */}
								<label>Country</label>
								<CountryDropdown
									valueType="short"
									value={shippingDetails.country}
									onChange={(val) =>
										handleShippingDetails({
											target: {
												name: "country",
												value: val,
											},
										})
									}
								/>
								<label>Phone</label>
								<input
									type="text"
									placeholder="Phone"
									required
									name="phone"
									value={shippingDetails.phone}
									onChange={handleShippingDetails}
								/>

								<h3 className="my-3 text-center">Billing Address</h3>
								<label>Recipient Name</label>
								<input
									type="text"
									placeholder="Recipient Name"
									required
									name="name"
									value={billingDetails.name}
									onChange={handleBillingDetails}
								/>
								<label>Address line 1</label>
								<input
									type="text"
									placeholder="Address line 1"
									required
									name="line1"
									value={billingDetails.line1}
									onChange={handleBillingDetails}
								/>
								<label>Address line 2</label>
								<input
									type="text"
									placeholder="Address line 2"
									name="line2"
									value={billingDetails.line2}
									onChange={handleBillingDetails}
								/>
								<label>City</label>
								<input
									type="text"
									placeholder="City"
									required
									name="city"
									value={billingDetails.city}
									onChange={handleBillingDetails}
								/>
								<label>State</label>
								<input
									type="text"
									placeholder="State"
									required
									name="state"
									value={billingDetails.state}
									onChange={handleBillingDetails}
								/>
								<label>Postal code</label>
								<input
									type="text"
									placeholder="Postal code"
									required
									name="postal_code"
									value={billingDetails.postal_code}
									onChange={handleBillingDetails}
								/>
								{/* COUNTRY INPUT */}
								<label>Country</label>
								<CountryDropdown
									valueType="short"
									value={billingDetails.country}
									onChange={(val) =>
										handleBillingDetails({
											target: {
												name: "country",
												value: val,
											},
										})
									}
								/>
								<label>Phone</label>
								<input
									type="text"
									placeholder="Phone"
									required
									name="phone"
									value={billingDetails.phone}
									onChange={handleBillingDetails}
								/>
								<button
									className="btn btn-outline-success w-100 my-2"
									type="submit"
								>
									Proceed To Payment
								</button>
							</div>
						</div>
					</form>
					<CheckoutDetails />
				</div>
			</div>
		</>
	);
}

export default Checkout;
