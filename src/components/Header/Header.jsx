import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/images/logoFooter.png";
import avatarPlaceholder from "../../assets/images/avatarPH.jpg";

function Header({
  handleLowPriceRange,
  handleHighPriceRange,
  lowPriceRange,
  highPriceRange,
  cartItems,
  openSignInModal,
  openSignUpModal,
  onLogout,
  handleSearch,
  isLoggedIn,
  user,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* LEFT — LOGO */}
      <div className="header__left">
        <Link to="/" className="header__logo-link" aria-label="Go to Home">
          <img
            src={logo}
            alt="Smart Gift Planner logo"
            className="header__logo"
          />
        </Link>
      </div>

      {/* CENTER — SEARCH */}
      <div className="header__center">
        <input
          type="text"
          placeholder="Search gifts"
          className="header__search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* RIGHT — AUTH / PROFILE */}
      <div className="header__right">
        {!isLoggedIn ? (
          <>
            <button
              onClick={openSignInModal}
              className="header__btn header__btn--login"
            >
              Log in
            </button>
            <button
              onClick={openSignUpModal}
              className="header__btn header__btn--signup"
            >
              Sign up
            </button>
          </>
        ) : (
          <div className="header__profile" ref={dropdownRef}>
            <button
              className="header__avatar-btn"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <img
                src={avatarPlaceholder}
                alt="User avatar"
                className="header__avatar-img"
              />
            </button>

            {isDropdownOpen && (
              <div className="header__dropdown">
                <span className="header__dropdown-name">{user?.name}</span>
                <p className="header__dropdown-email">{user?.email}</p>
                <button className="header__dropdown-logout" onClick={onLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
