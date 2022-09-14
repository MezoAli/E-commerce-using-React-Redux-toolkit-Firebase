import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHook/useFetchDocument";
import ChangeStatusForm from "./ChangeStatusForm";

function OrdersDetails() {
	const { id } = useParams();
	const { document: order } = useFetchDocument("orders", id);
	return (
		<>
			<h3 className="mb-4">Order Details</h3>
			<Link to="/admin/all-orders" className="btn btn-outline-info mb-3">
				Back to Orders
			</Link>
			<br />
			<b className="mb-3">Order Id : </b> {id}
			<br />
			<b className="mb-3">Order Amount : </b> $ {order.cartTotalAmount}
			<br />
			<b className="mb-3">Order Status : </b> {order.orderStatus}
			<br />
			<b className="mb-3">Shippment Adress : </b>
			<p>
				Adress : {order.shippingAddress?.line1},{order.shippingAddress?.line2},
				{order.shippingAddress?.city}
			</p>
			<p>State : {order.shippingAddress?.state}</p>
			<p>Country : {order.shippingAddress?.country}</p>
			<br />
			<table>
				<thead>
					<tr className="border border-secondary">
						<th className="p-3 text-center">s/n</th>
						<th className="p-3 text-center">Product</th>
						<th className="p-3 text-center">Price</th>
						<th className="p-3 text-center">Quantaty</th>
						<th className="p-3 text-center">Total</th>
					</tr>
				</thead>
				<tbody>
					{order &&
						order?.cartItems?.map((item, index) => {
							return (
								<tr key={item.id} className="border border-info mb-2">
									<td className="p-3 text-center">{index + 1}</td>
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
								</tr>
							);
						})}
				</tbody>
			</table>
			<ChangeStatusForm id={id} order={order} />
		</>
	);
}

export default OrdersDetails;
