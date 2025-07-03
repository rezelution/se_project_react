import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isOwn,
  currentUser,
  handleCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__heading">
        <p>Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => {
            return currentUser?._id === item.owner;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                isOwn={isOwn}
                handleCardLike={handleCardLike}
                currentUser={currentUser}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
