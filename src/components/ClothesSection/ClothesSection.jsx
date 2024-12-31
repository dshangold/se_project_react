// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, handleAddClick, clothingItems }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
