import "./Home.css";
import Products from "./Products";
import Slider from "./Slider";

function Home() {
	return (
		<div className="main">
			<div className="slider-container">
				<Slider />
			</div>
			<Products />
		</div>
	);
}

export default Home;
