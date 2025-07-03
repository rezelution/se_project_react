import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather } from "../../utils/weatherApi";
import { coordinates } from "../../utils/constants";
import { APIkey } from "../../utils/constants";
import { filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as auth from "../../utils/auth";
import Profile from "../Profile/Profile";
import {
  getItems,
  addItems,
  deleteItems,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LogInModal from "../LogInModal/LogInModal";
import ProtectedRoute from "../ProtectedRoute";
import AppContext from "../../contexts/AppContext";
import { checkToken } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const navigate = useNavigate();
  const isOwn = currentUser && selectedCard.owner === currentUser._id;

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-item");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleItemDelete = () => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    deleteItems(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    if (!name || !imageUrl || !weather) {
      console.error("Missing required fields:", { name, imageUrl, weather });
      return;
    }

    const data = { name, imageUrl, weather };
    const token = localStorage.getItem("jwt");

    setIsLoading(true);
    return addItems(data, token)
      .then((data) => {
        console.log("Server response:", data);
        setClothingItems([...clothingItems, data.data]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateProfile = ({ name, imageUrl }) => {
    if (!name && !imageUrl) {
      console.error("Missing required fields:", { name, imageUrl });
      return;
    }

    const data = {
      name: name || currentUser.name,
      imageUrl: imageUrl || currentUser.imageUrl,
    };
    const token = localStorage.getItem("jwt");

    setIsLoading(true);
    return updateProfile(data, token)
      .then((data) => {
        console.log("Server response:", data.data);
        setCurrentUser(data.data);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(id, token)
          .then((data) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? data.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(id, token)
          .then((data) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? data.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleLoginClick = () => {
    setActiveModal("log-in");
  };

  const handleRegisterClick = () => {
    setActiveModal("sign-up");
  };

  const handleRegistration = ({ email, password, name, imageUrl }) => {
    auth
      .register(email, password, name, imageUrl)
      .then((data) => {
        closeActiveModal();
        // if (data.jwt) {
        // localStorage.setItem("jwt", data.jwt);
        setCurrentUser(data.data); // TODO change data.data
        handleLogin({ email, password });
        navigate("/");
        // }
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    console.log("handleLogin called");
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        // data => { token: ... }
        // TODO refer to .token instead .jwt
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          closeActiveModal();
          setIsLoggedIn(true);
          setCurrentUser({ email });
          navigate("/");
        }
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser();
    navigate("/");
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt"); //gets the token from localStorage

    if (jwt) {
      //checks if the token exists
      setUserLoading(true);
      checkToken(jwt) //to verify with the server
        .then((response) => {
          const { name, email, imageUrl, _id } = response.data;
          //if token is valid sets user as logged in and saves data

          setCurrentUser({ name, email, imageUrl, _id });
          setIsLoggedIn(true);
          setUserLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setUserLoading(false);
        });
    }
  }, [isLoggedIn]);

  //this runs effects like fetching data, updating the DOM, setting timers. Here it fetches weather data.
  //get weather is pulling data from my constants file.
  //promise handling - .then process the response and .catch handles the errors
  useEffect(() => {
    getWeather({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      APIkey: APIkey,
    })
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      //clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // this is a dependencies array used to watch activeModal here

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <AppContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, userLoading }}
          >
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                handleLoginClick={handleLoginClick}
                handleRegisterClick={handleRegisterClick}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                      currentUser={currentUser}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        clothingItems={clothingItems}
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        currentUser={currentUser}
                        handleUpdateProfile={handleUpdateProfile}
                        handleEditProfileClick={handleEditProfileClick}
                        handleCardLike={handleCardLike}
                        handleLogOut={handleLogOut}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
              buttonText={isLoading ? "Saving..." : "Save"}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              isOwn={isOwn}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteClick={handleDeleteClick}
              buttonText={isLoading ? "Saving..." : "Save"}
              handleCardLike={handleCardLike}
            />
            <ConfirmationModal
              isOpen={activeModal === "delete-item"}
              handleCloseClick={closeActiveModal}
              handleDelete={handleItemDelete}
              buttonText={isLoading ? "Saving..." : "Save"}
            />
            <RegisterModal
              isOpen={activeModal === "sign-up"}
              handleCloseClick={closeActiveModal}
              handleRegistration={handleRegistration}
              onClose={closeActiveModal}
              handleLoginClick={handleLoginClick}
            />
            <LogInModal
              isOpen={activeModal === "log-in"}
              handleCloseClick={closeActiveModal}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              handleRegisterClick={handleRegisterClick}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              handleCloseClick={closeActiveModal}
              onClose={closeActiveModal}
              handleUpdateProfile={handleUpdateProfile}
              currentUser={currentUser}
            />
          </AppContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
