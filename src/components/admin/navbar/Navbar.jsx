import "./Navbar.css";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
function Navbar() {
	const userName = useSelector((state) => state.auth.userName);
	return (
		<>
			<div className="admin-nav-container">
				<div className="bg-primary text-light d-flex flex-column g-3 align-items-center user-container">
					<FaUserCircle size={40} />
					<h3>{userName}</h3>
				</div>
				<Nav className="admin-nav">
					<NavLink to="home" className="nav-link d-block text-dark text-center">
						Home
					</NavLink>
					<NavLink
						to="view-products"
						className="nav-link d-block text-dark text-center"
					>
						View Products
					</NavLink>
					<NavLink
						to="all-orders"
						className="nav-link d-block text-dark text-center"
					>
						All Orders
					</NavLink>
					<NavLink
						to="add-product"
						className="nav-link d-block text-dark text-center"
					>
						Add Product
					</NavLink>
				</Nav>
			</div>
		</>
	);
}

export default Navbar;
