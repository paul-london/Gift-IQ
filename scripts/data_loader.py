from datasets import load_dataset

def stream_products():
        """
    Stream products dataset from Hugging Face.
    Returns a generator of product dicts.
    """
    dataset = load_dataset(
        "json",
        data_files="https://huggingface.co/datasets/palondon/amazonproducts/resolve/main/products_full_clean_categories.json",
        streaming=True,
    )

    for item in dataset["train"]:
        yield item
