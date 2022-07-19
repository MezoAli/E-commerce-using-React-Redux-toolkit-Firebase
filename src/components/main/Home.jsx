import logo from "../../hero.jpg";
import "./Home.css";
import { Link } from "react-router-dom";
import Products from "./Products";

function Home() {
	return (
		<div className="main">
			<div className="position-relative">
				<img src={logo} alt="hero" className="hero" />
				<h1 className="text-capitalize position-absolute hero-h1">
					wellcome to your online store
				</h1>
				<Link
					className="btn btn-dark text-capitalize position-absolute hero-btn"
					to="/aboutus"
				>
					about us
				</Link>
			</div>
			<Products />
		</div>
	);
}

export default Home;
