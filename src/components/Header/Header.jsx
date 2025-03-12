import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onSignUpClick,
  onLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="logo" src={logo} />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <img
                src={currentUser?.avatar}
                alt="avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button className="modal__button" onClick={onSignUpClick}>
            Sign Up
          </button>
          <button className="modal__button" onClick={onLoginClick}>
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
