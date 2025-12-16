import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import { testItems } from "../../utils/constants";
import RecipientCard from "../RecipientCard/RecipientCard";
import { useEffect, useRef, useState } from "react";
import ProductSearchModal from "../ProductSearch/ProductSearchModal/ProductSearchModal";

function Main({
  recipients,

  handleItemClick,
  lowPriceRange,
  highPriceRange,
  seacrhTextValue,
  handleAddToCart,
  handleAddRecipient,
  handleDeleteRecipient,
  handleToggleSaved,
}) {
  const [filterRecipientGifts, setFilterRecipientGifts] = useState([]);
  const [recipientInfo, setRecipientInfo] = useState({});

  const count = useRef(0);
  const arrayLength = useRef(0);
  const [showGiftFinder, setShowGiftFinder] = useState(false);

  function openGiftFinder() {
    setShowGiftFinder(true);
  }

  function closeGiftFinder() {
    setShowGiftFinder(false);
  }

  useEffect(() => {
    if (count.current < 3) {
      count.current++;
    } else {
      if (recipients.length > arrayLength.current) {
        handleRecipientClick(recipients[recipients.length - 1], true);
      }
    }

    if (recipients !== undefined) arrayLength.current = recipients?.length;
  }, [recipients]);

  useEffect(() => {
    if (recipientInfo?.name?.length > 0 && filterRecipientGifts?.length > 0) {
      handleRecipientClick(recipientInfo);
    }
  }, [seacrhTextValue]);
  function handleGoBack() {
    setFilterRecipientGifts([]);
  }

  function handleRecipientClick(recipient) {
    setRecipientInfo(recipient);

    let filteredItems = testItems.filter((item) => {
      return (
        (item.price <= recipient.priceRange &&
          item.broad_category.includes(recipient.categories[0])) ||
        item.broad_category.includes(recipient.categories[1]) ||
        item.broad_category.includes(recipient.categories[2])
      );
    });

    if (seacrhTextValue.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        return (
          item.name.toLowerCase().includes(seacrhTextValue) ||
          item.description.toLowerCase().includes(seacrhTextValue)
        );
      });
    }

    const filterRecipientG = filteredItems.map((item) => {
      return (
        <ItemCard
          key={item._id}
          item={item}
          onItemClick={handleItemClick}
          onAddItem={handleAddToCart}
          recipient={recipient}
          onLikeItem={handleToggleSaved}
        />
      );
    });
    setFilterRecipientGifts(filterRecipientG);
    if (filterRecipientG?.length === 0) {
      alert("Products not found at this moment!");
    }
  }
  let coworkers, family, friends, other;

  if (recipients[0] === undefined) {
  } else {
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
              onFindGift={openGiftFinder}
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
              onFindGift={openGiftFinder}
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
              onFindGift={openGiftFinder}
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
              onFindGift={openGiftFinder}
              onRecipientDelete={handleDeleteRecipient}
            />
          );
        });
    }
  }

  return (
    <main className="main">
      <section
        className={`recipients ${
          filterRecipientGifts?.length === 0 &&
          seacrhTextValue.length === 0 &&
          "recipients_opened"
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
        <h2 className="recipients__title">Co-workers</h2>
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
      <ProductSearchModal open={showGiftFinder} onClose={closeGiftFinder} />
    </main>
  );
}

export default Main;
