import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import { filterActions } from "../store/filterSlice";
import Pagination from "../pagination/Pagination";

function ProductsList({ products }) {
	const filteredProducts = useSelector(
		(state) => state.filter.filteredProducts
	);
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 9;

	const indexOfLastProduct = productsPerPage * currentPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	useEffect(() => {
		dispatch(filterActions.filterBySearch({ products, search }));
	}, [search, dispatch, products]);

	return (
		<>
			{currentProducts && (
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
						{currentProducts.map((product) => {
							return <SingleProduct key={product.id} product={product} />;
						})}
					</div>
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						productsPerPage={productsPerPage}
						totalProducts={filteredProducts.length}
					/>
				</div>
			)}
		</>
	);
}

export default ProductsList;
