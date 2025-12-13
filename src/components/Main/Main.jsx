import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import { recipients, testItems } from "../../utils/constants";
import RecipientCard from "../RecipientCard/RecipientCard";
function Main({
  showItems,
  handleItemClick,
  lowPriceRange,
  highPriceRange,
  seacrhTextValue,
  selectedCategory,
  handleAddToCart,
  handleRecipientClick,
  handleAddRecipient,
}) {
  let filterResult;
  let recipientsResult;
  if (showItems) {
    let filteredItems = testItems.filter((item) => {
      return item.price <= highPriceRange;
    });
    if (seacrhTextValue.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        return item.name.toLowerCase().includes(seacrhTextValue);
      });
    }
    if (selectedCategory !== "All") {
      filteredItems = filteredItems.filter((item) => {
        return item.broad_category.includes(selectedCategory);
      });
    }
    filterResult = filteredItems.map((item) => {
      return (
        <ItemCard
          key={item._id}
          item={item}
          onItemClick={handleItemClick}
          onAddItem={handleAddToCart}
        />
      );
    });
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
  } else {
  }
  let coworkers = recipients
    .filter((r) => {
      return r.group === "Co-worker";
    })
    .map((recipient) => {
      return (
        <RecipientCard
          key={recipient._id}
          recipient={recipient}
          onRecipientClick={handleRecipientClick}
        />
      );
    });

  let family = recipients
    .filter((r) => {
      return r.group === "Family";
    })
    .map((recipient) => {
      return (
        <RecipientCard
          key={recipient._id}
          recipient={recipient}
          onRecipientClick={handleRecipientClick}
        />
      );
    });
  let friends = recipients
    .filter((r) => {
      return r.group === "Friend";
    })
    .map((recipient) => {
      return (
        <RecipientCard
          key={recipient._id}
          recipient={recipient}
          onRecipientClick={handleRecipientClick}
        />
      );
    });
  return (
    <main>
      <section className="recipients">
        <h2 className="recipients__title">Family</h2>
        <ul className="recipients__list">{family}</ul>
        <h2 className="recipients__title">Co-wrokers</h2>
        <ul className="recipients__list">{coworkers}</ul>
        <h2 className="recipients__title">Friends</h2>
        <ul className="recipients__list">{friends}</ul>
        <button onClick={handleAddRecipient} className="recipient__add-btn">
          Add Recipient
        </button>
      </section>
      <section className="items">
        <ul className="items__list">{filterResult}</ul>
      </section>
    </main>
  );
}

export default Main;
