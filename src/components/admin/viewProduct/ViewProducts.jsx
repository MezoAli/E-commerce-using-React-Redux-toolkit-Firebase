import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import Notiflix from "notiflix";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "./ViewProducts.css";
import { database, storage } from "../../../firebase/config";
import { deleteObject, ref } from "firebase/storage";
import useFetchCollection from "../../customHook/useFetchCollection";
import { productsActions } from "../../store/productSlice";
function ViewProducts() {
	const { data, isLoading } = useFetchCollection("products");
	const products = useSelector((state) => state.products.productsList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productsActions.addProducts({ products: data }));
		console.log(data);
	}, [dispatch, data]);

	const confirmDelete = (id, imageURL, title) => {
		Notiflix.Confirm.show(
			"Delete Product !!!",
			"You Are About To Delete This Product?",
			"Delete",
			"Cancel",
			function okCb() {
				deleteItem(id, imageURL, title);
			},
			function cancelCb() {
				toast.warn("cancel product delete");
			},
			{
				width: "320px",
				borderRadius: "8px",
				titleColor: "orange",
				okButtonBackground: "red",
				cssAnimationStyle: "zoom",
			}
		);
	};

	const deleteItem = async (id, imageURL, title) => {
		try {
			await deleteDoc(doc(database, "products", id));
			const imageRef = ref(storage, imageURL);
			await deleteObject(imageRef);
			toast.success(`product ${title} deleted successfully`);
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div className="row">
			{isLoading && <p>Loading ...</p>}
			{products &&
				products.map((product, index) => {
					return (
						<div className="col-md-4 mb-2" key={index + 1}>
							<div class="card d-flex align-items-center">
								<div className="fs-4 p-3">Product No : {index + 1}</div>
								<img
									src={product.imageURL}
									className="viewproduct-image"
									alt="productimage"
								/>
								<div class="card-body text-center">
									<h5 class="card-title" title={product.title}>
										{product.title.substring(0, 12)} ...
									</h5>
									<p class="card-text fs-5">{product.category}</p>
									<p class="card-text fs-5">price : $ {product.price}</p>
									<div className="d-flex gap-3 justify-content-around">
										<Link to={`/admin/add-product/${product.id}`}>
											<FaEdit
												size={20}
												color="green"
												style={{ cursor: "pointer" }}
												title="Edit"
											/>
										</Link>

										<FaTrash
											size={20}
											color="red"
											style={{ cursor: "pointer" }}
											title="Delete"
											onClick={() =>
												confirmDelete(
													product.id,
													product.imageURL,
													product.title
												)
											}
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
