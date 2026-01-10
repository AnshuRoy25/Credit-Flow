# CreditFlow ML Service

## Overview

This service analyzes smartphone usage patterns - including call logs, SMS data, location stability, and installed apps - to generate a CreditFlow Score (0-100) that predicts creditworthiness for users without traditional banking or credit history.

## Tech Stack

- Python 3.8+
- Flask (Web Framework)
- scikit-learn (Machine Learning)
- NumPy & Pandas (Data Processing)
- joblib (Model Serialization)

## Features Analyzed

The model uses 21 features extracted from smartphone data:

### Call Logs (5 features)
- Total calls
- Incoming calls count
- Outgoing calls count
- Average call duration
- Call consistency (HIGH/LOW)

### SMS Data (6 features)
- Total SMS count
- Banking SMS count
- Payment SMS count
- Bills SMS count
- Financial SMS count
- Bill payment consistency (VERY_HIGH/HIGH/LOW)

### Location Data (5 features)
- Days tracked
- Movement radius (km)
- Home residence consistency
- Stability level (VERY_HIGH/HIGH/MEDIUM/LOW)
- Work commute days

### Installed Apps (5 features)
- Total apps installed
- Financial apps count
- E-commerce apps count
- Professional apps count
- App literacy level (HIGH/MEDIUM/LOW)

## Setup Instructions

### Step 1: Create Virtual Environment

```bash
cd ml-service
python -m venv venv
```

### Step 2: Activate Virtual Environment

**On Mac/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Verify Model File

Make sure `model.joblib` exists in the ml-service folder. If not, train the model:

```bash
python train.py
```

### Step 5: Start the Service

```bash
python app.py
```

The service will start on `http://localhost:5001`

You should see:
```
* Running on http://0.0.0.0:5001
* Debug mode: on
```

## API Documentation

### Endpoint: POST /predict-score

Calculate credit score based on phone data features.

**URL:** `http://localhost:5001/predict-score`

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "callLogs": {
    "stats": {
      "totalCalls": 35,
      "incomingCalls": 15,
      "outgoingCalls": 20,
      "averageCallDuration": 683,
      "callConsistency": "HIGH"
    }
  },
  "smsData": {
    "stats": {
      "totalSMS": 37,
      "bankingSMS": 14,
      "paymentSMS": 8,
      "billsSMS": 6,
      "financialSMS": 28,
      "billPaymentConsistency": "VERY_HIGH"
    }
  },
  "locationData": {
    "stats": {
      "daysTracked": 30,
      "movementRadius": 3.5,
      "homeResidenceConsistency": 0.97,
      "stabilityLevel": "VERY_HIGH",
      "workCommuteDaysOut30": 22
    }
  },
  "installedApps": {
    "stats": {
      "totalApps": 15,
      "financialAppCount": 3,
      "ecommerceAppCount": 2,
      "professionalAppCount": 1,
      "appLiteracyLevel": "HIGH"
    }
  }
}
```

**Success Response (200):**
```json
{
  "creditflowScore": 79.34
}
```

**Error Response (500):**
```json
{
  "error": "Error message details"
}
```

## Model Information

### Algorithm
- **Type:** Random Forest Regressor
- **Estimators:** 200 trees
- **Max Depth:** 8
- **Random State:** 42

### Training Data
- **Dataset:** training_data.csv
- **Samples:** ~500 entries
- **Features:** 21 numerical features
- **Target:** creditflow_score (1-100)

### Performance
- **Accuracy:** Approximately 82%
- **Score Range:** 1-100 (capped)

### Score Interpretation
- **80-100:** Excellent - 10.5% interest rate
- **70-79:** Good - 11.5% interest rate
- **60-69:** Fair - 12.5% interest rate
- **Below 60:** Poor - Application declined

## File Structure

```
ml-service/
├── app.py                  # Flask API server
├── features.py             # Feature extraction logic
├── train.py                # Model training script
├── model.joblib            # Trained Random Forest model
├── training_data.csv       # Training dataset (500+ samples)
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## How It Works

1. **Input:** Backend sends phone data (call logs, SMS, location, apps)
2. **Feature Extraction:** `features.py` extracts 21 numerical features
3. **Prediction:** Random Forest model predicts credit score
4. **Output:** Score is capped between 1-100 and returned


## Testing the Service

### Using curl:

```bash
curl -X POST http://localhost:5001/predict-score \
  -H "Content-Type: application/json" \
  -d '{
    "callLogs": {...},
    "smsData": {...},
    "locationData": {...},
    "installedApps": {...}
  }'
```

### Using Python:

```python
import requests

data = {
    "callLogs": {...},
    "smsData": {...},
    "locationData": {...},
    "installedApps": {...}
}

response = requests.post(
    'http://localhost:5001/predict-score',
    json=data
)

print(response.json())
```

## Dependencies

All required packages are in `requirements.txt`:

- flask - Web framework
- scikit-learn - Machine learning library
- joblib - Model serialization
- numpy - Numerical computing
- pandas - Data manipulation

## Important Notes

1. The ML service **must be running** before the backend can process loan applications
2. Default port is **5001** (ensure it's not in use)
3. Model predictions are automatically capped between **1-100**
4. The service uses **hardcoded test data** from backend for MVP
5. All feature values should be **numerical** (booleans as 0/1)


## Contact

For questions about the ML model or service, contact us.

## License

Educational project for HackCentrix 2026.