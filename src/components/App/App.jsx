import { useEffect, useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import FormModal from "../FormModal/FormModal";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import { catregoryOptions } from "../../utils/constants";
import { groupOptions } from "../../utils/constants";
import { signup, signin, getCurrentUser } from "../../utils/auth";
import Footer from "../Footer/Footer";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [lowPriceRange, setLowPriceRange] = useState(0);
  const [highPriceRange, setHighPriceRange] = useState(1000);
  const [seacrhText, setSeacrhText] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemsToAdd, setSelectedItemsToAdd] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("jwt");

  const OpenGiftSurveyModal = () => {
    setActiveModal("gift_survey");
  };
  const openSignUpModal = () => {
    setActiveModal("sign up");
  };
  const openSignInModal = () => {
    setActiveModal("Log in");
  };

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
    debugger;
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

    getCurrentUser(token)
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
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
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
        activeModal={activeModal === "gift_survey"}
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
            <div className="form__checkbox-inside" key={option.id}>
              <input
                className="form__input_type_checkbox"
                id={option.id}
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
        activeModal={activeModal === "preview"}
        item={selectedItem}
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
      <Footer />
    </div>
  );
}

export default App;
