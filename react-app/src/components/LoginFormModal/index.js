import React, { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "../CSS/mycss.css"

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };


  const handleDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("Demouser@gmail.com", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="login-h1">Sign In</h1>
      {/* Google Auth */}
      <a href={"/api/auth/oauth_login"} className="submit-goog">
        <button className="submit-login-goog"><FcGoogle className="google-icon" />Continue with Google</button>
      </a>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="error">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <div>
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>
        <div>
          <button className="submit-login" type="submit">Sign In</button>
        </div>
        <div>
          <button className="submit-login" onClick={handleDemo} id="demo-button">Sign in as Demo User</button>
        </div>
      </form >
    </div >
  );
}

export default LoginFormModal;
