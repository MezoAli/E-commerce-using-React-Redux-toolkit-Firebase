import Slider from "../../components/slider/Slider";
import Products from "../../components/products/Prodcuts";
import FilterProducts from "../../components/filterProducts/FilterProducts";

function Home() {
	return (
		<div className="main">
			<div className="slider-container">
				<Slider />
			</div>
			<div className="row">
				<div className="col-md-3">
					<FilterProducts />
				</div>
				<div className="col-md-9">
					<Products />
				</div>
			</div>
		</div>
	);
}

export default Home;
