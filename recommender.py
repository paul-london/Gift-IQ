import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import pickle
import os

# Initialize sentence transformer model
print("Loading sentence transformer model:")
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')

# Global variables for embeddings and data
tfidf_vectorizer = None
tfidf_matrix = None
product_embeddings = None
df_products = None

def initialize_models(products_df, sample_size=50000):
    """
    Initialize recommendation models with product data
    
    Parameters:
    - products_df: DataFrame with product data
    - sample_size: Number of products to use for embeddings
    """
    global tfidf_vectorizer, tfidf_matrix, product_embeddings, df_products
    
    print(f"Initializing models with {len(products_df):,} products...")
    
    # Sample for efficiency
    df_products = products_df.sample(n=min(sample_size, len(products_df)), random_state=42).reset_index(drop=True)

    # Handle different possible column names
    category_col = None
    if 'category_name' in df_products.columns:
        category_col = 'category_name'
    elif 'category' in df_products.columns:
        category_col = 'category'
    elif 'main_category' in df_products.columns:
        category_col = 'main_category'

    if category_col:
        df_products['combined_text'] = (
           df_products['title'].fillna('').astype(str) + ' ' +
           df_products[category_col].fillna('').astype(str))
    else:
        df_products['combined_text'] = df_products['title'].fillna('').astype(str)

    
    # Initialize TF-IDF for baseline
    print("Training TF-IDF vectorizer...")
    tfidf_vectorizer = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2),
        stop_words='english',
        min_df=2)
    tfidf_matrix = tfidf_vectorizer.fit_transform(df_products['combined_text'])
    
    # Generate sentence embeddings for enhanced/hybrid
    print("Generating sentence embeddings...")
    product_embeddings = sentence_model.encode(
        df_products['combined_text'].tolist(),
        show_progress_bar=True,
        convert_to_numpy=True)
    
    print("Models initialized successfully.")
    return df_products

def baseline_recommender(interest, min_price, max_price, top_n=10):
    """Baseline TF-IDF recommender"""
    global tfidf_vectorizer, tfidf_matrix, df_products
    
    # Filter by price
    filtered_df = df_products[
        (df_products['price'] >= min_price) & 
        (df_products['price'] <= max_price)].copy()
    
    if len(filtered_df) == 0:
        return []
    
    # Get indices
    filtered_indices = filtered_df.index.tolist()
    filtered_tfidf = tfidf_matrix[filtered_indices]
    
    # Transform query
    interest_vector = tfidf_vectorizer.transform([interest])
    
    # Calculate similarity
    similarities = cosine_similarity(interest_vector, filtered_tfidf).flatten()
    filtered_df['similarity_score'] = similarities
    
    results = filtered_df.sort_values('similarity_score', ascending=False).head(top_n)
    
    return results.to_dict('records')

def enhanced_recommender(interest, min_price, max_price, top_n=10):
    """Enhanced sentence-transformer recommender"""
    global sentence_model, product_embeddings, df_products
    
    # Filter by price
    filtered_df = df_products[
        (df_products['price'] >= min_price) & 
        (df_products['price'] <= max_price)].copy()
    
    if len(filtered_df) == 0:
        return []
    
    # Get embeddings for filtered products
    filtered_indices = filtered_df.index.tolist()
    filtered_embeddings = product_embeddings[filtered_indices]
    
    # Encode interest
    interest_embedding = sentence_model.encode([interest], convert_to_numpy=True)
    
    # Calculate similarity
    similarities = cosine_similarity(interest_embedding, filtered_embeddings).flatten()
    
    # Normalize scores
    filtered_df['relevance'] = similarities
    filtered_df['relevance_norm'] = (similarities - similarities.min()) / (similarities.max() - similarities.min() + 1e-10)
    filtered_df['rating_norm'] = filtered_df['stars'] / 5.0
    
    # Calculate final score
    filtered_df['final_score'] = (
        0.7 * filtered_df['relevance_norm'] +
        0.3 * filtered_df['rating_norm'])
    
    # Sort and return
    results = filtered_df.sort_values('final_score', ascending=False).head(top_n)
    
    return results.to_dict('records')

def hybrid_recommender(interest, min_price, max_price, top_n=10):
    """Hybrid multi-signal recommender"""
    global sentence_model, product_embeddings, df_products
    
    # Filter by price
    filtered_df = df_products[
        (df_products['price'] >= min_price) & 
        (df_products['price'] <= max_price)].copy()
    
    if len(filtered_df) == 0:
        return []
    
    # Get embeddings
    filtered_indices = filtered_df.index.tolist()
    filtered_embeddings = product_embeddings[filtered_indices]
    
    # Encode interest
    interest_embedding = sentence_model.encode([interest], convert_to_numpy=True)
    
    # Calculate similarity
    similarities = cosine_similarity(interest_embedding, filtered_embeddings).flatten()
    
    # Normalize all scores
    filtered_df['relevance_norm'] = (similarities - similarities.min()) / (similarities.max() - similarities.min() + 1e-10)
    filtered_df['rating_norm'] = filtered_df['stars'] / 5.0
    
    # Popularity (log scale)
    filtered_df['popularity_norm'] = np.log1p(filtered_df['reviews']) / (np.log1p(filtered_df['reviews'].max()) + 1e-10)
    
    # Value (inverse price)
    filtered_df['value_norm'] = 1 - ((filtered_df['price'] - filtered_df['price'].min()) / (filtered_df['price'].max() - filtered_df['price'].min() + 1e-10))
    
    # Hybrid score
    filtered_df['hybrid_score'] = (
        0.40 * filtered_df['relevance_norm'] +
        0.30 * filtered_df['rating_norm'] +
        0.20 * filtered_df['popularity_norm'] +
        0.10 * filtered_df['value_norm'])
    
    # Sort and return
    results = filtered_df.sort_values('hybrid_score', ascending=False).head(top_n)
    
    return results.to_dict('records')
