import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/admin/navbar/Navbar";
import Home from "../../components/admin/home/Home";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import Orders from "../../components/admin/orders/Orders";
import "./Admin.css";
function Admin() {
	return (
		<div className="row">
			<div className="col-md-3">
				<Navbar />
			</div>
			<div className="col-md-9">
				<Routes>
					<Route path="home" element={<Home />} />
					<Route path="add-product" element={<AddProduct />} />
					<Route path="view-products" element={<ViewProducts />} />
					<Route path="all-orders" element={<Orders />} />
				</Routes>
			</div>
		</div>
	);
}

export default Admin;