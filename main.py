from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import sys
import os

# Add scripts folder to path
sys.path.insert(0, os.path.dirname(__file__))

from data_loader import load_products
from recommender import initialize_models, baseline_recommender, enhanced_recommender, hybrid_recommender

app = FastAPI(title="Smart Gift Planner API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

# Global variable for products
df_products = None

@app.on_event("startup")
async def startup_event():
    """Load products and initialize models on startup"""
    global df_products
    print("Loading products...")
    
    # Load full dataset
    df_products = pd.read_csv("amazon_products.csv")
    
    # Filter to available products only
    availability = pd.read_csv("amazon_availability_final.csv")
    available_products = availability[availability['availability'] == 'available']
    
    df_products = df_products.merge(
        available_products[['asin']], 
        on='asin', 
        how='inner')
    
    print(f"Filtered to {len(df_products):,} available products")
    
    # Initialize recommendation models
    print("Initializing AI models:")
    initialize_models(df_products, sample_size=50000)
    
    print("API ready.")

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Smart Gift Planner API",
        "endpoints": [
            "/recommendations/baseline",
            "/recommendations/enhanced",
            "/recommendations/hybrid"]}

@app.get("/recommendations/baseline")
def get_baseline_recommendations(
    interest: str = Query(..., description="User's interest (e.g., 'photography')"),
    min_price: float = Query(0, description="Minimum price"),
    max_price: float = Query(1000, description="Maximum price"),
    limit: int = Query(10, description="Number of recommendations")):
    """Get recommendations using baseline TF-IDF model"""
    try:
        results = baseline_recommender(interest, min_price, max_price, top_n=limit)
        return {
            "model": "baseline",
            "query": {"interest": interest, "min_price": min_price, "max_price": max_price},
            "count": len(results),
            "recommendations": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/recommendations/enhanced")
def get_enhanced_recommendations(
    interest: str = Query(..., description="User's interest"),
    min_price: float = Query(0, description="Minimum price"),
    max_price: float = Query(1000, description="Maximum price"),
    limit: int = Query(10, description="Number of recommendations")):
    """Get recommendations using enhanced sentence-transformer model"""
    try:
        results = enhanced_recommender(interest, min_price, max_price, top_n=limit)
        return {
            "model": "enhanced",
            "query": {"interest": interest, "min_price": min_price, "max_price": max_price},
            "count": len(results),
            "recommendations": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/recommendations/hybrid")
def get_hybrid_recommendations(
    interest: str = Query(..., description="User's interest"),
    min_price: float = Query(0, description="Minimum price"),
    max_price: float = Query(1000, description="Maximum price"),
    limit: int = Query(10, description="Number of recommendations")):
    """Get recommendations using hybrid multi-signal model"""
    try:
        results = hybrid_recommender(interest, min_price, max_price, top_n=limit)
        return {
            "model": "hybrid",
            "query": {"interest": interest, "min_price": min_price, "max_price": max_price},
            "count": len(results),
            "recommendations": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))