from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Set your Gemini API Key
GEN_AI_API_KEY = "AIzaSyArE3dgcIbny826F7yJ-udA9ZpejwQzGkA"
genai.configure(api_key=GEN_AI_API_KEY)

@app.route("/generate_recipe", methods=["POST"])
def generate_recipe():
    try:
        data = request.get_json()
        ingredients = data.get("ingredients", "")

        if not ingredients:
            return jsonify({"error": "No ingredients provided"}), 400

        prompt = f"""
        Generate a structured recipe using the following ingredients: {ingredients}.
        Respond in this structured format:

        **Recipe Title:** [Title]
        
        **Ingredients:**
        - List of ingredients

        **Equipment:**
        - List of equipment needed (or say 'No special equipment needed' if none)

        **Instructions:**
        1. Step-by-step cooking instructions

        **Unique Aspects:**
        - Highlight the unique features of this recipe
        """

        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        if response and response.text:
            return jsonify({"recipe": response.text})
        else:
            return jsonify({"error": "Failed to generate recipe"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
