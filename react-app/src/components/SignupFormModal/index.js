import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css"

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
			<form onSubmit={handleSubmit}>
				<div>
					{errors && errors.length >= 1 && errors.map((error, idx) => (
						<div className="error" key={idx}>{error}</div>
					))}
				</div>
				<label>
					{errors.firstName && <p className="error">{errors.firstName}</p>}
					<input
						type="text"
						placeholder="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					{errors.lastName && <p className="error">{errors.lastName}</p>}
					<input
						type="text"
						placeholder="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					{errors.email && <p className="error">{errors.email}</p>}
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					{errors.username && <p className="error">{errors.username}</p>}
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					{errors.password && <p className="error">{errors.password}</p>}
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					{errors.confirmPassword && (
						<p className="error">{errors.confirmPassword}</p>
					)}
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
