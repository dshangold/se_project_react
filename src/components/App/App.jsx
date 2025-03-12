import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import api from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import * as auth from "../../utils/auth";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const toggleModal = () => {
    setActiveModal((prev) => (prev === "register" ? "login" : "register"));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEditModal = () => {
    setActiveModal("edit");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(currentUser === null);
    localStorage.clear();
  };

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
    api
      .getItems()
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    api
      .addItem({ name, imageUrl, weather, token })
      .then((res) => {
        console.log(res);
        setClothingItems((prevItems) => {
          return [res.data, ...prevItems];
        });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    const token = localStorage.getItem("jwt");
    api
      .deleteItem(card._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((c) => c._id !== card._id)
        );
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (values) => {
    if (!values) {
      return;
    }
    auth
      .loginUser(values)
      .then((data) => {
        if (!data.token) return;
        localStorage.setItem("jwt", data.token);
        auth
          .verifyToken(data.token)

          .then((currentUser) => {
            setCurrentUser(currentUser);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/profile");
          });
      })
      .catch((err) => console.error(err));
  };

  const handleRegistration = (values) => {
    auth
      .registerUser(values)
      .then((res) => {
        console.log(res);
        closeActiveModal();
        handleLogin({ email: values.email, password: values.password });
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = ({ name, imageUrl }) => {
    const token = localStorage.getItem("jwt");
    api
      .editUser(name, imageUrl, token)
      .then((updatedUser) => {
        console.log("API response:", updatedUser);
        setCurrentUser(updatedUser.data);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };
  const handleCardLike = ({ id, isLiked }, toggleLikeIcon) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems(
              (cards) =>
                cards.map((item) => (item._id === id ? updatedCard : item))
              // update liked status
            );
            toggleLikeIcon();
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .verifyToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  console.log(currentUser);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={handleLoginClick}
              onSignUpClick={handleRegisterClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardDelete={handleCardDelete}
                    handleAddClick={handleAddClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleCardDelete={handleCardDelete}
                      handleAddClick={handleAddClick}
                      onEditClick={handleEditModal}
                      onCardLike={handleCardLike}
                      onLogoutClick={handleLogout}
                    />
                  </ProtectedRoute>
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
            isLoggedIn={isLoggedIn}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
            onSubmit={handleAddItemSubmit}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            handleRegisterClick={handleRegisterClick}
            handleRegistration={handleRegistration}
            onLoginClick={toggleModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLoginClick={handleLoginClick}
            handleLogin={handleLogin}
            onSignUpClick={toggleModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeActiveModal}
            handleEdit={handleEdit}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
