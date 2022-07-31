import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ViewProducts.css";
import { database } from "../../../firebase/config";
function ViewProducts() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		getProdcuts();
	}, []);

	const getProdcuts = () => {
		try {
			const productsRef = collection(database, "products");
			const q = query(productsRef, orderBy("createdAt", "desc"));

			onSnapshot(q, (snapshot) => {
				const allProdcuts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProducts(allProdcuts);
			});
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div className="row">
			{products.map((product, index) => {
				return (
					<div className="col-md-4" key={index + 1}>
						<div class="card d-flex align-items-center">
							<div className="fs-4 p-3">Product No : {index + 1}</div>
							<img
								src={product.imageURL}
								className="viewproduct-image"
								alt="productimage"
							/>
							<div class="card-body text-center">
								<h5 class="card-title" title={product.title}>
									{product.title.substring(0, 12)}
								</h5>
								<p class="card-text fs-5">{product.category}</p>
								<p class="card-text fs-5">$ {product.price}</p>
								<div className="d-flex gap-3 justify-content-around">
									<FaEdit
										size={20}
										color="green"
										style={{ cursor: "pointer" }}
										title="Edit"
									/>
									<FaTrash
										size={20}
										color="red"
										style={{ cursor: "pointer" }}
										title="Delete"
									/>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ViewProducts;
