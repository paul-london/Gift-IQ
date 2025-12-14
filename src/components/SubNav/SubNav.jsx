import "./SubNav.css";

function SubNav({ active, onChange }) {
  return (
    <nav className="subnav">
      <button
        className={`subnav__btn ${active === "home" ? "active" : ""}`}
        onClick={() => onChange("home")}
      >
        Home
      </button>

      <button
        className={`subnav__btn ${active === "browse" ? "active" : ""}`}
        onClick={() => onChange("browse")}
      >
        Browse
      </button>

      <button
        className={`subnav__btn ${active === "saved" ? "active" : ""}`}
        onClick={() => onChange("saved")}
      >
        Saved
      </button>
    </nav>
  );
}

export default SubNav;
