import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import "./Navbar.css";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function NavbarComp() {
	const dispatch = useDispatch();
	const cartQuantaty = useSelector((state) => state.cart.cartTotalQuantaty);
	const isLoggin = useSelector((state) => state.auth.isLoggedIn);
	const [userName, setUserName] = useState("");
	const navigate = useNavigate();

	// Mointor users
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if (user.displayName == null) {
					setUserName(user.email.substring(0, user.email.indexOf("@")));
				} else {
					setUserName(user.displayName);
				}
				dispatch(
					authActions.SET_ACTIVE_USER({
						email: user.email,
						userName: user.displayName,
						userId: user.uid,
					})
				);
				// const uid = user.uid;
				// console.log(uid);
				// ...
			} else {
				dispatch(authActions.REMOVE_ACTIVE_USER());
				setUserName("");
			}
		});
	});

	// handle Log Out
	const logoutUser = () => {
		signOut(auth)
			.then(() => {
				toast.success("Logout successfully.");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};
	return (
		<>
			<Navbar
				bg="dark"
				variant="dark"
				className="position-sticky top-0 left-0 navbar mb-2"
			>
				<Container>
					<NavLink to="/" className="navbar-brand">
						<Navbar.Brand>Mezo Store</Navbar.Brand>
					</NavLink>

					<Nav classNamevar="me-auto d-flex align-items-center">
						{isLoggin ? (
							<p className=" text-primary d-flex gap-1 align-items-center d-block my-1 pt-1">
								<FaUserCircle size={16} />
								<span>hi, {userName}</span>
							</p>
						) : null}
						<NavLink className="nav-link" to="/">
							Home
						</NavLink>
						<NavLink className="nav-link" to="/aboutus">
							About Us
						</NavLink>
						{isLoggin ? null : (
							<NavLink className="nav-link" to="/login">
								Login
							</NavLink>
						)}
						{isLoggin ? (
							<Link to="/" className="nav-link" onClick={logoutUser}>
								Log Out
							</Link>
						) : null}

						<NavLink className="nav-link position-relative" to="/cart">
							<FontAwesomeIcon icon={faCartPlus} />
							<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success fs-6 p-1">
								{cartQuantaty}
							</span>
						</NavLink>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default NavbarComp;
