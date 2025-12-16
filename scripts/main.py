from fastapi import FastAPI, Query
from data_loader import stream_products
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/products")
def get_products(
    product_type: str | None = Query(None),
    min_price: float | None = Query(None),
    max_price: float | None = Query(None),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
):
    results = []
    total = 0

    # Stream and filter
    for item in stream_products():
        if product_type and item["broad_category"].lower() != product_type.lower():
            continue
        if min_price is not None and item["price"] < min_price:
            continue
        if max_price is not None and item["price"] > max_price:
            continue

        total += 1
        if total > offset and len(results) < limit:
            results.append(item)
        if len(results) >= limit:
            break

    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "results": results,
    }
