import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import resetImg from "../../assets/forgot.svg";
import "./AuthContainer.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { auth } from "../../firebase/config";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

const Reset = ({ onLogin }) => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleResetPassword = (e) => {
		e.preventDefault();
		setIsLoading(true);
		sendPasswordResetEmail(auth, email)
			.then(() => {
				toast.success("Check your Email For a Reset Link");
				setIsLoading(false);
				navigate("/login");
			})
			.catch((error) => {
				toast.error(error.message);
				setIsLoading(false);
			});
	};
	return (
		<>
			{isLoading && <LoadingSpinner />}
			<div className="main-container">
				<div className="form-container reset">
					<form onSubmit={(e) => handleResetPassword(e)}>
						<h2 className="text-center text-danger mb-3">Reset</h2>

						<input
							type="email"
							className="w-100 mb-3"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<button type="submit" className="btn btn-danger mb-3">
							Reset Password
						</button>

						<span className="--text-sm --block --text-center">
							We will send you a reset link!!!
						</span>
						<Link to="/login" className="close">
							<AiOutlineClose color="red" />
						</Link>
					</form>
				</div>
				<div className="img-container">
					<img src={resetImg} alt="reset" />
				</div>
			</div>
		</>
	);
};

export default Reset;
