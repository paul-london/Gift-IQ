import "./Header.css";
import logo from "../../assets/images/logo.svg";
import { catregoryOptions } from "../../utils/constants";

function Header({
  handleLowPriceRange,
  handleHighPriceRange,
  handleSearch,
  handleCategory,
  selectedCategory,
  lowPriceRange,
  highPriceRange,
  cartItems,
  onViewCart,
}) {
  function onLowPriceChange(e) {
    const value = Number(e.target.value);
    if (value <= highPriceRange - 100) handleLowPriceRange(value);
  }
  function onHighPriceChange(e) {
    const value = Number(e.target.value);
    if (value >= lowPriceRange + 100) handleHighPriceRange(value);
  }
  function onTextChange(e) {
    handleSearch(e.target.value);
  }
  function onSelectedCategory(e) {
    handleCategory(e.target.value);
  }
  function handleViewCart() {
    onViewCart();
  }

  function getSumQuantity() {
    const sum = cartItems.reduce(function (acc, curr) {
      return acc + parseInt(curr.quantity);
    }, 0);
    return sum;
    //console.log(sum);
  }

  return (
    <div className="header">
      <span className="header__range-span">${lowPriceRange}</span>
      <div className="header__slider">
        <input
          type="range"
          id="low-range"
          min="0"
          max={highPriceRange}
          step="10"
          defaultValue={lowPriceRange}
          onChange={onLowPriceChange}
          className="header__input-range header__input-range_type_min"
        />
        <input
          type="range"
          id="high-range"
          min={lowPriceRange}
          max="1000"
          step="10"
          defaultValue={highPriceRange}
          onChange={onHighPriceChange}
          className="header__input-range header__input-range_type_max"
        />
      </div>
      <span className="header__range-span">${highPriceRange}</span>
      <label htmlFor="search" className="header__label">
        <input
          type="text"
          className="header__input"
          id="search"
          placeholder="Search"
          onChange={onTextChange}
        />
      </label>
      <select value={selectedCategory} onChange={onSelectedCategory}>
        {catregoryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button onClick={handleViewCart} className="header__cart-btn">
        {getSumQuantity() > 0 ? parseInt(getSumQuantity()) : 0} items
      </button>
    </div>
  );
}

export default Header;
