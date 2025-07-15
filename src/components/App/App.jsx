//Import React Hooks useState(stores data that changes over time) useEffect( run code at specific times in your component’s life)
import { useState, useEffect } from "react";

//Routes(container for your route elements) Route(defines path and which component renders when that path matches) useNavigate(go to another page after submitting a form or clicking a button)
import { Routes, Route, useNavigate } from "react-router-dom";

//styles for overall page look
import "./App.css";

//all your imported child components
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LogInModal from "../LogInModal/LogInModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

//import weather functions from external API
import { getWeather } from "../../utils/weatherApi";
import { filterWeatherData } from "../../utils/weatherApi";

//import app-related API functions
import {
  getItems,
  addItems,
  deleteItems,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

//import constants (values that will not change, like config settings, APi keys, Urls)
import { coordinates } from "../../utils/constants";
import { APIkey } from "../../utils/constants";

//import authentication methods
import { checkToken } from "../../utils/auth";
import * as auth from "../../utils/auth";

//import global app contexts(shares data across all so we don't have to pass props manually)
import AppContext from "../../contexts/AppContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

//import protected routes that will wrap pl;aces you can go to only if you're logged in
import ProtectedRoute from "../ProtectedRoute";

function App() {
  //this is setting an object which is holding all these properties that will later be set with real data. This is teh default setting
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  //these are all setting a variable that can be used later define data and either setting to an empty array, empty string, empty object
  //first parameter is the name of the state variable that holds the current data and the second parameter is the function you call to change that data
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  //this sets up quick navigation to desired Url
  const navigate = useNavigate();

  //this is defining when something is owned using owner and id that comes from the user object
  //this checks if currentUSer exists and also compares the owner of the selected card with the _id of the current user
  //the result is a boolean which will be either true or false
  const isOwn = currentUser && selectedCard.owner === currentUser._id;

  //this is defining a function using an arrow function that will handle the event of the toggle switch changing
  //it checks whether F is true or false. If the switch has f selected and you click it the switch will change to c and vice versa
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  //this is taking the selected card and opening this modal and displaying this card
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-item");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  //the flow of this is first it checks the JWT token from browser storage to prove who the user is
  //then it tells the app to stop everything because it;s loading and either a spinning ball will show up or the button stays disabled
  //it then sends a request to delete the item using the id of the item and the token to authorize the action
  //if the delete is successful it will update the clothing list and close the modal
  //if something goes wrong it will log the error to the console
  //whether it works or not it will stop the loading spinner or disabled button
  //special note that we need to filter and create a new array because the frontend doesn't update the delete and still holds it in memory
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
      .catch((error) => {
        console.error("Failed to delete the item:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //this is accepting 3 destructured properties
  //then checks if any of the fields are empty, if so logs the error and stops the "return" stops the function
  //
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    if (!name || !imageUrl || !weather) {
      console.error("Missing required fields:", { name, imageUrl, weather });
      return;
    }

    //this is defined to show the data that will be sent to backend, shows the object and the token for authorization
    const data = { name, imageUrl, weather };
    const token = localStorage.getItem("jwt");

    //starts loading
    //calls the backend API and checks the token then adds the item
    //if successful adds the new item then closes the modal
    //if unsuccessful then logs error
    //then stops loading no matter what
    //the reason for data.data is the first is the named variable and the second is the name of the object(whats been set-up in backend)
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

  //this is an arrow function that takes two parameters(the unique id of the item and a boolean that tells where item is liked or notliked)
  //grabs web toke to authorize
  //if successful looks through each item and if id matches item and there is no like then it changes it to like
  //if item is already liked then it changes it to dislike
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((data) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? data.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((data) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? data.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  //these handle clicks
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleLoginClick = () => {
    setActiveModal("log-in");
  };

  const handleRegisterClick = () => {
    setActiveModal("sign-up");
  };

  //this is a function that accepts an object with the below properties
  //it calls the api to create a new user
  //once the user is successfully registered it runs the next steps
  //closes the modal, updates the state to store the user, and logs user in, then navigates to homepage
  //if there is an error ot logs it
  const handleRegistration = ({ email, password, name, imageUrl }) => {
    auth
      .register(email, password, name, imageUrl)
      .then((data) => {
        closeActiveModal();
        setCurrentUser(data.data);
        handleLogin({ email, password });
        navigate("/");
        // }
      })
      .catch(console.error);
  };

  //function that takes teo parameters and starts by making sure that both fields are entered before it send API request
  //upon success it then sends an authorize request
  //server checks if credentials are good then send back a JWT Token
  //then stores the token, closes modal, updates state that user is logged in and current user, then navigates to homepage
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
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

  //purpose of this useEffect checks if a user is already logged in based on a saved token(jwt) in local storage and if so, fetches user data
  //first it grabs the token from browser, if a token exists starts loading, then sends the token to the backend to verify that it's valid
  //if token is valid then it send gets data from response and places it into set Current USer
  //if this fails then it keeps user logged out
  //this hook runs when the page loads and every time isLoggedIn changes
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      setUserLoading(true);
      checkToken(jwt)
        .then((response) => {
          const { name, email, imageUrl, _id } = response.data;
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

  //this fetches the weather data based on users location when the component mounts
  //makes an API call to gather latitude, longitude and API key
  //if call i successful then it filters just the needed parts from the full weather response
  //then updates setWeatherData
  //if anything goes wrong it will log the error
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

  //this runs once to send request to get items on page load
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.data);
      })
      .catch(console.error);
  }, []);

  //this is an effect to close the modal using the esc button
  //if no modals are open then it stops running and not listening for keys being pressed
  //when event object which is escape is pressed the modal will close then it will stop listening
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

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
                      isLoggedIn={isLoggedIn}
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
                        isLoggedIn={isLoggedIn}
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
