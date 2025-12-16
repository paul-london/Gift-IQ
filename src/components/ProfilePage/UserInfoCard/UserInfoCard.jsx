import "./UserInfoCard.css";
import { baseUrl } from "../../../utils/constants";

function UserInfoCard({ user, onEditProfile, onChangeAvatar }) {
  if (!user) return null;

  const avatarSrc = user.avatar ? `${baseUrl}${user.avatar}` : null;
  return (
    <div className="user-card">
      {avatarSrc ? (
        <img src={avatarSrc} alt={user.name} className="user-avatar" />
      ) : (
        <div className="user-avatar-placeholder"></div>
      )}

      <div className="user-card__info">
        <h2 className="user-card__name">{user.name}</h2>

        <span className="user-card__tag">{user.relationship}</span>

        <div className="user-card__icons">
          <button title="Edit" onClick={onEditProfile}>
            ✏️
          </button>
          <button title="Upload" onClick={onChangeAvatar}>
            📤
          </button>
          <button title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
