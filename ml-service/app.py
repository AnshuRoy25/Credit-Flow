# creditflow-ml-service/app.py
from flask import Flask, request, jsonify
from joblib import load
import numpy as np

from features import extract_features

app = Flask(__name__)

# Load model at startup
bundle = load("model.joblib")
model = bundle["model"]
feature_names = bundle["feature_names"]

@app.route("/predict-score", methods=["POST"])
def predict_score():
    data = request.get_json(force=True) or {}

    call_logs = data.get("callLogs", {})
    sms_data = data.get("smsData", {})
    location_data = data.get("locationData", {})
    installed_apps = data.get("installedApps", {})

    features_dict = extract_features(call_logs, sms_data, location_data, installed_apps)

    # Order features consistently
    x = [features_dict.get(name, 0.0) for name in feature_names]
    x_array = np.array(x).reshape(1, -1)

    y_pred = float(model.predict(x_array)[0])
    creditflow_score = max(1.0, min(100.0, y_pred))

    return jsonify({
        "creditflowScore": round(creditflow_score, 2)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
