import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../store/productSlice";
import SingleProduct from "./SingleProduct";
import { getCategories } from "../store/categoriesSlice";
import { productsActions } from "../store/productSlice";

function Products() {
	const products = useSelector((state) => state.products.filteredProducts);
	const isLoading = useSelector((state) => state.products.isLoading);
	const categories = useSelector((state) => state.categories.categoriesList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	return (
		<>
			<h2 className="text-center text-success my-3">Our Products</h2>
			<div className="d-flex justify-content-center mb-5">
				<button className="btn btn-dark mx-2">All</button>
				{categories.map((category, index) => {
					return (
						<button
							key={index}
							className="btn btn-dark mx-1"
							onClick={() => {
								dispatch(productsActions.filterProducts(`${category}`));
							}}
						>
							{category.toUpperCase()}
						</button>
					);
				})}
			</div>
			{isLoading ? (
				<p className="text-center my-5 fs-1">Loading...</p>
			) : (
				<div className="row">
					{products.map((product) => {
						return <SingleProduct key={product.id} product={product} />;
					})}
				</div>
			)}
		</>
	);
}

export default Products;
