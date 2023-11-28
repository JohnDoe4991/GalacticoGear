import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { FcGoogle } from "react-icons/fc";
import "../CSS/mycss.css"

function SignupFormModal() {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		let newErrors = {};

		if (!firstName) newErrors.firstName = "First name is required";
		if (!lastName) newErrors.lastName = "Last name is required";
		if (!email.includes("@")) newErrors.email = "Must be a valid email";
		if (username.length <= 4)
			newErrors.username = "Username must be greater than four characters";
		if (password.length < 6)
			newErrors.password = "Password must be at least six characters";
		if (password !== confirmPassword)
			newErrors.confirmPassword =
				"Passwords must match";


		if (Object.keys(newErrors).length === 0) {
			const data = await dispatch(
				signUp(firstName, lastName, username, email, password)
			);
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				push("/all");
			}
		} else {
			setErrors(newErrors);
		}
	};

	return (
		<div className="sign-up-container">
			<h1 className="Sign-up-h1">Join the Squad</h1>
			{/* Google Auth */}
			<a href={"/api/auth/oauth_login"} className="submit-goog">
				<button className="submit-login-goog"><FcGoogle className="google-icon" />Sign up with Google</button>
			</a>
			<form onSubmit={handleSubmit}>
				<div>
					{errors && errors.length >= 1 && errors.map((error, idx) => (
						<div className="error" key={idx}>{error}</div>
					))}
				</div>
				<label>
					First Name
				</label>
				{errors.firstName && <p className="errors-one-product">{errors.firstName}</p>}
				<input
					type="text"
					placeholder="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<label>
					Last Name
				</label>
				{errors.lastName && <p className="errors-one-product">{errors.lastName}</p>}
				<input
					type="text"
					placeholder="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				<label>
					Email
				</label>
				{errors.email && <p className="errors-one-product">{errors.email}</p>}
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label>
					Username
				</label>
				{errors.username && <p className="errors-one-product">{errors.username}</p>}
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label>
					Password
				</label>
				{errors.password && <p className="errors-one-product">{errors.password}</p>}
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<label>
					Confirm Password
				</label>
				{errors.confirmPassword && (
					<p className="errors-one-product">{errors.confirmPassword}</p>
				)}
				<input
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
