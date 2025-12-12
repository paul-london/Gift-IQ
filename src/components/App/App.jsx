import { useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import CartModal from "../CartModal/CartModal";
import FormModal from "../FormModal/FormModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [lowPriceRange, setLowPriceRange] = useState(0);
  const [highPriceRange, setHighPriceRange] = useState(1000);
  const [seacrhText, setSeacrhText] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemsToAdd, setSelectedItemsToAdd] = useState([]);

  function handleItemClick(item) {
    setActiveModal("preview");
    setSelectedItem(item);
  }
  function closeActiveModal() {
    setActiveModal("");
  }
  function handleLowPriceRange(price) {
    setLowPriceRange(price);
  }
  function handleHighPriceRange(price) {
    setHighPriceRange(price);
  }
  function handleSearch(text) {
    setSeacrhText(text);
  }
  function handleCategory(text) {
    setCategory(text);
  }
  function handleAddToCart(item, quantity) {
    const id = selectedItemsToAdd.findIndex((curr) => curr._id === item._id);
    if (id >= 0) {
      selectedItemsToAdd[id].quantity = quantity;
      setSelectedItemsToAdd(selectedItemsToAdd);
    } else {
      item = { ...item, quantity };
      const itemsToAdd = [...selectedItemsToAdd, item];
      setSelectedItemsToAdd(itemsToAdd);
    }
  }
  function onViewCart() {
    if (selectedItemsToAdd.length > 0) {
      setActiveModal("view_cart");
    }
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleLowPriceRange={handleLowPriceRange}
          handleHighPriceRange={handleHighPriceRange}
          handleSearch={handleSearch}
          handleCategory={handleCategory}
          selectedCategory={category}
          lowPriceRange={lowPriceRange}
          highPriceRange={highPriceRange}
          cartItems={selectedItemsToAdd}
          onViewCart={onViewCart}
        />
        <Main
          handleItemClick={handleItemClick}
          lowPriceRange={lowPriceRange}
          highPriceRange={highPriceRange}
          seacrhTextValue={seacrhText}
          selectedCategory={category}
          handleAddToCart={handleAddToCart}
        />
      </div>
      <ItemModal
        activeModal={activeModal}
        item={selectedItem}
        onClose={closeActiveModal}
      />
      <CartModal
        activeModal={activeModal}
        items={selectedItemsToAdd}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
