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
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemsToAdd, setSelectedItemsToAdd] = useState([]);

  const [formPriceRange, setFormPriceRange] = useState("50");
  const [formSlectedCategories, setFormSlectedCategories] = useState([]);
  const [formName, setFormName] = useState("");
  const [formSelectedGroup, setFormSelectedGroup] = useState("");

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

  function handleItemClick(item) {
    setActiveModal("preview");
    setSelectedItem(item);
  }
  function closeActiveModal() {
    if (activeModal === "gift_survey") {
      setFormSlectedCategories([]);
      setFormSelectedGroup("");
      setFormName("");
      setFormPriceRange("50");
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
    const id =
      recipientsArray === undefined || recipientsArray.length === 0
        ? 0
        : recipientsArray.length + 1;
    const newRecipient = {
      _id: id,
      name: formName,
      group: formSelectedGroup,
      priceRange: formPriceRange,
      categories: formSlectedCategories,
      products: [],
    };

    const loaclRecipientsArray = [...recipientsArray, newRecipient];
    setRecipientsArray(loaclRecipientsArray);
    localStorage.setItem("recipients", JSON.stringify(loaclRecipientsArray));
    e.target.reset();
    setActiveModal("");
  }

  function setNameInput(e) {
    setFormName(e.target.value);
  }
  function setSelectedGroup(e) {
    setFormSelectedGroup(e.target.value);
  }

  function setPriceRange(e) {
    setFormPriceRange(e.target.value);
  }
  function handleAddRecipient() {
    setActiveModal("gift_survey");
  }
  function handleDeleteRecipient(recipient) {
    const newArray = recipientsArray.filter((rec) => {
      return rec._id !== recipient._id;
    });
    localStorage.setItem("recipients", JSON.stringify(newArray));
    setRecipientsArray(newArray);
  }
  let isChecked;
  const [countCategories, setCountCategories] = useState(0);
  function handleOnCheckBoxChange(e, category) {
    if (countCategories < 3 && e.target.checked) {
      setCountCategories(countCategories + 1);
      setFormSlectedCategories([...formSlectedCategories, category]);
    } else if (countCategories === 3 && !e.target.checked) {
      const index = formSlectedCategories.indexOf(category);
      formSlectedCategories.splice(index, 1);
      setCountCategories(countCategories - 1);
    } else {
      e.target.checked = false;
      alert("Please choose up to 3 categories.", "Smart Gift Planner");
    }
  }
  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleLowPriceRange={handleLowPriceRange}
          handleHighPriceRange={handleHighPriceRange}
          handleSearch={handleSearch}
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
          handleAddToCart={handleAddToCart}
          handleAddRecipient={handleAddRecipient}
          handleDeleteRecipient={handleDeleteRecipient}
        />
      </div>
      <FormModal
        title="Who will you buy a gift for?"
        buttonText="Save"
        activeModal={activeModal}
        onClose={closeActiveModal}
        onFormSubmit={handleSubmit}
      >
        <label htmlFor="name" className="form__label">
          <input
            type="text"
            className="form__input"
            id="name"
            defaultValue={formName}
            onChange={setNameInput}
            placeholder="Recipient name..."
          />
        </label>
        <label htmlFor="name" className="form__label form__label_type_group">
          Group{" "}
        </label>
        <div className="form__select-container">
          <select
            id="group-select"
            defaultValue={formSelectedGroup}
            onChange={setSelectedGroup}
            className="form__select"
          >
            {groupOptions.map((option) => (
              <option
                className="form__option"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <span className="form__span">&#9660;</span>
        </div>

        <h2 className="form__title">
          {" "}
          What are their interests? (Choose up to 3){" "}
        </h2>
        <div className="form__checkbox-container">
          {catregoryOptions.map((option) => (
            <div className="form__checkbox-inside" key={option.value}>
              <input
                className="form__input_type_checkbox"
                id="checkbox-input"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => {
                  handleOnCheckBoxChange(e, option.value);
                }}
              />
              <label
                className="form__label form__label_type_checkbox"
                htmlFor="checkbox-input"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <label htmlFor="name" className="form__label form__label_type_range">
          <input
            type="range"
            id="price-range"
            min="0"
            max="1000"
            step="1"
            defaultValue={formPriceRange}
            onChange={setPriceRange}
            className="form__input-range"
          />
          <span className="form__span-range"> ${formPriceRange}</span>
        </label>
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
