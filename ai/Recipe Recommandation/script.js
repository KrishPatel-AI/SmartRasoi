async function generateRecipe() {
    const ingredients = document.getElementById("ingredients").value.trim();

    if (!ingredients) {
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
            alert("❌ Error: " + data.error);
            return;
        }

        displayRecipe(data.recipe);

    } catch (error) {
        alert("❌ Failed to fetch recipe!");
        console.error("Error:", error);
    }
}

function displayRecipe(recipeText) {
    const recipeSection = document.getElementById("recipe-output");
    recipeSection.classList.remove("hidden");

    // Extract structured recipe parts using Regex
    const titleMatch = recipeText.match(/\*\*Recipe Title:\*\*([\s\S]*?)\n/);
    const ingredientsMatch = recipeText.match(/\*\*Ingredients:\*\*([\s\S]*?)\n\*\*/);
    const equipmentMatch = recipeText.match(/\*\*Equipment:\*\*([\s\S]*?)\n\*\*/);
    const instructionsMatch = recipeText.match(/\*\*Instructions:\*\*([\s\S]*?)\n\*\*/);
    const aspectsMatch = recipeText.match(/\*\*Unique Aspects:\*\*([\s\S]*)/);

    document.getElementById("recipe-title").innerText = titleMatch ? titleMatch[1].trim() : "🍽️ Recipe";

    document.getElementById("recipe-ingredients").innerHTML = ingredientsMatch
        ? formatList(ingredientsMatch[1].trim(), "📌")
        : "<li>⚠️ No ingredients provided.</li>";

    document.getElementById("recipe-equipment").innerHTML = equipmentMatch
        ? formatList(equipmentMatch[1].trim(), "🛠️")
        : "<li>✅ No special equipment needed.</li>";

    document.getElementById("recipe-instructions").innerHTML = instructionsMatch
        ? formatOrderedList(instructionsMatch[1].trim())
        : "<li>⚠️ No instructions provided.</li>";

    document.getElementById("recipe-aspects").innerHTML = aspectsMatch
        ? formatList(aspectsMatch[1].trim(), "✨")
        : "<li>✅ No unique aspects mentioned, but it will still taste great!</li>";
}

// 📝 Formats an unordered list and removes unwanted characters
function formatList(text, icon = "•") {
    return text.split("\n")
        .map(item => `<li>${icon} ${cleanText(item)}</li>`)
        .join("");
}

// 📝 Formats an ordered list while handling nested numbers properly
function formatOrderedList(text) {
    return text.split("\n")
        .map((item, index) => `<li><strong>Step ${index + 1}:</strong> ${cleanText(item)}</li>`)
        .join("");
}

// 🚀 Cleans up unwanted characters (*, -, extra numbers like "1. 1.")
function cleanText(text) {
    return text.replace(/^[\*\-\d]+[\.\s]*/, "").trim();
}
