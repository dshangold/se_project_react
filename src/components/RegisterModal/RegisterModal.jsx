import "./RegisterModal.css";
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onClose,
  handleRegistration,
  onLoginClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const onRegistration = (e) => {
    e.preventDefault();
    handleRegistration({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      title="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onRegistration}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          id="register-email"
          className="modal__input"
          placeholder="Email"
          minlength="1"
          maxLength="30"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          id="register-password"
          className="modal__input"
          placeholder="Password"
          minlength="1"
          maxLength="30"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label className="modal__label">
        Name
        <input
          type="text"
          id="register-name"
          className="modal__input"
          placeholder="Name"
          minlength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          id="register-avatar"
          className="modal__input"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
      <div className="modal__button-div">
        <button
          type="submit"
          className="modal__submit modal__submit-sign-up"
          onClick={handleRegistration}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="modal__submit modal__submit-log-in"
          onClick={onLoginClick}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
