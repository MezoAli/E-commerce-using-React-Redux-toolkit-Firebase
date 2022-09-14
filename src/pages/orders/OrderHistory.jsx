import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useFetchCollection from "../../components/customHook/useFetchCollection";
import { orderActions } from "../../components/store/orderSlice";
import "./Order.css";

function OrderHistory() {
	const dispatch = useDispatch();
	const { data, isLoading } = useFetchCollection("orders");
	const orders = useSelector((state) => state.orders.orderHistory);
	const userId = useSelector((state) => state.auth.userId);
	const navigate = useNavigate();

	const userOrders = orders.filter((order) => order.userId === userId);
	useEffect(() => {
		dispatch(orderActions.ADD_ORDERS_HISTORY(data));
		dispatch(orderActions.CALC_TOTAL_EARNINGS());
	}, [dispatch, data]);

	const handleClick = (id) => {
		navigate(`/order-details/${id}`);
	};

	return (
		<>
			<h3>Order History</h3>

			{userOrders.length === 0 ? (
				<p>You Have No Previous Orders</p>
			) : (
				<>
					<p>
						Open an order to leave a <b>Product Review</b>
					</p>
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
							{isLoading && <p>Loading...</p>}
							{userOrders.map((item, index) => {
								const {
									id,
									cartTotalAmount,
									orderDate,
									orderTime,
									orderStatus,
								} = item;
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
												orderStatus === "Delivered"
													? "delivered fw-bold"
													: "placed"
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
			)}
		</>
	);
}

export default OrderHistory;
