const PRODUCTS_BASE_URL = "https://smart-gift-planner-test.onrender.com";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
}

/**
 * Fetch filtered products from the external API.
 *
 * params = {
 *   product_type: string (e.g. "Clothing"),
 *   min_price: number,
 *   max_price: number,
 *   limit: number,
 *   offset: number,
 * }
 */
export function getFilteredProducts({
  product_type,
  min_price,
  max_price,
  limit = 10,
  offset = 0,
}) {
  const params = new URLSearchParams();

  if (product_type) params.append("product_type", product_type);
  if (min_price !== undefined && min_price !== "") {
    params.append("min_price", min_price);
  }
  if (max_price !== undefined && max_price !== "") {
    params.append("max_price", max_price);
  }

  params.append("limit", limit);
  params.append("offset", offset);

  const url = `${PRODUCTS_BASE_URL}/products?${params.toString()}`;

  return fetch(url).then(checkResponse);
}
