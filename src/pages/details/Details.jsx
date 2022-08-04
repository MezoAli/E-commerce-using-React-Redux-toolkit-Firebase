import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import { cartActions } from "../../components/store/cartSlice";
// import { doc, getDoc } from "firebase/firestore";
// import { database } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";

import "./Details.css";

function Details() {
	const { productId } = useParams();
	const dispatch = useDispatch();
	const [product, setProduct] = useState("");
	const products = useSelector((state) => state.products.productsList);

	useEffect(() => {
		const product = products.find((item) => {
			return item.id === productId;
		});
		setProduct(product);
	});

	// useEffect(() => {
	// 	getProduct();
	// }, []);
	// const getProduct = async () => {
	// 	try {
	// 		const productRef = doc(database, "products", productId);
	// 		const docSnap = await getDoc(productRef);
	// 		if (docSnap.exists()) {
	// 			setProduct(() => docSnap.data());
	// 		}
	// 	} catch (error) {
	// 		toast.error(error.message);
	// 	}
	// };

	return (
		<>
			<div className="details-card">
				<img src={product.imageURL} alt="productimage" />
				<div className="card-body">
					<h4 className="card-title text-center my-3">{product.title}</h4>
					<h5 className="card-title text-center text-capitalize">
						{product.category}
					</h5>

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
		</>
	);
}

export default Details;
