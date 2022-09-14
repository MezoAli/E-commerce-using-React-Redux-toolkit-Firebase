import "./Orders.css";
import useFetchCollection from "../../customHook/useFetchCollection";
import { useNavigate } from "react-router-dom";
function Orders() {
	const { data: orders } = useFetchCollection("orders");
	const navigate = useNavigate();
	console.log(orders);
	const handleClick = (id) => {
		navigate(`/admin/all-orders/${id}`);
	};
	return (
		<>
			<h3>All Orders</h3>
			<table>
				<thead>
					<tr className="border border-secondary">
						<th className="p-3 text-center">s/n</th>
						<th className="p-3 text-center">Date</th>
						<th className="p-3 text-center">Order Id</th>
						<th className="p-3 text-center">Order Amount</th>
						<th className="p-3 text-center">Order Status</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((item, index) => {
						const { id, cartTotalAmount, orderDate, orderTime, orderStatus } =
							item;
						return (
							<tr
								key={id}
								className="click-row border border-primary"
								onClick={() => handleClick(id)}
							>
								<td className="p-3 text-center">{index + 1}</td>
								<td className="p-3 text-center">
									{orderDate} at {orderTime}
								</td>
								<td className="p-3 text-center">{id}</td>
								<td className="p-3 text-center">$ {cartTotalAmount}</td>
								<td
									className={`p-3 text-center ${
										orderStatus === "Delivered" ? "delivered" : "placed"
									}`}
								>
									{orderStatus}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default Orders;
