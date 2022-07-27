import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import "./Details.css";

function Details() {
	const { productId } = useParams();
	const [product, setProduct] = useState("");
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		fetch(`https://fakestoreapi.com/products/${productId}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
				setLoading(false);
			});
	}, [productId]);
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="details-card">
					<img src={product.image} className="" alt="productimage" />
					<div className="card-body">
						<h5 className="card-title text-center text-capitalize">
							{product.category}
						</h5>
						<h5 className="card-title text-center my-3">{product.title}</h5>
						<p className="card-text text-center">{product.description}</p>
						<h4 className="card-text text-success text-center my-3">
							price : ${product.price}
						</h4>
						<Link
							className="btn btn-dark w-100"
							onClick={() => {
								dispatch(cartActions.addToCart(product));
							}}
							to="/cart"
						>
							Add To Cart
						</Link>
					</div>
				</div>
			)}
		</>
	);
}

export default Details;
