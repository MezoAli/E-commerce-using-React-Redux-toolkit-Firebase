import { useParams, useNavigate } from "react-router-dom";
import useFetchDocument from "../../components/customHook/useFetchDocument";
import StarsRating from "react-star-rate";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "../../firebase/config";
import { toast } from "react-toastify";
function OrderReview() {
	const [rate, setRate] = useState(0);
	const [review, setReview] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();
	const { document: product } = useFetchDocument("products", id);
	const userName = useSelector((state) => state.auth.userName);
	const userId = useSelector((state) => state.auth.userId);

	const handleAddReview = (e) => {
		e.preventDefault();
		const today = new Date();
		const date = today.toDateString();
		try {
			addDoc(collection(database, "reviews"), {
				productId: id,
				userId,
				userName,
				reviewDate: date,
				rate,
				review,
				createdAt: Timestamp.now().toDate(),
			});
			toast.success("Review Added Successfully");
			navigate("/");
			setRate(0);
			setReview("");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className="d-flex flex-column g-3">
				<h3 className="mb-3">Rate this Product</h3>
				<span>
					<b>Product Name : </b>
					{product.title}
				</span>
				<br />
				<img
					src={product.imageURL}
					alt={product.title}
					style={{ width: "200px" }}
				/>
				{console.log(product)}
			</div>
			<form className="align-items-start" onSubmit={(e) => handleAddReview(e)}>
				<b>Rating : </b>
				<StarsRating
					value={rate}
					onChange={(value) => {
						setRate(value);
					}}
				/>
				<b>Review</b>
				<textarea
					required
					cols="30"
					rows="10"
					value={review}
					onChange={(e) => setReview(e.target.value)}
				/>
				<button type="submit" className="btn btn-primary pt-2 my-2">
					Submit Review
				</button>
			</form>
		</>
	);
}

export default OrderReview;
