import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SingleProduct from "./SingleProduct";
import { productsActions } from "../store/productSlice";
import useFetchCollection from "../customHook/useFetchCollection";

function Products() {
	const { data, isLoading } = useFetchCollection("products");
	const products = useSelector((state) => state.products.productsList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productsActions.addProducts({ products: data }));
	}, [dispatch, data]);

	return (
		<>
			{isLoading && <p>Loading ...</p>}
			{products && (
				<div id="products">
					<h2 className="text-center text-success my-3">Our Products</h2>
					<div className="row">
						{products.map((product) => {
							return <SingleProduct key={product.id} product={product} />;
						})}
					</div>
				</div>
			)}
		</>
	);
}

export default Products;
