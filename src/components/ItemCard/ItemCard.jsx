import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsLiked(item.likes.some((id) => id === currentUser._id));
    }
  }, [item.likes, currentUser]);

  const itemLikeButtonClassName = isLiked
    ? "card__like card__like_active"
    : "card__like";

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked }, toggleLikeIcon);
    // const updatedLikeStatus = !isLiked;
    console.log("Like button clicked");
  };
  const handleCardClick = () => {
    onCardClick(item);
  };

  const toggleLikeIcon = () => {
    setIsLiked(!isLiked);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser ? (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
        ></button>
      ) : (
        <></>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
