import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
//images need to be added this way
import logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
  currentUser,
}) {
  //creates a new date object with current date an time
  //the localstring converts the date into a formatted string using your default local that was et in your browser
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
      {isLoggedIn ? (
        <div className="header__button_group">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.imageUrl ? (
                <img
                  className="header__avatar"
                  src={currentUser.imageUrl}
                  alt={currentUser.name}
                />
              ) : (
                <div className="header__avatar-fallback">
                  {currentUser && currentUser.name && currentUser?.name[0]}
                </div>
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div>
          <button
            onClick={handleRegisterClick}
            type="button"
            className="header__signUp-btn"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            type="button"
            className="header__logIn-btn"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
