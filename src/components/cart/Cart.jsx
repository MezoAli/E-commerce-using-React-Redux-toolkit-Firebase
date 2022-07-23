import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { useEffect } from "react";

function Cart() {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const cartTotalBalance = useSelector((state) => state.cart.cartTotalBalance);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(cartActions.handleQuantatyAndTotals());
	});

	return (
		<>
			{cartItems.length === 0 ? (
				<h3 className="text-center text-success my-5">Your cart in empty</h3>
			) : (
				<div className="titles-container">
					<p className="fs-5">product image</p>
					<p className="fs-5">title</p>
					<p className="fs-5">price</p>
					<p className="fs-5">quantaty</p>
					<p className="fs-5">remove</p>
					<p className="fs-5">totals</p>
				</div>
			)}
			{cartItems.map((product) => {
				return (
					<div className="cart-container mb-3" key={product.id}>
						<img src={product.image} className="" alt="productimage" />
						<h5
							className="card-title text-center text-capitalize"
							title={product.title}
						>
							{product.title.substring(0, 12)}
						</h5>
						<h5 className="card-text text-success text-center text-capitalize">
							${product.price}
						</h5>
						<div className="quantaty-container d-flex align-items-center justify-content-center">
							<span
								className="pointer"
								onClick={() => {
									dispatch(cartActions.decreaseItemQuantaty(product));
								}}
							>
								<FontAwesomeIcon icon={faMinus} />
							</span>
							<h5 className="card-text text-success fs-4 mx-3">
								{product.quantaty}
							</h5>
							<span
								className="pointer"
								onClick={() =>
									dispatch(cartActions.increaseItemQuantaty(product))
								}
							>
								<FontAwesomeIcon icon={faPlus} />
							</span>
						</div>

						<button
							className="btn btn-danger"
							onClick={() => dispatch(cartActions.removeFromCart(product))}
						>
							Remove From Cart
						</button>
						<h3 className="card-text text-success text-center text-capitalize">
							{Math.round(product.quantaty * product.price)}
						</h3>
					</div>
				);
			})}
			{cartItems.length === 0 ? (
				""
			) : (
				<>
					<button
						className="btn btn-danger d-block m-auto"
						onClick={() => dispatch(cartActions.removeAllCartItems())}
					>
						Clear Cart
					</button>
					<h3 className="my-5">Total Cart : $ {cartTotalBalance}</h3>
				</>
			)}
			<Link className="btn btn-primary d-block btn-continue" to="/">
				Continue Shopping
			</Link>
		</>
	);
}

export default Cart;
