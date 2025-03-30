async function generateRecipeTitle() {
    const ingredients = document.getElementById("ingredients").value.trim();

    if (!ingredients) {
        alert("⚠️ Please enter some ingredients!");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/generate_title", { // Updated endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients })
        });

        const data = await response.json();
        
        if (data.error) {
            alert("❌ Error: " + data.error);
            return;
        }

        displayRecipeTitle(data.title);

    } catch (error) {
        alert("❌ Failed to fetch recipe title!");
        console.error("Error:", error);
    }
}

function displayRecipeTitle(title) {
    const recipeSection = document.getElementById("recipe-output");
    recipeSection.classList.remove("hidden");

    document.getElementById("recipe-title").innerText = title || "Recipe Title Not Found";
}
