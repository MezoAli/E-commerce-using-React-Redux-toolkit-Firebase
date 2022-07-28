import Carousel from "react-bootstrap/Carousel";
import Bg1 from "../../assets/bg-1.jpg";
import Bg2 from "../../assets/bg-2.jpg";
import Bg3 from "../../assets/bg-3.jpg";
import "./Home.css";

function Slider() {
	return (
		<Carousel>
			<Carousel.Item>
				<img className="d-block w-100 bg-images" src={Bg1} alt="First slide" />
				<Carousel.Caption>
					<h3 className="slider-text">Wellcome To Our Store</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100 bg-images" src={Bg2} alt="Second slide" />

				<Carousel.Caption>
					<h3 className="slider-text">Anything You Can Imagine</h3>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100 bg-images" src={Bg3} alt="Third slide" />

				<Carousel.Caption>
					<h3 className="slider-text">At Your Service 24 Houres</h3>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}

export default Slider;
