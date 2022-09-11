import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../components/customHook/useFetchDocument";
import "./Order.css";
function OrderDetails() {
	const { id } = useParams();
	const { document: order } = useFetchDocument("orders", id);

	return (
		<>
			{console.log(order)}
			<h3>Order Details</h3>
			<Link to="/order-history" className="btn btn-outline-info py-2 my-2">
				Back TO Orders
			</Link>
			<p>
				<b>Order Id</b> : {id}
			</p>
			<p>
				<b>Order Amount</b> : ${order.cartTotalAmount}
			</p>
			<p>
				<b>Order Status</b> : {order.orderStatus}
			</p>
			<table>
				<thead>
					<tr className="border border-secondary">
						<th className="p-3 text-center">s/n</th>
						<th className="p-3 text-center">Product</th>
						<th className="p-3 text-center">Price</th>
						<th className="p-3 text-center">Quantaty</th>
						<th className="p-3 text-center">Total</th>
						<th className="p-3 text-center">Review</th>
					</tr>
				</thead>
				<tbody>
					{order &&
						order?.cartItems?.map((item, index) => {
							return (
								<tr key={item.id} className="border border-info">
									<td className="p-3 text-center">{index + 1}</td>
									{console.log(item)}
									<td className="p-3 text-center">
										<p>{item.title.substring(0, 35)}</p>
										<img
											src={item.imageURL}
											alt="prodcut-img"
											style={{ width: "75px", height: "75px" }}
										/>
									</td>
									<td className="p-3 text-center">${item.price}</td>
									<td className="p-3 text-center">{item.quantaty}</td>
									<td className="p-3 text-center">
										$ {item.quantaty * item.price}
									</td>
									<td className="p-3 text-center">
										<Link
											to={`/review-product/${item.id}`}
											className="btn btn-info"
										>
											Review Product
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
}

export default OrderDetails;
