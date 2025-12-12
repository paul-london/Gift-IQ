# data_loader.py
import pandas as pd

def load_products(json_path="products.json"):
    """
    Specify a .json file to read and return the corresponding pandas dataframe.
    """
    df = pd.read_json(json_path)
    # Optional: add computed columns
    # df['price_with_tax'] = df['price'] * 1.08
    return df