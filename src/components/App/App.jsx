import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { testItems } from "../../utils/constants";

import Footer from "../Footer/Footer";
import SubNav from "../SubNav/SubNav";
import ProfilePage from "../ProfilePage/ProfilePage";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [lowPriceRange, setLowPriceRange] = useState(0);
  const [highPriceRange, setHighPriceRange] = useState(1000);
  const [seacrhText, setSeacrhText] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [shouldResetLoginForm, setShouldResetLoginForm] = useState(false);
  const [shouldResetSignUpForm, setShouldResetSignUpForm] = useState(false);
  const [currentTab, setCurrentTab] = useState("home");
  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    setGifts(testItems);
  }, []);

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
  const [countCategories, setCountCategories] = useState(0);

  const [recipientsArray, setRecipientsArray] = useState([]);
  const loaclRecipientsString = localStorage.getItem("recipients");
  let loaclRecipients = JSON.parse(loaclRecipientsString);
  const navigate = useNavigate();
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recipients")) || [];
    setRecipientsArray(stored);
  }, []);

  function handleItemClick(item) {
    setActiveModal("preview");
    setSelectedItem(item);
  }
  function closeActiveModal() {
    if (activeModal === "gift_survey") {
      resetForm();
    }
    setActiveModal("");
  }
  function resetForm() {
    setFormSlectedCategories([]);
    setFormSelectedGroup("");
    setFormName("");
    setFormPriceRange("50");
    setCountCategories(0);
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

  function handleToggleSaved(checked, item, recipientInfo) {
    const recipientsTemp = [...recipientsArray];
    const productIndex = recipientInfo.products.findIndex(
      (curr) => curr._id === item._id
    );
    let updatedRecipientsArray;
    if (productIndex < 0 && checked) {
      // recipientInfo.products = [...recipientInfo.products, item];
      updatedRecipientsArray = recipientsTemp.map((rec) => {
        if (rec._id == recipientInfo._id) {
          item.isLiked = true;
          rec.products = [...rec.products, item];
        }
      });
    } else {
      updatedRecipientsArray = recipientsTemp.map((rec) => {
        if (rec._id == recipientInfo._id) {
          rec.products.splice(productIndex, 1);
        }
      });
    }
    localStorage.setItem("recipients", JSON.stringify(recipientsArray));
    setRecipientsArray(updatedRecipientsArray);
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
    resetForm();
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
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setUser(data.user);
          console.log(data.user);
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
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        navigate("/profile");
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
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setShouldResetLoginForm(true);
    setShouldResetSignUpForm(true);
    setActiveModal("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getCurrentUser(token)
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check failed", err);
        localStorage.removeItem("token");
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
  function handleOnCheckBoxChange(e, category) {
    if (countCategories < 3 && e.target.checked) {
      const count = countCategories + 1;
      setCountCategories(count);
      setFormSlectedCategories([...formSlectedCategories, category]);
    } else if (countCategories <= 3) {
      if (!e.target.checked) {
        const count = countCategories - 1;
        const index = formSlectedCategories.indexOf(category);
        formSlectedCategories.splice(index, 1);
        setCountCategories(count);
      } else {
        e.target.checked = false;
        alert("Please choose up to 3 categories.", "Smart Gift Planner");
      }
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
          openSignInModal={openSignInModal}
          openSignUpModal={openSignUpModal}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />
        <SubNav active={currentTab} onChange={setCurrentTab} />
        <Routes>
          {/* Default route → redirect */}
          <Route
            path="/"
            element={<Navigate to="/smart_gift_planner" replace />}
          />

          {/* Main page */}
          <Route
            path="/smart_gift_planner"
            element={
              <Main
                recipients={recipientsArray}
                handleItemClick={handleItemClick}
                lowPriceRange={lowPriceRange}
                highPriceRange={highPriceRange}
                seacrhTextValue={seacrhText}
                handleToggleSaved={handleToggleSaved}
                handleAddRecipient={handleAddRecipient}
                handleDeleteRecipient={handleDeleteRecipient}
              />
            }
          />

          {/* Profile page */}
          <Route
            path="/profile"
            element={
              <ProfilePage
                user={user}
                gifts={user?.gifts || []}
                token={localStorage.getItem("token")}
              />
            }
          />
        </Routes>

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
          shouldResetLoginForm={shouldResetLoginForm}
          onResetComplete={() => setShouldResetLoginForm(false)}
        />
        <SignUpModal
          isOpen={activeModal === "sign up"}
          onClose={closeActiveModal}
          onSignInModal={switchToSignIn}
          onSignUp={handleSignUp}
          shouldResetSignUpForm={shouldResetSignUpForm}
          onResetComplete={() => setShouldResetSignUpForm(false)}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
