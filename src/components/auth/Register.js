import { useState, useEffect } from "react";
import registerImg from "../../assets/register.svg";
import "./AuthContainer.scss";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { faG } from "@fortawesome/free-solid-svg-icons";
import { FaCheck } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Register = () => {
	// handling toggle password icon
	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	// handle strength indicator
	const [showIndicator, setShowIndicator] = useState(false);
	const [pass, setPass] = useState("");

	const [passLetter, setPassLetter] = useState(false);
	const [passNumber, setPassNumber] = useState(false);
	const [passChar, setPassChar] = useState(false);
	const [passLength, setPassLength] = useState(false);

	const [passComplete, setPassComplete] = useState(false);

	//handling logging user
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// const [isLoading,setIsloading] = useState(false);

	// navigation
	const navigate = useNavigate();

	const handleRegisterUser = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Password dosn't match Confirm Password");
			return;
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				toast.success("Successful Registration");
				navigate("/login");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};
	const provider = new GoogleAuthProvider();
	const handleSignInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				toast.success("Successful Log In");
				navigate("/");
				// const user = result.user;
				// ...
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	const handleShowIndicator = () => {
		setShowIndicator(true);
	};

	const handlePasswordChange = (e) => {
		setPass(e.target.value);
		setPassword(e.target.value);
		console.log(pass);
	};

	useEffect(() => {
		// check Lower and Uppercase
		if (pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
			setPassLetter(true);
		} else {
			setPassLetter(false);
		}

		// Check For Numbers
		if (pass.match(/([0-9])/)) {
			setPassNumber(true);
		} else {
			setPassNumber(false);
		}

		// Check For Special char

		if (pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
			setPassChar(true);
		} else {
			setPassChar(false);
		}

		if (pass.length > 7) {
			setPassLength(true);
		} else {
			setPassLength(false);
		}

		if (passLetter && passNumber && passChar && passLength) {
			setPassComplete(true);
		} else {
			setPassComplete(false);
		}
	}, [pass, passLetter, passNumber, passChar, passLength]);

	return (
		<div className="main-container --flex-center">
			<div className="form-container">
				<form onSubmit={handleRegisterUser}>
					<h2 className="text-success mb-3">Sign Up</h2>
					<input
						type="email"
						required
						className="my-3"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{/* PASSWORD FIELD */}
					<div className="password-register">
						<input
							type={showPassword ? "text" : "password"}
							required
							className="--width-100"
							placeholder="Password"
							onFocus={handleShowIndicator}
							value={pass}
							onChange={handlePasswordChange}
							onBlur={() => setShowIndicator(false)}
						/>
						<span className="icon" onClick={handleTogglePassword}>
							{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</span>
					</div>
					<input
						type="password"
						required
						className="mb-3"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					{/* PASSWORD FIELD */}
					<button
						disabled={!passComplete}
						type="submit"
						className={
							passComplete
								? "btn btn-outline-success"
								: "btn btn-outlone-success btn-disabled"
						}
					>
						Register
					</button>
				</form>

				<span>
					Have an account?{" "}
					<Link to="/login" className="text-primary text-decoration-none">
						Login
					</Link>
				</span>
				<div onClick={() => handleSignInWithGoogle()}>
					<p className="bg-danger text-light py-2 px-5 gmail my-2">
						<FontAwesomeIcon icon={faG} color="white" /> Log In With Google
					</p>
				</div>
				{/* Pass Strength Indicator */}
				<div className={showIndicator ? "show-indicator" : "hide-indicator"}>
					<ul className="strength-indicator">
						<p className="--text-sm">Password Strength Indicator</p>
						<li className={passLetter ? "pass-green" : "pass-red"}>
							<span className="--align-center">
								{passLetter ? <FaCheck /> : <GoPrimitiveDot />}
								&nbsp; Lowercase & Uppercase
							</span>
						</li>
						<li className={passNumber ? "pass-green" : "pass-red"}>
							<span className="--align-center">
								{passNumber ? <FaCheck /> : <GoPrimitiveDot />}
								&nbsp; Numbers (0-9)
							</span>
						</li>
						<li className={passChar ? "pass-green" : "pass-red"}>
							<span className="--align-center">
								{passChar ? <FaCheck /> : <GoPrimitiveDot />}
								&nbsp; Special Character (!@#$%^&*)
							</span>
						</li>
						<li className={passLength ? "pass-green" : "pass-red"}>
							<span className="--align-center">
								{passLength ? <FaCheck /> : <GoPrimitiveDot />}
								&nbsp; At least 8 Character
							</span>
						</li>
					</ul>
				</div>
				{/* Pass Strength Indicator */}
			</div>
			<div className="img-container">
				<img src={registerImg} alt="register" />
			</div>
		</div>
	);
};

export default Register;
