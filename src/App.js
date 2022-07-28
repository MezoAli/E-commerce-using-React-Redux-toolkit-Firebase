import "./App.css";
import "animate.css/animate.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/main/Home";
import NavbarComp from "./components/navbar/Navbar";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Details from "./components/main/Details";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import { Provider } from "react-redux";
import { store } from "./components/store";
import { ToastContainer } from "react-toastify";
import Checkout from "./components/checkout/Checkout";
import ContactUs from "./components/main/ContactUs";

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
						<Route path="/details/:productId" element={<Details />} />
					</Routes>
				</Container>
			</Provider>
		</>
	);
}

export default App;
