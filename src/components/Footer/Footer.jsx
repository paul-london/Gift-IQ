import "./Footer.css";
import logo from "../../assets/images/logoFooter.png"; // use your head+gift icon

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Left: Logo */}
        <div className="footer__logo">
          <img src={logo} alt="GiftIQ logo" />
        </div>

        {/* Middle: Mission text */}
        <p className="footer__text">
          GiftIQ’s mission is to spread positivity by removing some of the stress
          of buying gifts. We aim to be a beacon of love and generosity, helping
          our users find that perfect product to show their feelings.
        </p>

        {/* Right: Navigation */}
        <nav className="footer__nav">
          <a href="/">Home</a>
          <a href="/browse">Browse</a>
          <a href="/saved">Saved</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
