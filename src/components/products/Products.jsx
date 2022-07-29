import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../store/productSlice";
import SingleProduct from "./SingleProduct";
import { getCategories } from "../store/categoriesSlice";
import { productsActions } from "../store/productSlice";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

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
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<div className="d-flex justify-content-center mb-5">
						<button
							className="btn btn-dark mx-2"
							onClick={() => {
								dispatch(productsActions.getAllProducts());
							}}
						>
							All
						</button>
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
					<div className="row">
						{products.map((product) => {
							return <SingleProduct key={product.id} product={product} />;
						})}
					</div>
				</>
			)}
		</>
	);
}

export default Products;
