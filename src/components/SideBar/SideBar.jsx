import "./SideBar.css";

function SideBar({ currentUser, handleEditProfileClick, handleLogOut }) {
  return (
    <div className="sidebar">
      <div className="sidebar__UserGroup">
        <img
          className="sidebar__avatar"
          src={currentUser.imageUrl}
          alt={currentUser.imageUrl}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__editProfile"
        >
          Change profile data
        </button>
        <button
          onClick={handleLogOut}
          type="button"
          className="sidebar__editProfile"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
