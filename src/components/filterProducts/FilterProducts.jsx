import "./FilterProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { filterActions } from "../store/filterSlice";
function FilterProducts() {
	const products = useSelector((state) => state.products.productsList);
	const minPrice = useSelector((state) => state.products.minPrice);
	const maxPrice = useSelector((state) => state.products.maxPrice);
	const [category, setCategory] = useState("All");
	const [price, setPrice] = useState(3000);
	const dispatch = useDispatch();

	const categories = ["All", ...new Set(products.map((cat) => cat.category))];

	const filterByCategory = (cat) => {
		setCategory(cat);
		dispatch(filterActions.filterByCategory({ products, category: cat }));
	};

	useEffect(() => {
		dispatch(filterActions.filterByPrice({ products, price }));
	}, [products, price, dispatch]);

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
			<p className="text-center fw-bold">price : $ {price}</p>
			<div className="d-flex">
				<span className="mx-2 fw-bold">{minPrice}</span>
				<input
					type="range"
					min={minPrice}
					max={maxPrice}
					step="1"
					value={price}
					className=" w-75"
					onChange={(e) => setPrice(e.target.value)}
				/>
				<span className="mx-2 fw-bold">{maxPrice}</span>
			</div>
			<button
				className="btn btn-danger d-block my-3 m-auto"
				onClick={() => {
					dispatch(filterActions.clearFilter(products));
				}}
			>
				Clear Filter
			</button>
		</div>
	);
}

export default FilterProducts;
