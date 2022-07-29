import Slider from "../../components/slider/Slider";
import Products from "../../components/products/Products";

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
