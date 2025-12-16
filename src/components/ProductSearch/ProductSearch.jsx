
import { useState } from "react";
import { getFilteredProducts } from "../../utils/productApi";
import "./ProductSearch.css";

export default function ProductSearch() {
  const [productType, setProductType] = useState("Clothing");
  const [minPrice, setMinPrice] = useState("5");
  const [maxPrice, setMaxPrice] = useState("20");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProducts([]);

    try {
      const data = await getFilteredProducts({
        product_type: productType,
        min_price: minPrice,
        max_price: maxPrice,
        limit: 5,
        offset: 0,
      });

      // Expecting an array of products – adjust if API shape is different
      setProducts(data);
    } catch (err) {
      console.error("Product search error:", err);
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="product-search">
      <h3 className="product-search__title">Find Gift Ideas</h3>

      <form className="product-search__form" onSubmit={handleSearch}>
        <div className="product-search__field">
          <label>Category</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Beauty">Beauty</option>
            <option value="Home">Home</option>
            {/* add more if your API supports them */}
          </select>
        </div>

        <div className="product-search__field product-search__field--inline">
          <div>
            <label>Min Price</label>
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Max Price</label>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <button
          className="product-search__btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Products"}
        </button>
      </form>

      {error && <p className="product-search__error">{error}</p>}

      {products.length > 0 && (
        <div className="product-search__results">
          {products.map((item) => (
            <div
              key={item.id || item._id || item.product_id}
              className="product-card"
            >
              <h4 className="product-card__name">{item.name || item.title}</h4>

              {item.image && (
                <img
                  src={item.image}
                  alt={item.name || item.title}
                  className="product-card__image"
                />
              )}

              <p className="product-card__price">
                {item.price ? `$${item.price}` : "Price not available"}
              </p>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="product-card__link"
                >
                  View Product
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
