import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, handleDeleteCard }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close"></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={() => handleDeleteCard(card)}
            type="button"
            className="modal__delete-button"
            onClose={onClose}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
