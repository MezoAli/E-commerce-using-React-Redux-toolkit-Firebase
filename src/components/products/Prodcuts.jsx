import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productsActions } from "../store/productSlice";
import useFetchCollection from "../customHook/useFetchCollection";
import ProductsList from "./ProductsList";

function Products() {
	const { data, isLoading } = useFetchCollection("products");
	const products = useSelector((state) => state.products.productsList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productsActions.addProducts({ products: data }));
	}, [dispatch, data, products]);

	return (
		<>
			{isLoading && <p>Loading ...</p>}
			<ProductsList products={products} />
		</>
	);
}

export default Products;
