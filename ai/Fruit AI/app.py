from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load the trained model
try:
    model = load_model("fruit_classifier.h5")  # Ensure model filename is correct
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")

# Define class labels (modify based on your model)
class_labels = ["Fresh Strawberry", "Rotten Strawberry", 
                "Fresh Pomegranate", "Rotten Pomegranate", 
                "Fresh Peach", "Rotten Peach"]

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Process the image (resize to 224x224 as expected by model)
        img = Image.open(io.BytesIO(file.read())).convert("RGB")
        img = img.resize((224, 224))  # Match model input size
        img_array = np.array(img) / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make prediction
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)
        confidence = float(np.max(prediction))  # Convert float32 to Python float

        result = class_labels[predicted_class]
        freshness = "Fresh" if "Fresh" in result else "Rotten"

        return jsonify({
            "prediction": result,
            "freshness": freshness,
            "confidence": round(confidence * 100, 2)  # Convert to percentage
        })

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
