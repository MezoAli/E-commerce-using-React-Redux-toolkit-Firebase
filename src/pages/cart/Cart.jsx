import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../components/store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { useEffect } from "react";

function Cart() {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const cartTotalBalance = useSelector((state) => state.cart.cartTotalBalance);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const navigate = useNavigate();
	const url = window.location.href;
	const dispatch = useDispatch();

	const proceedToCheckout = () => {
		if (isLoggedIn) {
			navigate("/checkout");
		} else {
			navigate("/login");
			dispatch(cartActions.setPreviousURL(url));
		}
	};

	useEffect(() => {
		dispatch(cartActions.handleQuantatyAndTotals());
		dispatch(cartActions.setPreviousURL(""));
	});

	return (
		<>
			{cartItems.length === 0 && (
				<h3 className="text-center text-success my-5">Your cart in empty</h3>
			)}
			{console.log(cartItems)}
			{cartItems.map((product) => {
				return (
					<div className="cart-container mb-3" key={product.id}>
						<div className="d-flex flex-column align-items-center">
							<p className="fs-5">product image</p>
							<img src={product.imageURL} className="" alt="productimage" />
						</div>
						<div className="d-flex flex-column align-items-center">
							<p className="fs-5">title</p>
							<h5
								className="card-title text-center text-capitalize"
								title={product.title}
							>
								{product.title.substring(0, 12)}
							</h5>
						</div>
						<div className="d-flex flex-column align-items-center">
							<p className="fs-5">price</p>
							<h5 className="card-text text-success text-center text-capitalize">
								${product.price}
							</h5>
						</div>
						<div className="d-flex flex-column align-items-center">
							<p className="fs-5">Quantaty</p>
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
						</div>

						<button
							className="btn btn-danger fs-6"
							onClick={() => dispatch(cartActions.removeFromCart(product))}
						>
							Remove Product
						</button>
						<div className="d-flex flex-column align-items-center">
							<p className="fs-5">total</p>
							<h3 className="card-text text-success text-center text-capitalize">
								{(product.quantaty * product.price).toFixed(2)}
							</h3>
						</div>
					</div>
				);
			})}
			{cartItems.length === 0 ? (
				<Link className="btn btn-continue" to="/">
					<FontAwesomeIcon
						icon={faArrowLeftLong}
						style={{ marginRight: "10px" }}
					/>
					Continue Shopping
				</Link>
			) : (
				<>
					<button
						className="btn btn-danger d-block m-auto"
						onClick={() => dispatch(cartActions.removeAllCartItems())}
					>
						Clear Cart
					</button>
					<div className="my-5 fs-3 w-50 fw-bold">
						<p>Subtotal : $ {cartTotalBalance.toFixed(2)}</p>
						<button
							className="btn btn-primary w-50"
							onClick={() => proceedToCheckout()}
						>
							CheckOut
						</button>
					</div>
				</>
			)}
		</>
	);
}

export default Cart;
