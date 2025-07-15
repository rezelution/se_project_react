import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isOwn,
  currentUser,
  handleCardLike,
  isLoggedIn,
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
            return currentUser?._id === item.owner; //this is using optional chaining and is checking ._id of owner (if its null or undefined won't cause app to crash)
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
                isLoggedIn={isLoggedIn}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
