from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Set your Gemini API Key
GEN_AI_API_KEY = "AIzaSyBZXA_dcKsH3B8fyRvpkKYaJHguzjTYPdw"
genai.configure(api_key=GEN_AI_API_KEY)

@app.route("/generate_title", methods=["POST"])
def generate_title():
    try:
        data = request.get_json()
        ingredients = data.get("ingredients", "")

        if not ingredients:
            return jsonify({"error": "No ingredients provided"}), 400

        prompt = f"""
        Generate a recipe title using the following ingredients: {ingredients}.
        Respond only with the recipe title.
        """

        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        if response and response.text:
            return jsonify({"title": response.text.strip()})
        else:
            return jsonify({"error": "Failed to generate recipe title"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
