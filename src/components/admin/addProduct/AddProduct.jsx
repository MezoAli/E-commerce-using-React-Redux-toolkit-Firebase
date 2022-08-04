import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AddProduct.css";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { database, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";

const categories = [
	"men's clothing",
	"women's clothing",
	"jewelery",
	"electronics",
];

const initialState = {
	title: "",
	imageURL: "",
	price: 0,
	category: "",
	company: "",
	description: "",
};

function AddProduct() {
	const { id } = useParams();
	const newProductsList = useSelector((state) => state.products.productsList);
	const itemToEdit = newProductsList.find((item) => item.id === id);

	const detectForm = (id, f1, f2) => {
		if (id === "ADD") {
			return f1;
		} else {
			return f2;
		}
	};
	const navigate = useNavigate();
	const [product, setProduct] = useState(() => {
		const newState = detectForm(
			id,
			{
				...initialState,
			},
			{ ...itemToEdit }
		);
		return newState;
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProduct({
			...product,
			[name]: value,
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const storageRef = ref(storage, `Mezoshop/${Date.now()}${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// const progress =
				// 	(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				toast.error(error.message);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setProduct({ ...product, imageURL: downloadURL });
					toast.success("Image uploaded successfully.");
				});
			}
		);
	};
	const handleAddProduct = (e) => {
		e.preventDefault();
		try {
			addDoc(collection(database, "products"), {
				title: product.title,
				imageURL: product.imageURL,
				price: Number(product.price),
				category: product.category,
				company: product.company,
				description: product.description,
				createdAt: Timestamp.now().toDate(),
			});
			toast.success("Successfully Add Product");
			setProduct({ ...initialState });
			navigate("/admin/view-products");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const editProduct = (e) => {
		e.preventDefault();
		if (product.imageURL !== itemToEdit.imageURL) {
			const imageRef = ref(storage, itemToEdit.imageURL);
			deleteObject(imageRef);
		}
		try {
			setDoc(doc(database, "products", id), {
				title: product.title,
				imageURL: product.imageURL,
				price: Number(product.price),
				category: product.category,
				company: product.company,
				description: product.description,
				createdAt: itemToEdit.createdAt,
				editedAt: Timestamp.now().toDate(),
			});
			toast.success("Product Edited Successfully");
			navigate("/admin/view-products");
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<>
			<form
				className="add-product-container d-flex flex-column g-5 align-items-start justify-content-center"
				onSubmit={detectForm(id, handleAddProduct, editProduct)}
			>
				<h2 className="text-center mb-2">
					{detectForm(id, "Add Product", "Edit Product")}
				</h2>
				<label>Product Title</label>

				<input
					type="text"
					placeholder="Enter Product Title ..."
					name="title"
					required
					value={product.title}
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
				<label>Product Image</label>
				<input
					type="file"
					accept="image/*"
					placeholder="Product Image"
					name="image"
					onChange={(e) => handleImageChange(e)}
				/>
				{product.imageURL === "" ? null : (
					<input
						type="text"
						style={{ width: "100%" }}
						placeholder="Image URL"
						name="imageURL"
						value={product.imageURL}
						disabled
					/>
				)}
				<label>Product Price</label>
				<input
					type="number"
					min="0"
					max="10000"
					step="0.5"
					name="price"
					required
					value={product.price}
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
				<label>Product Category:</label>
				<select
					required
					name="category"
					value={product.category}
					onChange={(e) => {
						handleInputChange(e);
					}}
				>
					<option disabled>-- Select From Below Category</option>
					{categories.map((item, index) => {
						return <option key={index}>{item}</option>;
					})}
				</select>

				<label>Product Company/Brand</label>
				<input
					type="text"
					placeholder="Enter Product Company ..."
					name="company"
					required
					value={product.company}
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
				<label>Product Description</label>
				<textarea
					cols="42"
					rows="5"
					name="description"
					required
					value={product.description}
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
				<button className="btn btn-primary mt-3">
					{detectForm(id, "Add Product", "Save Changes")}
				</button>
			</form>
		</>
	);
}

export default AddProduct;
