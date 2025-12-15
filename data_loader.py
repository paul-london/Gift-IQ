# data_loader.py
import pandas as pd

_product_df = None

def load_products(json_path="../data/final_products.json"):
    global _product_df
    if _product_df is None:
        import pandas as pd
        import os
        full_path = os.path.join(os.path.dirname(__file__), json_path)
        _product_df = pd.read_json(full_path)
    return _product_df