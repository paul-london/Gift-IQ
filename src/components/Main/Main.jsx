import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import { testItems } from "../../utils/constants";
function Main({
  showItems,
  handleItemClick,
  lowPriceRange,
  highPriceRange,
  seacrhTextValue,
  selectedCategory,
  handleAddToCart,
}) {
  let filterResult;
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
    filterResult = testItems.map((item) => {
      return (
        <ItemCard
          key={item._id}
          item={item}
          onItemClick={handleItemClick}
          onAddItem={handleAddToCart}
        />
      );
    });
  }

  return (
    <main>
      <section className="items">
        <h2>Recommended Items</h2>
        <ul className="items__list">{filterResult}</ul>
      </section>
    </main>
  );
}

export default Main;
