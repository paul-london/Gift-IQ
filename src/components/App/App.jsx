import { useState, useEffect } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import CartModal from "../CartModal/CartModal";
import FormModal from "../FormModal/FormModal";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import { catregoryOptions } from "../../utils/constants";
import { groupOptions } from "../../utils/constants";
import { signup, signin, getCurrentUser } from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [lowPriceRange, setLowPriceRange] = useState(0);
  const [highPriceRange, setHighPriceRange] = useState(1000);
  const [seacrhText, setSeacrhText] = useState("");
  const [category, setCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemsToAdd, setSelectedItemsToAdd] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedRecipient, setselectedRecipient] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("jwt");

  let selectedCategory = "";
  let selectedGroup = "";
  let nameInput = "";
  let priceRange = "5";
  const OpenGiftSurveyModal = () => {
    setActiveModal("gift_survey");
  };
  const openSignUpModal = () => {
    setActiveModal("sign up");
  };
  const openSignInModal = () => {
    setActiveModal("Log in");
  };
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
    setCategory(selectedCategory);
    setHighPriceRange(priceRange);
    setFormSubmitted(true);
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
    console.log(priceRange);
  }
  function handleAddRecipient() {
    setActiveModal("gift_survey");
  }
  const handleSignUp = ({ name, email, password, confirmPassword }) => {
    signup({ name, email, password, confirmPassword })
      .then(() => {
        setActiveModal("sign in");
        return signin({ email, password }).then((data) => {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setUser(data.user);
          setActiveModal("");
        });
      })
      .catch((err) => {
        console.error("Registration error", err);
      });
  };
  const handleSignIn = ({ email, password }) => {
    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Login error", error.message);
      });
  };
  const switchToSignUp = () => {
    setTimeout(() => {
      setActiveModal("sign up");
    });
  };
  const switchToSignIn = () => {
    setTimeout(() => setActiveModal("Log in"));
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    auth
      .getCurrentUser(token)
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check failed", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

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
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
        />

        <Main
          showItems={formSubmitted}
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
        activeModal={activeModal === "gift_survey"}
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
          max="10000"
          step="1"
          defaultValue={priceRange}
          onChange={setPriceRange}
          className="modal__input-range"
        />
      </FormModal>
      <ItemModal
        activeModal={activeModal === "preview"}
        item={selectedItem}
        onClose={closeActiveModal}
      />
      <CartModal
        activeModal={activeModal === "view_cart"}
        items={selectedItemsToAdd}
        onClose={closeActiveModal}
      />
      <LoginModal
        isOpen={activeModal === "Log in"}
        onClose={closeActiveModal}
        onSignIn={handleSignIn}
        onSignUpModal={switchToSignUp}
      />
      <SignUpModal
        isOpen={activeModal === "sign up"}
        onClose={closeActiveModal}
        onSignInModal={switchToSignIn}
        onSignUp={handleSignUp}
      />
    </div>
  );
}

export default App;
