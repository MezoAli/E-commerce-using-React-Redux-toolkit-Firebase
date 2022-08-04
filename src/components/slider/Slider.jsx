import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Bg1 from "../../assets/bg-1.jpg";
import Bg2 from "../../assets/bg-2.jpg";
import Bg3 from "../../assets/bg-3.jpg";
import "./Slider.css";

function Slider() {
	return (
		<Carousel>
			<Carousel.Item>
				<img className="d-block w-100 bg-images" src={Bg1} alt="First slide" />
				<Carousel.Caption className="slider-text">
					<h3>Wellcome To Our Store</h3>
					<a href="#products" className="btn btn-primary">
						Shop Now
					</a>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100 bg-images" src={Bg2} alt="Second slide" />

				<Carousel.Caption className="slider-text">
					<h3>Anything You Can Imagine</h3>
					<a href="#products" className="btn btn-primary">
						Shop Now
					</a>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100 bg-images" src={Bg3} alt="Third slide" />

				<Carousel.Caption className="slider-text">
					<h3>At Your Service 24 Houres</h3>
					<Link to="contactus" className="btn btn-primary">
						Contact Us
					</Link>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}

export default Slider;
