import "./ItemCard.css";
import likeIcon from "../../assets/like_button.svg";
import likedIcon from "../../assets/liked_button.svg";

function ItemCard({
  item,
  onCardClick,
  currentUser,
  handleCardLike,
  isLoggedIn,
}) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  //sets to check an array of user ids and checks if at least one id in he array matches the current users id
  //? chaining is used to ensure that if no id is found it will not come back as null or no string which will cause an error
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  //this is grabbing unique id of item
  const id = item._id;

  //this decides what icon to use
  const itemLikeButtonClassName = isLiked ? likedIcon : likeIcon;

  return (
    <li className="ItemCard">
      {isLoggedIn ? (
        <>
          <div className="ItemCard__title_group">
            <h2 className="ItemCard__title">{item.name}</h2>
            <img
              onClick={() => handleCardLike({ id, isLiked })}
              className="ItemCard__likeIcon"
              src={itemLikeButtonClassName}
              alt="like icon"
            />
          </div>
          <div>
            <img
              onClick={handleCardClick}
              className="ItemCard__image"
              src={item.imageUrl}
              alt={item.name}
            />
          </div>{" "}
        </>
      ) : (
        <>
          <div className="ItemCard__title_group">
            <h2 className="ItemCard__title">{item.name}</h2>
          </div>

          <img
            onClick={handleCardClick}
            className="ItemCard__image"
            src={item.imageUrl}
            alt={item.name}
          />
        </>
      )}
    </li>
  );
}

export default ItemCard;
