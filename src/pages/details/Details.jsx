import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { cartActions } from "../../components/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../components/customHook/useFetchCollection";
import StarsRating from "react-star-rate";

import "./Details.css";

function Details() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [product, setProduct] = useState("");
	const products = useSelector((state) => state.products.productsList);
	const { data: reviews } = useFetchCollection("reviews");

	const productReview = reviews.filter((review) => {
		return review.productId === id;
	});

	useEffect(() => {
		const product = products.find((item) => {
			return item.id === id;
		});
		setProduct(product);
	});

	return (
		<>
			<div className="details-card">
				<img src={product?.imageURL} alt="productimage" />
				{console.log(reviews)}
				{console.log(productReview)}
				<div className="card-body">
					<h4 className="card-title text-center my-3">{product?.title}</h4>
					<h5 className="card-title text-center text-capitalize">
						{product?.category}
					</h5>

					<p className="card-text text-center">{product?.description}</p>
					<h4 className="card-text text-success text-center my-3">
						price : ${product?.price}
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
			<h3 className="text-center mb-2">Products Reviews</h3>
			{productReview.length !== 0 ? (
				<div className="w-75 m-auto">
					{productReview?.map((rev, index) => {
						return (
							<div key={index} className="review-container">
								<StarsRating value={rev?.rate} />
								<p>{rev?.review}</p>
								<b>{rev.reviewDate}</b>
								<br />
								<b>by : {rev.userName}</b>
							</div>
						);
					})}
				</div>
			) : (
				<p className=" text-capitalize fw-bold">
					No Reviews Yet For That Product
				</p>
			)}
		</>
	);
}

export default Details;
