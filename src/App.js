import "./App.css";
import "animate.css/animate.css";
import "react-toastify/dist/ReactToastify.css";
import NavbarComp from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contact/ContactUs";
import Checkout from "./pages/checkout/Checkout";
import Details from "./pages/details/Details";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import { Provider } from "react-redux";
import { store } from "./components/store";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/cart/Cart";
import Admin from "./pages/admin/Admin";
import AdminOnly from "./components/adminOnly/AdminOnly";
import CheckoutSummary from "./pages/checkout/CheckoutSummary";

function App() {
	return (
		<>
			<Provider store={store}>
				<ToastContainer />
				<NavbarComp />
				<Container>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/contactus" element={<ContactUs />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/reset" element={<Reset />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/checkout-summary" element={<CheckoutSummary />} />
						<Route path="/details/:productId" element={<Details />} />
						<Route
							path="/admin/*"
							element={
								<AdminOnly>
									<Admin />
								</AdminOnly>
							}
						/>
					</Routes>
				</Container>
			</Provider>
		</>
	);
}

export default App;
