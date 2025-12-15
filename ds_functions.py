# ds_functions.py

def categorize_products(df):
    """
    Map product types to broad categories.
    """
    category_map = {
        "Men's Clothing": "Clothing",
        "Women's Clothing": "Clothing",
        "Electronics": "Electronics",
        "Home Appliances": "Home",
        "Beauty & Personal Care": "Beauty",
        "Toys": "Toys",
        "Sports & Outdoors": "Sports",
        # Add more as needed
    }
    # Use 'type' column if exists, else skip
    if "type" in df.columns:
        df["broad_category"] = df["type"].map(category_map).fillna("Other")
    return df


def filter_products(df, product_type=None, min_price=None, max_price=None):
    """
    Filter products based on type and price.
    """
    filtered = df

    if product_type:
        filtered = filtered[filtered["type"] == product_type]

    if min_price is not None:
        filtered = filtered[filtered["price"] >= min_price]

    if max_price is not None:
        filtered = filtered[filtered["price"] <= max_price]

    return filtered
