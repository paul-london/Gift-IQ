import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoFooter.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Left: Logo */}
        <div className="footer__logo">
          <img src={logo} alt="GiftIQ logo" />
        </div>

        {/* Center: Mission */}
        <p className="footer__text">
          GiftIQ’s mission is to spread positivity by removing some of the stress
          of buying gifts. We aim to be a beacon of love and generosity, helping
          our users find that perfect product to show their feelings.
        </p>

        {/* Right: Nav */}
        <nav className="footer__nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/saved">Saved</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </div>

      <div className="footer__bottom">
        <span>© 2025 GiftIQ. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
