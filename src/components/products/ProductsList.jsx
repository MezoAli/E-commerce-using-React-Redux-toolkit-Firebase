import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { filterActions } from "../store/filterSlice";

function ProductsList({ products }) {
	const filteredProducts = useSelector(
		(state) => state.filter.filteredProducts
	);
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(filterActions.filterBySearch({ products, search }));
	}, [search, dispatch, products]);

	return (
		<>
			{filteredProducts && (
				<div id="products">
					<h2 className="text-center text-success my-3">Our Products</h2>
					<input
						type="search"
						className="searchInput"
						placeholder="Search For Product / category or Brand"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<div className="row">
						{filteredProducts.map((product) => {
							return <SingleProduct key={product.id} product={product} />;
						})}
					</div>
				</div>
			)}
		</>
	);
}

export default ProductsList;
