"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

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

export default function AISuggestionsTab() {
  return (
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
  );
}
