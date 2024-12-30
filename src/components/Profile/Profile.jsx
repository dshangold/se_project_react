import ClothesSecton from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import React from "react";

function Profile({
  onCardClick,
  onCardDelete,
  onAddNewClick,
  clothingItems,
  cards,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSecton
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          onAddNewClick={onAddNewClick}
          sectionData={cards}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
