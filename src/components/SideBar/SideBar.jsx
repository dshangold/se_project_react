import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({ onLogoutClick, onEditClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src={currentUser?.avatar || avatar}
          alt="Default Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "User name"}</p>
      </div>
      <div className="sidebar__log">
        <button className="sidebar__change" type="button" onClick={onEditClick}>
          Change profile data
        </button>
        <button
          className="sidebar__logout"
          type="button"
          onClick={onLogoutClick}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
