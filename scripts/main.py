from fastapi import FastAPI, Query
from data_loader import stream_products
from fastapi.middleware.cors import CORSMiddleware
from datasets import load_dataset

app = FastAPI(title="Smart Gift Planner API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.on_event("startup")
def load_products():
    global products_cache
    dataset = load_dataset(
        "json",
        data_files="https://huggingface.co/datasets/palondon/amazonproducts/resolve/main/products_sample_10k_stratified.json",
        streaming=True,
    )
    # Load into memory once
    products_cache = list(dataset["train"])

@app.get("/products")
def get_products(
    product_type: str | None = Query(None),
    min_price: float | None = Query(None),
    max_price: float | None = Query(None),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
):
    # Filter the cached products
    filtered = [
        item for item in products_cache
        if (not product_type or item["broad_category"].lower() == product_type.lower())
        and (min_price is None or item["price"] >= min_price)
        and (max_price is None or item["price"] <= max_price)
    ]

    return {
        "total": len(filtered),
        "limit": limit,
        "offset": offset,
        "results": filtered[offset:offset+limit],
    }
