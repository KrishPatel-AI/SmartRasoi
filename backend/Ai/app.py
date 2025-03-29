from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

# Load trained model & label encoders
with open("waste_model.pkl", "rb") as f:
    waste_model = pickle.load(f)

with open("label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

  # Load saved feature order

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  
        df = pd.DataFrame([data])  

        # Encode categorical values using stored LabelEncoders
        for col in label_encoders:
            if col in df.columns:
                df[col] = df[col].map(lambda x: label_encoders[col].transform([x])[0] if x in label_encoders[col].classes_ else -1)

        # Ensure correct feature order
         # **Fix feature order before prediction**

        # Predict waste amount
        predicted_waste = waste_model.predict(df)
        
        # Convert NumPy float32 to Python float for JSON serialization
        predicted_waste_amount = float(predicted_waste[0])  # ✅ FIX HERE

        return jsonify({"predicted_waste_amount": round(predicted_waste_amount, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
