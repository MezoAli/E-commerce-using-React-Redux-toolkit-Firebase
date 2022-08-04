import "./FilterProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { filterActions } from "../store/filterSlice";
function FilterProducts() {
	const products = useSelector((state) => state.products.productsList);
	const [category, setCategory] = useState("All");
	const dispatch = useDispatch();

	const categories = ["All", ...new Set(products.map((cat) => cat.category))];

	const filterByCategory = (cat) => {
		setCategory(cat);
		dispatch(filterActions.filterByCategory({ products, category: cat }));
	};

	return (
		<div className="filter-container">
			<h4 className="text-center text-success mt-5 mb-3">Categories</h4>
			{categories.map((cat, index) => {
				return (
					<button
						key={index}
						className={`btn btn-outline-success w-100 my-2 ${
							category === cat ? `btn-success text-light fw-bold fs-5` : null
						}`}
						onClick={() => filterByCategory(cat)}
					>
						{cat}
					</button>
				);
			})}
			<h5 className="text-center text-success mt-5 mb-3">Filter By Price</h5>
			<input
				type="range"
				min="10"
				max="10000"
				step="1"
				className="d-block w-100"
			/>
		</div>
	);
}

export default FilterProducts;
