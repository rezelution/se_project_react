import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
//images need to be added this way
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch className="header__toggleSwitch" />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img
            className="header__avatar"
            src={avatar}
            alt="Terrence Tegegne"
          ></img>
        </div>
      </Link>
    </header>
  );
}

export default Header;
