import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import "./Navbar.css";

function NavbarComp() {
	const cartQuantaty = useSelector((state) => state.cart.cartTotalQuantaty);
	return (
		<>
			<Navbar
				bg="dark"
				variant="dark"
				className="position-sticky top-0 left-0 navbar mb-2"
			>
				<Container>
					<Link to="/" className="navbar-brand">
						<Navbar.Brand>Mezo Store</Navbar.Brand>
					</Link>

					<Nav classNamevar="me-auto">
						<Link className="nav-link" to="/">
							Home
						</Link>
						<Link className="nav-link" to="/aboutus">
							About Us
						</Link>
						<Link className="nav-link" to="/cart">
							<i class="fa-solid fa-cart-shopping position-relative fs-5">
								<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success fs-6 p-1">
									{cartQuantaty}
								</span>
							</i>
						</Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default NavbarComp;