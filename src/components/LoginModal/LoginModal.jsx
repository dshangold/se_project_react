import "./LoginModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, handleLogin, onSignUpClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          id="login-email"
          className="modal__input"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          id="login-password"
          className="modal__input"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <div className="modal__button-div">
        <button type="submit" className="modal__submit modal__submit-login">
          Log In
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-signup"
          onClick={onSignUpClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
