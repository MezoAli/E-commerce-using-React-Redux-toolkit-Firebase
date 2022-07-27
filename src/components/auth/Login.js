import React, { useState } from "react";
import loginImg from "../../assets/login.svg";
import "./AuthContainer.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { faG } from "@fortawesome/free-solid-svg-icons";

import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};
	const handleLoginIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// const user = userCredential.user;
				toast.success("Successful Log In");
				navigate("/");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};
	const provider = new GoogleAuthProvider();

	const handleSignUpWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				toast.success("Successful Sign Up");
				navigate("/");
				// const user = result.user;
				// ...
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};
	return (
		<div className="main-container --flex-center">
			<div className="img-container">
				<img src={loginImg} alt="login" />
			</div>
			<div className="form-container">
				<form onSubmit={handleLoginIn}>
					<h2 className="text-center text-success mb-3">Login</h2>
					<input
						type="email"
						className="w-100"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<div className="password">
						<input
							value={password}
							type={showPassword ? "text" : "password"}
							className="w-100"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<span className="icon" onClick={() => handleTogglePassword()}>
							{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</span>
					</div>
					<button type="submit" className="btn btn-outline-success my-3 ">
						Login
					</button>
					<div onClick={() => handleSignUpWithGoogle()}>
						<p className="bg-danger text-light py-2 px-5 gmail my-2">
							<FontAwesomeIcon icon={faG} color="white" /> Log In With Google
						</p>
					</div>
					<Link to="/reset" className="text-danger">
						Forgot password
					</Link>
					<span className="--text-sm --block">
						Don't have an account?{" "}
						<Link to="/register" className="text-primary">
							Sign Up
						</Link>
					</span>
				</form>
			</div>
		</div>
	);
};

export default Login;
