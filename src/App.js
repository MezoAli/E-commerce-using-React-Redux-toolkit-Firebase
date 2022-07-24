import "./App.css";
import "animate.css/animate.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/main/Home";
import NavbarComp from "./components/navbar/Navbar";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./components/main/AboutUs";
import Cart from "./components/cart/Cart";
import Details from "./components/main/Details";
import { Provider } from "react-redux";
import { store } from "./components/store";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<Provider store={store}>
				<ToastContainer />
				<NavbarComp />
				<Container>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/aboutus" element={<AboutUs />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/details/:productId" element={<Details />} />
					</Routes>
				</Container>
			</Provider>
		</>
	);
}

export default App;
