import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowRight,
  ChefHat,
  DollarSign,
  Filter,
  Leaf,
  Plus,
  Sparkles,
  Utensils,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

// Sample menu optimization data
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
              <CardTitle>AI Dish Generator</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-2">
              {/* Left Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Generate New Dish
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        label: "Recipe Type",
                        options: [
                          "Starter",
                          "Main Course",
                          "Dessert",
                          "Beverage",
                        ],
                        default: "main",
                      },
                      {
                        label: "Cuisine Style",
                        options: [
                          "Italian",
                          "Asian",
                          "Mediterranean",
                          "American",
                          "Fusion",
                        ],
                        default: "mediterranean",
                      },
                      {
                        label: "Dietary Preferences",
                        options: [
                          "No Restrictions",
                          "Vegetarian",
                          "Vegan",
                          "Gluten-Free",
                          "Dairy-Free",
                        ],
                        default: "none",
                      },
                      {
                        label: "Use Expiring Ingredients",
                        options: [
                          "Yes, prioritize expiring items",
                          "No, use any ingredients",
                        ],
                        default: "yes",
                      },
                    ].map((item, index) => (
                      <div key={index}>
                        <Label className="text-sm">{item.label}</Label>
                        <Select defaultValue={item.default}>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Select ${item.label.toLowerCase()}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {item.options.map((option) => (
                              <SelectItem
                                key={option}
                                value={option.toLowerCase()}
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                    <Button className="w-full">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Dish
                    </Button>
                  </CardContent>
                </Card>

                {/* Expiring Ingredients */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Expiring Ingredients
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "Lettuce (5.2kg)", days: 2, color: "red" },
                      { name: "Tomatoes (3.8kg)", days: 3, color: "amber" },
                      { name: "Heavy Cream (2.5L)", days: 3, color: "amber" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <span>{item.name}</span>
                        <Badge
                          variant="outline"
                          className={`bg-${item.color}-500/10 text-${item.color}-500 border-${item.color}-500/20`}
                        >
                          {item.days} days left
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Right Panel - Recipe Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Generated Dish Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">
                        Mediterranean Vegetable Risotto
                      </h2>
                      <Badge>Dish Recipe</Badge>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Recipe preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                    {/* Ingredients and Metrics */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Ingredients</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {[
                            "2 cups Arborio rice",
                            "1 cup chopped lettuce",
                            "2 tomatoes, diced",
                            "1 onion, finely chopped",
                            "4 cups vegetable stock",
                            "1/2 cup white wine",
                            "2 tbsp olive oil",
                            "1/4 cup grated Parmesan",
                            "Salt and pepper to taste",
                          ].map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: "Profit Margin", value: 68 },
                          { label: "Predicted Popularity", value: 85 },
                          { label: "Sustainability Score", value: 92 },
                          { label: "Waste Reduction", value: 75 },
                        ].map((metric) => (
                          <div key={metric.label}>
                            <div className="flex items-center justify-between text-sm font-medium mb-1">
                              <span>{metric.label}</span>
                              <span>{metric.value}%</span>
                            </div>
                            <Progress value={metric.value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Preparation Steps */}
                    <div>
                      <h4 className="font-medium">Preparation</h4>
                      <p className="text-sm text-muted-foreground">
                        1. Heat olive oil in a pan over medium heat. Add onions
                        and cook until translucent.
                        <br />
                        2. Add rice and stir for 1-2 minutes until slightly
                        toasted.
                        <br />
                        3. Add white wine and stir until absorbed.
                        <br />
                        4. Gradually add vegetable stock, one ladle at a time,
                        stirring constantly.
                        <br />
                        5. When rice is almost cooked, add tomatoes and lettuce.
                        <br />
                        6. Remove from heat, stir in Parmesan, and season with
                        salt and pepper.
                        <br />
                        7. Serve immediately, garnished with additional Parmesan
                        if desired.
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
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
