import { Link } from "react-router-dom";

function SingleProduct({ product }) {
	return (
		<div className="col-md-4">
			<div class="card mb-3">
				<img
					src={product.imageURL}
					class="card-img-top"
					alt="product"
					height={250}
				/>
				<div class="card-body">
					<h5 class="card-title" title={product.title}>
						{product.title.substring(0, 12)}...
					</h5>
					<h5 class="card-title">{product.category}</h5>
					<p class="card-text">Price : $ {product.price} </p>
					<Link class="btn btn-dark w-100" to={"details/" + product.id}>
						Details
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SingleProduct;
