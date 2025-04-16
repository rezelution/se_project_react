import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather } from "../../utils/weatherApi";
import { coordinates } from "../../utils/constants";
import { APIkey } from "../../utils/constants";
import { filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";

//This is "useState" a way for your app to remember data that can change and triggers updates when it does
//keeps track of dynamic data that is changed by user or API
function App() {
  //first argument is to set variable name and second is the function you use to change the variable
  //the properties of the object is what the state starts when the page loads
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  //this is setting any Modals to open or close. Since it only has "" there are no modals open on load
  const [activeModal, setActiveModal] = useState("");

  //this tracks the cards data (name, url, weather etc) on the currently selected card, the {} means no card is selected on load
  //this is initializing as a placeholder until a card is selected
  const [selectedCard, setSelectedCard] = useState({});

  //this is an arrow function thats opens "New Garment" modal, this is tracking the state of the modal, once clicked it opens it
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  //another arrow function that handles all card events - opens preview modal and also opens card with all data
  //it needs card argument because it needs to know which card to open
  //is efficient because it uses two callbacks that do different things
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  //this is for closing any active modal to it's original state which is "" or not shown
  const closeActiveModal = () => {
    setActiveModal("");
  };

  //this runs side effects like fetching data, updating the DOM, setting timers. Here it fetches weather data.
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

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        handleCloseClick={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          <div className="modal__radio-option">
            <input
              type="radio"
              id="hot"
              name="weather"
              className="modal__radio-input"
            />
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              Hot
            </label>
          </div>

          <div className="modal__radio-option">
            <input
              type="radio"
              id="warm"
              name="weather"
              className="modal__radio-input"
            />
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              Warm
            </label>
          </div>

          <div className="modal__radio-option">
            <input
              type="radio"
              id="cold"
              name="weather"
              className="modal__radio-input"
            />
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        handleCloseClick={closeActiveModal}
      />
    </div>
  );
}

export default App;
