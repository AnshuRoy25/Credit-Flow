# creditflow-ml-service/train.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from joblib import dump

def train_and_save_model():
    # 1) Load CSV
    df = pd.read_csv("training_data.csv")
    print(f"Loaded training data: {df.shape[0]} rows, {df.shape[1]} columns")

    # 2) Split features and target
    X = df.drop(columns=["creditflow_score"])
    y = df["creditflow_score"]

    # 3) Train RandomForest
    model = RandomForestRegressor(
        n_estimators=200,
        max_depth=8,
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X, y)
    print("Model training completed")

    # 4) Save model + feature names
    dump(
        {"model": model, "feature_names": list(X.columns)},
        "model.joblib",
    )
    print("Model saved to model.joblib")

if __name__ == "__main__":
    train_and_save_model()
