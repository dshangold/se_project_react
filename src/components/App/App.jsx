import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../../AddItemModal/AddItemModal";
import api from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (item) => {
    setClothingItems([item, ...clothingItems]);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = processWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api.getItems().then((items) => {
      console.log(items);
      setClothingItems(items.reverse()).catch(console.error);
    });
  }, []);

  const handleAddItemSubmit = (item) => {
    api
      .addItem(item)
      .then((item) => {
        console.log(item);
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    console.log(`Deleting item with id: ${card._id}`);
    api
      .deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter((c) => c.__id !== card._id));
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  // console.log(currentTemperatureUnit);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          handleCardDelete={handleCardDelete}
        />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
          onSubmit={handleAddItemSubmit}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
