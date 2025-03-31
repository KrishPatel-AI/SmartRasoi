"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function DishGeneratorTab() {
  const [inventory, setInventory] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase.from("inventory").select("name");
      if (error) throw error;

      const uniqueIngredients = [
        ...new Set(data.map((item) => item.name.toLowerCase())),
      ];
      setInventory(uniqueIngredients);
    } catch (err) {
      setError("❌ Failed to fetch inventory.");
      console.error("Inventory Fetch Error:", err.message);
    }
  };

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const generateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      setError("⚠️ Please select ingredients!");
      return;
    }

    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const response = await fetch(
        "http://localhost:8080/api/generate-recipe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: selectedIngredients.join(", ") }),
        }
      );

      const data = await response.json();
      if (data.error) {
        setError("❌ Error: " + data.error);
        return;
      }

      setRecipe(parseRecipe(data.recipe));
    } catch (err) {
      setError("❌ Failed to fetch recipe!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const parseRecipe = (recipeText) => {
    const extract = (regex) =>
      (recipeText.match(regex) || [null, ""])[1].trim();

    return {
      title: extract(/\*\*Recipe Title:\*\*([\s\S]*?)\n/),
      ingredients:
        extract(/\*\*Ingredients:\*\*([\s\S]*?)\n\*\*/)?.split("\n") || [],
      instructions:
        extract(/\*\*Instructions:\*\*([\s\S]*?)\n\*\*/)?.split("\n") || [],
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recipe Generator</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-2">
       
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Select Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[200px] border rounded p-2">
                {inventory.length > 0 ? (
                  inventory.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 py-1"
                    >
                      <Checkbox
                        id={ingredient}
                        checked={selectedIngredients.includes(ingredient)}
                        onCheckedChange={() =>
                          toggleIngredient(ingredient)
                        }
                      />
                      <label
                        htmlFor={ingredient}
                        className="cursor-pointer"
                      >
                        {ingredient.charAt(0).toUpperCase() +
                          ingredient.slice(1)}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No ingredients available.
                  </p>
                )}
              </ScrollArea>

              <Textarea
                className="mt-2"
                placeholder="Selected ingredients will appear here..."
                value={selectedIngredients.join(", ")}
                readOnly
              />

              <Button
                className="w-full"
                onClick={generateRecipe}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Recipe"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Generated Recipe Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {recipe ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">
                    {recipe.title || "Recipe"}
                  </h2>
                </div>

                <div>
                  <h4 className="font-medium">Ingredients</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {recipe.ingredients.length ? (
                      recipe.ingredients.map(
                        (item, i) => (
                          <li key={i}>{item}</li>
                        )
                      )
                    ) : (
                      <li>⚠️ No ingredients provided.</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Preparation</h4>
                  <p className="text-sm text-muted-foreground">
                    {recipe.instructions.length
                      ? recipe.instructions.map(
                          (step, i) => (
                            <span key={i}>
                              {i + 1}. {step} <br />
                            </span>
                          )
                        )
                      : "⚠️ No instructions provided."}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Menu
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No recipe generated yet.
              </p>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}