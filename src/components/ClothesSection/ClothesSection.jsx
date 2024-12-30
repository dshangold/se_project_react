// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSecton({ onCardClick, onAddNewClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section_content">
        <p>Your Items</p>
        <button
          onClick={onAddNewClick}
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

export default ClothesSecton;
