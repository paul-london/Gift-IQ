import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import { testItems } from "../../utils/constants";
import RecipientCard from "../RecipientCard/RecipientCard";
import { useEffect, useRef, useState } from "react";

function Main({
  recipients,
  handleItemClick,
  lowPriceRange,
  highPriceRange,
  seacrhTextValue,
  handleAddToCart,
  handleAddRecipient,
  handleDeleteRecipient,
}) {
  const [filterRecipientGifts, setFilterRecipientGifts] = useState([]);
  const [recipientInfo, setRecipientInfo] = useState({});

  const count = useRef(0);
  useEffect(() => {
    if (count.current < 3) {
      count.current++;
      return;
    }
    if (recipients?.length > 0) {
      handleRecipientClick(recipients[recipients.length - 1]);
    }
  }, [recipients]);

  function handleGoBack() {
    setFilterRecipientGifts([]);
  }

  function handleRecipientClick(recipient) {
    debugger;
    setRecipientInfo(recipient);
    const filterRecipientG = testItems
      .filter((item) => {
        return (
          item.price <= recipient.priceRange &&
          item.broad_category.includes(recipient.categories[0])
        );
      })
      .map((item) => {
        return (
          <ItemCard
            key={item._id}
            item={item}
            onItemClick={handleItemClick}
            onAddItem={handleAddToCart}
          />
        );
      });
    setFilterRecipientGifts(filterRecipientG);
  }

  // let filteredItems = testItems.filter((item) => {
  //   return lowPriceRange <= item.price && item.price <= highPriceRange;
  // });
  // if (seacrhTextValue.length > 0) {
  //   filteredItems = filteredItems.filter((item) => {
  //     return item.name.toLowerCase().includes(seacrhTextValue);
  //   });
  // }
  // if (selectedCategory !== "All") {
  //   filteredItems = filteredItems.filter((item) => {
  //     return item.broad_category.includes(selectedCategory);
  //   });
  // }
  // filterResult = filteredItems.map((item) => {
  //   return (
  //     <ItemCard
  //       key={item._id}
  //       item={item}
  //       onItemClick={handleItemClick}
  //       onAddItem={handleAddToCart}
  //     />
  //   );
  // });
  let coworkers, family, friends, other;

  if (recipients?.length > 0) {
    coworkers = recipients
      .filter((r) => {
        return r.group === "Co-workers";
      })
      .map((recipient) => {
        return (
          <RecipientCard
            key={recipient._id}
            recipient={recipient}
            onRecipientClick={handleRecipientClick}
            onRecipientDelete={handleDeleteRecipient}
          />
        );
      });

    family = recipients
      .filter((r) => {
        return r.group === "Family";
      })
      .map((recipient) => {
        return (
          <RecipientCard
            key={recipient._id}
            recipient={recipient}
            onRecipientClick={handleRecipientClick}
            onRecipientDelete={handleDeleteRecipient}
          />
        );
      });
    friends = recipients
      .filter((r) => {
        return r.group === "Friends";
      })
      .map((recipient) => {
        return (
          <RecipientCard
            key={recipient._id}
            recipient={recipient}
            onRecipientClick={handleRecipientClick}
            onRecipientDelete={handleDeleteRecipient}
          />
        );
      });

    other = recipients
      .filter((r) => {
        return r.group === "Other";
      })
      .map((recipient) => {
        return (
          <RecipientCard
            key={recipient._id}
            recipient={recipient}
            onRecipientClick={handleRecipientClick}
            onRecipientDelete={handleDeleteRecipient}
          />
        );
      });
  }
  return (
    <main className="main">
      <section
        className={`recipients ${
          filterRecipientGifts?.length === 0 && "recipients_opened"
        }`}
      >
        <h2 className="recipients__title">Family</h2>
        <p
          className={`recipients__exist ${
            (family?.length === 0 || family === undefined) &&
            "recipient__show-empty"
          }`}
        >
          No one to buy gifts for yet!
        </p>
        <ul className="recipients__list">{family}</ul>
        <h2 className="recipients__title">Friends</h2>
        <p
          className={`recipients__exist ${
            (friends?.length === 0 || friends === undefined) &&
            "recipient__show-empty"
          }`}
        >
          No one to buy gifts for yet!
        </p>
        <ul className="recipients__list">{friends}</ul>
        <h2 className="recipients__title">Co-wrokers</h2>
        <p
          className={`recipients__exist ${
            (coworkers?.length === 0 || coworkers === undefined) &&
            "recipient__show-empty"
          }`}
        >
          No one to buy gifts for yet!
        </p>
        <ul className="recipients__list">{coworkers}</ul>
        <h2 className="recipients__title">Other</h2>
        <p
          className={`recipients__exist ${
            (other?.length === 0 || other === undefined) &&
            "recipient__show-empty"
          }`}
        >
          No one to buy gifts for yet!
        </p>
        <ul className="recipients__list">{other}</ul>
        <button onClick={handleAddRecipient} className="recipient__add-btn">
          Add Recipient
        </button>
      </section>
      <section
        className={`recipient-main ${
          filterRecipientGifts?.length > 0 && "recipient_opened"
        }`}
      >
        <h2 className="recipient__title">{recipientInfo?.name} Gifts</h2>
        <ul className="recipient__gift-list">{filterRecipientGifts}</ul>
        <button onClick={handleGoBack} className="recipient__add-btn ">
          Back
        </button>
      </section>
    </main>
  );
}

export default Main;
