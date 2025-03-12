import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ isOpen, onClose, card, handleCardDelete, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  console.log(currentUser);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          class="modal__close modal__close-preview"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isLoggedIn && isOwn && (
          <button
            onClick={() => handleCardDelete(card)}
            type="button"
            className="modal__delete-button"
            onClose={onClose}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
