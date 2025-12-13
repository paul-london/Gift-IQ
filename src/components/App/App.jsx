import { useEffect, useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import CartModal from "../CartModal/CartModal";
import FormModal from "../FormModal/FormModal";
import { catregoryOptions } from "../../utils/constants";
import { groupOptions } from "../../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState("gift_survey");
  const [lowPriceRange, setLowPriceRange] = useState(0);
  const [highPriceRange, setHighPriceRange] = useState(1000);
  const [seacrhText, setSeacrhText] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemsToAdd, setSelectedItemsToAdd] = useState([]);
  const [selectedRecipient, setselectedRecipient] = useState({});

  const [recipientsArray, setRecipientsArray] = useState();
  const loaclRecipientsString = localStorage.getItem("recipients");
  let loaclRecipients = JSON.parse(loaclRecipientsString);

  useEffect(() => {
    if (loaclRecipients === null) {
      localStorage.setItem("recipients", JSON.stringify([]));
      setRecipientsArray([]);
    } else {
      setRecipientsArray(loaclRecipients);
    }
  }, []);

  let selectedCategory = "";
  let selectedGroup = "";
  let nameInput = "";
  let priceRange = "5";

  function handleRecipientClick(recipient) {
    setselectedRecipient(recipient);
  }
  function handleItemClick(item) {
    setActiveModal("preview");
    setSelectedItem(item);
  }
  function closeActiveModal() {
    if (activeModal === "gift_survey") {
      selectedCategory = "";
      selectedGroup = "";
      nameInput = "";
      priceRange = "5";
    }
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

  function handleSubmit(e) {
    e.preventDefault();
    // setCategory(selectedCategory);
    // setHighPriceRange(priceRange);

    const newRecipient = {
      _id: 0 + recipientsArray?.length + 1,
      name: nameInput,
      group: selectedGroup,
      priceRange: priceRange,
      categories: selectedCategory,
      products: [],
    };
    //updateRecipientsArray(newRecipient);

    const loaclRecipientsArray = [...recipientsArray, newRecipient];
    setRecipientsArray(loaclRecipientsArray);
    localStorage.setItem("recipients", JSON.stringify(loaclRecipientsArray));

    setActiveModal("");
  }

  function setNameInput(e) {
    nameInput = e.target.value;
  }
  function setSelectedGroup(e) {
    selectedGroup = e.target.value;
  }
  function setSelectedCategory(e) {
    selectedCategory = e.target.value;
  }
  function setPriceRange(e) {
    priceRange = e.target.value;
    // console.log(priceRange);
  }
  function handleAddRecipient() {
    setActiveModal("gift_survey");
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
          recipients={recipientsArray}
          handleItemClick={handleItemClick}
          lowPriceRange={lowPriceRange}
          highPriceRange={highPriceRange}
          seacrhTextValue={seacrhText}
          selectedCategory={category}
          handleAddToCart={handleAddToCart}
          handleRecipientClick={handleRecipientClick}
          handleAddRecipient={handleAddRecipient}
        />
      </div>
      <FormModal
        title="Who will you buy a gift for?"
        buttonText="Save"
        activeModal={activeModal}
        onClose={closeActiveModal}
        onFormSubmit={handleSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            defaultValue={nameInput}
            onChange={setNameInput}
            placeholder="Name"
          />
        </label>
        <label htmlFor="name" className="modal__label">
          Group{" "}
          <select defaultValue={selectedGroup} onChange={setSelectedGroup}>
            {groupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="name" className="modal__label">
          Category{" "}
          <select
            defaultValue={selectedCategory}
            onChange={setSelectedCategory}
          >
            {catregoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <input
          type="range"
          id="low-range"
          min="0"
          max="1000"
          step="1"
          defaultValue={priceRange}
          onChange={setPriceRange}
          className="modal__input-range"
        />
      </FormModal>
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
