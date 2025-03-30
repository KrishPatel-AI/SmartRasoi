"use client";
import { useState } from "react";

export default function RecipeGenerator() {
    const [ingredients, setIngredients] = useState("");
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState("");

    const generateRecipe = async () => {
        if (!ingredients.trim()) {
            alert("⚠️ Please enter some ingredients!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/generate-recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ingredients })
            });

            const data = await response.json();

            if (data.error) {
                setError("❌ Error: " + data.error);
                return;
            }

            setRecipe(parseRecipe(data.recipe));
            setError("");

        } catch (err) {
            setError("❌ Failed to fetch recipe!");
            console.error("Error:", err);
        }
    };

    const parseRecipe = (recipeText) => {
        const extract = (regex) => (recipeText.match(regex) || [null, ""])[1].trim();

        return {
            title: extract(/\*\*Recipe Title:\*\*([\s\S]*?)\n/),
            ingredients: extract(/\*\*Ingredients:\*\*([\s\S]*?)\n\*\*/)?.split("\n") || [],
            equipment: extract(/\*\*Equipment:\*\*([\s\S]*?)\n\*\*/)?.split("\n") || [],
            instructions: extract(/\*\*Instructions:\*\*([\s\S]*?)\n\*\*/)?.split("\n") || [],
            aspects: extract(/\*\*Unique Aspects:\*\*([\s\S]*)/)?.split("\n") || []
        };
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-4">🍽️ AI-Powered Recipe Generator</h2>
                <p className="text-gray-600 text-center">Enter ingredients and get a unique AI-generated recipe!</p>

                <textarea
                    className="w-full mt-4 p-2 border rounded"
                    placeholder="Enter ingredients, e.g., tomato, cheese, pasta"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                ></textarea>

                <button
                    className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                    onClick={generateRecipe}
                >
                    Generate Recipe
                </button>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                {recipe && (
                    <div className="mt-6 p-4 border rounded bg-gray-50">
                        <h3 className="text-xl font-semibold">{recipe.title || "Recipe"}</h3>

                        <h4 className="mt-3 font-bold">Ingredients:</h4>
                        <ul className="list-disc pl-5">
                            {recipe.ingredients.length ? recipe.ingredients.map((item, i) => <li key={i}>{item}</li>) : <li>⚠️ No ingredients provided.</li>}
                        </ul>

                        <h4 className="mt-3 font-bold">Equipment:</h4>
                        <ul className="list-disc pl-5">
                            {recipe.equipment.length ? recipe.equipment.map((item, i) => <li key={i}>{item}</li>) : <li>✅ No special equipment needed.</li>}
                        </ul>

                        <h4 className="mt-3 font-bold">Instructions:</h4>
                        <ol className="list-decimal pl-5">
                            {recipe.instructions.length ? recipe.instructions.map((item, i) => <li key={i}>{item}</li>) : <li>⚠️ No instructions provided.</li>}
                        </ol>

                        <h4 className="mt-3 font-bold">Unique Aspects:</h4>
                        <ul className="list-disc pl-5">
                            {recipe.aspects.length ? recipe.aspects.map((item, i) => <li key={i}>{item}</li>) : <li>✅ No unique aspects mentioned, but it will still taste great!</li>}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
