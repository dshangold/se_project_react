import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  handleAddClick,
  clothingItems,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItem =
    currentUser && currentUser?._id
      ? clothingItems.filter((item) => item.owner === currentUser?._id)
      : [];
  return (
    <div className="clothes-section">
      <div className="clothes-section_content">
        <p className="clothes-section_title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section_button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section_list">
        {userItem.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
