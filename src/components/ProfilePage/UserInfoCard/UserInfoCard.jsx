import "./UserInfoCard.css";

function UserInfoCard({ user }) {
  if (!user) {
    return null; 
  }
  return (
    <div className="user-card">
      <img src={user.avatar} alt="avatar" className="user-card__avatar" />

      <div className="user-card__info">
        <h2 className="user-card__name">{user.name}</h2>

        <span className="user-card__tag">{user.relationship}</span>

        <div className="user-card__icons">
          <button>✏️</button>
          <button>📤</button>
          <button>🖨️</button>
          <button>🗑️</button>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
