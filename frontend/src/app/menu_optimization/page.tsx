"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChefHat, DollarSign, Filter, Leaf, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const suggestedDishes = [
  {
    id: 1,
    name: "Seasonal Vegetable Risotto",
    ingredients: ["Rice", "Vegetable Stock", "Lettuce", "Tomatoes", "Onions"],
    usesExpiringItems: true,
    profitMargin: 68,
    popularity: 85,
    sustainability: 92,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Citrus Herb Chicken",
    ingredients: ["Chicken Breast", "Lemon", "Herbs", "Olive Oil", "Garlic"],
    usesExpiringItems: false,
    profitMargin: 72,
    popularity: 90,
    sustainability: 75,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Creamy Tomato Pasta",
    ingredients: ["Pasta", "Tomatoes", "Heavy Cream", "Garlic", "Basil"],
    usesExpiringItems: true,
    profitMargin: 65,
    popularity: 78,
    sustainability: 80,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Garden Fresh Salad",
    ingredients: [
      "Lettuce",
      "Tomatoes",
      "Cucumber",
      "Bell Peppers",
      "Vinaigrette",
    ],
    usesExpiringItems: true,
    profitMargin: 75,
    popularity: 65,
    sustainability: 95,
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
];

const currentMenu = [
  {
    id: 1,
    name: "Grilled Salmon",
    category: "Main",
    cost: 8.5,
    price: 24.99,
    profitMargin: 66,
    popularity: 85,
    status: "optimal",
  },
  {
    id: 2,
    name: "Chicken Alfredo",
    category: "Main",
    cost: 6.2,
    price: 18.99,
    profitMargin: 67,
    popularity: 78,
    status: "underperforming",
  },
  {
    id: 3,
    name: "Caesar Salad",
    category: "Starter",
    cost: 3.5,
    price: 12.99,
    profitMargin: 73,
    popularity: 65,
    status: "optimal",
  },
  {
    id: 4,
    name: "Chocolate Mousse",
    category: "Dessert",
    cost: 2.8,
    price: 9.99,
    profitMargin: 72,
    popularity: 70,
    status: "optimal",
  },
  {
    id: 5,
    name: "Vegetable Stir Fry",
    category: "Main",
    cost: 5.4,
    price: 16.99,
    profitMargin: 68,
    popularity: 55,
    status: "underperforming",
  },
];

// Function to get status badge
function getStatusBadge(status) {
  switch (status) {
    case "optimal":
      return (
        <Badge
          variant="outline"
          className="bg-green-500/10 text-green-500 border-green-500/20"
        >
          Optimal
        </Badge>
      );
    case "underperforming":
      return (
        <Badge
          variant="outline"
          className="bg-amber-500/10 text-amber-500 border-amber-500/20"
        >
          Underperforming
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="capitalize">
          {status}
        </Badge>
      );
  }
}

export default function MenuOptimizationPage() {
  const [inventory, setInventory] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase.from("inventory").select("name");
      if (error) throw error;

      // Merge duplicate ingredients (case-insensitive)
      const uniqueIngredients = [
        ...new Set(data.map((item: any) => item.name.toLowerCase())),
      ];
      setInventory(uniqueIngredients);
    } catch (err: any) {
      setError("❌ Failed to fetch inventory.");
      console.error("Inventory Fetch Error:", err.message);
    }
  };

  const toggleIngredient = (ingredient: string) => {
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

  const parseRecipe = (recipeText: string) => {
    const extract = (regex: RegExp) =>
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Intelligent Menu Optimization
          </h2>
          <p className="text-muted-foreground">
            AI-driven recipe recommendations and menu analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            Add Recipe
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Menu Profitability
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500">
                ↑ 3.2% with suggested changes
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Suggested Recipes
            </CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 new</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-amber-500">3 use expiring ingredients</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Waste Reduction Potential
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2 kg</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500">$165 potential savings</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="current">Current Menu</TabsTrigger>
          <TabsTrigger value="generator">Dish Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-4 space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>AI-Recommended Recipes</CardTitle>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter recipes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Recipes</SelectItem>
                  <SelectItem value="expiring">Uses Expiring Items</SelectItem>
                  <SelectItem value="profit">Highest Profit</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {suggestedDishes.map((dish) => (
                  <Card key={dish.id} className="p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="h-24 w-24 rounded-md overflow-hidden">
                        <img
                          src={dish.imageUrl || "/placeholder.svg"}
                          alt={dish.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-between">
                          <h3 className="font-semibold text-lg">{dish.name}</h3>
                          {dish.usesExpiringItems && (
                            <Badge variant="secondary">Expiring Items</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Ingredients:</strong>{" "}
                          {dish.ingredients.join(", ")}
                        </p>
                        <div className="flex gap-3 mt-2">
                          <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Add to Menu
                          </Button>
                          <Button size="sm" variant="outline">
                            View Recipe
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          {[
                            "Profit Margin",
                            "Predicted Popularity",
                            "Sustainability Score",
                          ].map((label, index) => {
                            const value = [
                              dish.profitMargin,
                              dish.popularity,
                              dish.sustainability,
                            ][index];
                            return (
                              <div key={label}>
                                <div className="flex items-center justify-between mb-1 text-sm font-medium">
                                  <span>{label}</span>
                                  <span>{value}%</span>
                                </div>
                                <Progress
                                  value={value}
                                  className="h-2 rounded-full"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="current" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Current Menu Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Dish Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Profit Margin</TableHead>
                    <TableHead className="text-right">Popularity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMenu.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">
                        ${item.cost.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.profitMargin}%
                      </TableCell>
                      <TableCell className="text-right">
                        {item.popularity}%
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                <div className="flex items-start space-x-4">
                  <ChefHat className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">AI Menu Insights</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Two menu items are underperforming. Consider replacing
                      Chicken Alfredo and Vegetable Stir Fry with AI-suggested
                      alternatives to improve overall menu performance.
                    </p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm">View Suggestions</Button>
                      <Button size="sm" variant="outline">
                        Analyze Menu
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Recipe Generator</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-2">
              {/* Left Panel */}
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

              {/* Right Panel - Recipe Preview */}
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

                      {/* Ingredients */}
                      <div>
                        <h4 className="font-medium">Ingredients</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {recipe.ingredients.length ? (
                            recipe.ingredients.map(
                              (item: string, i: number) => (
                                <li key={i}>{item}</li>
                              )
                            )
                          ) : (
                            <li>⚠️ No ingredients provided.</li>
                          )}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div>
                        <h4 className="font-medium">Preparation</h4>
                        <p className="text-sm text-muted-foreground">
                          {recipe.instructions.length
                            ? recipe.instructions.map(
                                (step: string, i: number) => (
                                  <span key={i}>
                                    {i + 1}. {step} <br />
                                  </span>
                                )
                              )
                            : "⚠️ No instructions provided."}
                        </p>
                      </div>

                      {/* Action Buttons */}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
