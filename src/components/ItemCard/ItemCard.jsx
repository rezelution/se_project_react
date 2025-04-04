import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="ItemCard">
      <h2 className="ItemCard__title">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="ItemCard__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
