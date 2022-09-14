import "./Home.css";
import useFetchCollection from "../../customHook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../store/orderSlice";
import { useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
function Home() {
	const dispatch = useDispatch();
	const totalOrders = useSelector((state) => state.orders.orderTotalAmounts);
	const { data: products } = useFetchCollection("products");
	const { data: orders } = useFetchCollection("orders");
	useEffect(() => {
		dispatch(orderActions.ADD_ORDERS_HISTORY(orders));
		dispatch(orderActions.CALC_TOTAL_EARNINGS());
	});
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: false,
				text: "Chart.js Bar Chart",
			},
		},
	};
	const labels = ["Order Placed", "Processing", "Shipped", "Delivered"];
	const placed = orders.filter((order) => {
		return order.orderStatus === "Order Placed...";
	}).length;
	const processing = orders.filter(
		(order) => order.orderStatus === "Processing..."
	).length;
	const shipped = orders.filter(
		(order) => order.orderStatus === "Shipped..."
	).length;
	const delivered = orders.filter(
		(order) => order.orderStatus === "Delivered"
	).length;

	const data = {
		labels,
		datasets: [
			{
				label: "Order Count",
				data: [placed, processing, shipped, delivered],
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	return (
		<>
			<h3 className="my-3">Admin Home</h3>
			<div className="row g-3 mb-5">
				<div className="col-sm-12 col-md-4 border border-primary">
					<h4 className="text-center mb-3">Earnings</h4>
					<div className="d-flex justify-content-between align-items-center">
						<b>{totalOrders}</b>
						<FaDollarSign />
					</div>
				</div>
				<div className="col-sm-12 col-md-4 border border-primary">
					<h4 className="text-center mb-3">Products</h4>
					<div className="d-flex justify-content-between align-items-center">
						<b>{products.length}</b>
						<FaCartPlus />
					</div>
				</div>
				<div className="col-sm-12 col-md-4 border border-primary">
					<h4 className="text-center mb-3">Orders</h4>
					<div className="d-flex justify-content-between align-items-center">
						<b>{orders.length}</b>
						<FaCartPlus />
					</div>
				</div>
			</div>
			<Bar options={options} data={data} />
		</>
	);
}

export default Home;
