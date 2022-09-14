import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
function ChangeStatusForm({ id, order }) {
	const {
		userId,
		cartItems,
		cartTotalAmount,
		orderDate,
		orderTime,
		userEmail,
		shippingAddress,
	} = order;
	const [status, setStatus] = useState("");
	const navigate = useNavigate();
	const handleChangeStatus = (e, id) => {
		e.preventDefault();
		const orderConfig = {
			userId,
			cartItems,
			cartTotalAmount,
			orderStatus: status,
			orderDate,
			orderTime,
			userEmail,
			shippingAddress,
			createdAt: order.createdAt,
			editedAt: Timestamp.now().toDate(),
		};
		try {
			setDoc(doc(database, "orders", id), orderConfig);
			toast.success("Product Status Changed Successfully");
			navigate("/admin/all-orders");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="status-container w-50 my-4 m-auto">
			<h4 className="mb-3 text-center">Change Status</h4>
			<form onSubmit={(e) => handleChangeStatus(e, id)}>
				<select
					className="mb-2"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option disabled value="--select order status--">
						--select order status--
					</option>
					<option value="Order Placed...">Order Placed</option>
					<option value="Processing...">Processing</option>
					<option value="Shipped...">Shipped</option>
					<option value="Delivered">Delivered</option>
				</select>
				<button type="submit" className="btn btn-info">
					Change Status
				</button>
			</form>
		</div>
	);
}

export default ChangeStatusForm;
