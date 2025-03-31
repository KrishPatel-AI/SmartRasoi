"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ArrowUpDown,
  Plus,
  Search,
  Edit,
  Trash,
  Filter,
  ChefHat,
  Leaf,
  DollarSign,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { supabase } from "@/lib/supabase";

function getStatusBadge(status) {
  switch (status) {
    case "active":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 capitalize"
        >
          Active
        </Badge>
      );
    case "seasonal":
      return (
        <Badge variant="secondary" className="capitalize">
          Seasonal
        </Badge>
      );
    case "discontinued":
      return (
        <Badge variant="destructive" className="capitalize">
          Discontinued
        </Badge>
      );
    case "new":
      return (
        <Badge className="bg-blue-100 text-blue-800 capitalize">New</Badge>
      );
    default:
      return (
        <Badge variant="outline" className="capitalize">
          {status}
        </Badge>
      );
  }
}

function calculateProfitMargin(cost, price) {
  if (!cost || !price || cost <= 0 || price <= 0) return 0;
  return ((price - cost) / price) * 100;
}

function getCategoryIcon(category) {
  switch (category?.toLowerCase()) {
    case "main":
      return <ChefHat className="h-4 w-4 mr-1" />;
    case "appetizer":
      return <Leaf className="h-4 w-4 mr-1" />;
    case "dessert":
      return <ChefHat className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
}

// Define interface for menu item
const defaultMenuItem = {
  name: "",
  category: "main",
  cost: 0,
  price: 0,
  profit_margin: 0,
  status: "active",
};

export default function CurrentMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState(defaultMenuItem);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch Menu Items from Supabase
  async function fetchMenu() {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("menu")
        .select("*")
        .order(sortField, { ascending: sortDirection === "asc" });

      if (error) {
        console.error("Error fetching menu:", error);
        setError(`Failed to fetch menu: ${error.message}`);
      } else {
        setMenuItems(data || []);
      }
    } catch (err) {
      console.error("Failed to fetch menu:", err);
      setError("An unexpected error occurred while fetching menu");
    } finally {
      setIsLoading(false);
    }
  }

  // Add a New Item to Supabase
  async function addMenuItem() {
    setError(null);
    try {
      // Validate required fields
      if (!newMenuItem.name) {
        setError("Menu item name is required");
        return;
      }

      if (!newMenuItem.category) {
        setError("Category is required");
        return;
      }

      // Calculate profit margin
      const profitMargin = calculateProfitMargin(
        newMenuItem.cost,
        newMenuItem.price
      );

      // Prepare the item data
      const itemToAdd = {
        name: newMenuItem.name,
        category: newMenuItem.category,
        cost: newMenuItem.cost,
        price: newMenuItem.price,
        profit_margin: profitMargin,
        status: newMenuItem.status,
      };

      // Insert the item into Supabase
      const { error: insertError } = await supabase
        .from("menu")
        .insert([itemToAdd]);

      if (insertError) {
        console.error("Error adding menu item:", insertError);
        setError(`Failed to add menu item: ${insertError.message}`);
      } else {
        await fetchMenu();
        setNewMenuItem({ ...defaultMenuItem });
        setIsAddDialogOpen(false);
      }
    } catch (err) {
      console.error("Failed to add menu item:", err);
      setError(`An unexpected error occurred: ${err.message}`);
    }
  }

  // Update an Item in Supabase
  async function updateMenuItem() {
    if (!editingMenuItem) return;
    setError(null);

    try {
      // Validate required fields
      if (!editingMenuItem.name) {
        setError("Menu item name is required");
        return;
      }

      if (!editingMenuItem.category) {
        setError("Category is required");
        return;
      }

      // Calculate profit margin
      const profitMargin = calculateProfitMargin(
        editingMenuItem.cost,
        editingMenuItem.price
      );

      // Prepare the item data
      const itemToUpdate = {
        name: editingMenuItem.name,
        category: editingMenuItem.category,
        cost: editingMenuItem.cost,
        price: editingMenuItem.price,
        profit_margin: profitMargin,
        status: editingMenuItem.status,
      };

      // Update the item in Supabase
      const { error: updateError } = await supabase
        .from("menu")
        .update(itemToUpdate)
        .eq("id", editingMenuItem.id);

      if (updateError) {
        console.error("Error updating menu item:", updateError);
        setError(`Failed to update menu item: ${updateError.message}`);
      } else {
        await fetchMenu();
        setEditingMenuItem(null);
        setIsEditDialogOpen(false);
      }
    } catch (err) {
      console.error("Failed to update menu item:", err);
      setError(`An unexpected error occurred: ${err.message}`);
    }
  }

  // Delete an Item from Supabase
  async function deleteMenuItem() {
    if (!itemToDelete) return;
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from("menu")
        .delete()
        .eq("id", itemToDelete);

      if (deleteError) {
        console.error("Error deleting menu item:", deleteError);
        setError(`Failed to delete menu item: ${deleteError.message}`);
      } else {
        await fetchMenu();
        setItemToDelete(null);
        setIsDeleteDialogOpen(false);
      }
    } catch (err) {
      console.error("Failed to delete menu item:", err);
      setError(`An unexpected error occurred: ${err.message}`);
    }
  }

  // Toggle sort direction or change sort field
  function handleSort(field) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  // Filter items based on search query and category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Set up real-time subscription for menu changes
  useEffect(() => {
    fetchMenu();

    // Set up real-time subscription
    const channel = supabase
      .channel("menu-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu" },
        () => {
          fetchMenu();
        }
      )
      .subscribe();

    // Clean up the subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sortField, sortDirection]);

  // Open Edit Dialog with selected item data
  function handleEditClick(item) {
    setEditingMenuItem({
      ...item,
    });
    setIsEditDialogOpen(true);
  }

  // Open Delete Dialog with selected item id
  function handleDeleteClick(id) {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Current Menu</h2>
          <p className="text-muted-foreground">
            Manage your menu items and analyze profitability
          </p>
        </div>
        <Button
          size="sm"
          className="h-9"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Menu Items</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search menu..."
                  className="w-full sm:w-[200px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="main">Main Dishes</SelectItem>
                  <SelectItem value="appetizer">Appetizers</SelectItem>
                  <SelectItem value="dessert">Desserts</SelectItem>
                  <SelectItem value="beverage">Beverages</SelectItem>
                  <SelectItem value="side">Side Dishes</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <p>Loading menu items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex justify-center items-center p-8">
              <p>No menu items found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Button
                      variant="ghost"
                      className="p-0 h-8"
                      onClick={() => handleSort("name")}
                    >
                      <span>Name</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 h-8"
                      onClick={() => handleSort("category")}
                    >
                      <span>Category</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 h-8"
                      onClick={() => handleSort("cost")}
                    >
                      <span>Cost</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 h-8"
                      onClick={() => handleSort("price")}
                    >
                      <span>Price</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 h-8"
                      onClick={() => handleSort("profit_margin")}
                    >
                      <span>Profit Margin</span>
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">{item.name}</div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center ">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {item.cost.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center ">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {item.price.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          item.profit_margin >= 60
                            ? "text-green-600"
                            : item.profit_margin >= 40
                            ? "text-amber-600"
                            : "text-red-600"
                        }
                      >
                        {item.profit_margin.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditClick(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add Menu Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>
              Enter the details for the new menu item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                value={newMenuItem.name}
                onChange={(e) =>
                  setNewMenuItem({ ...newMenuItem, name: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category *
              </Label>
              <Select
                value={newMenuItem.category}
                onValueChange={(value) =>
                  setNewMenuItem({ ...newMenuItem, category: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Dishes</SelectItem>
                  <SelectItem value="appetizer">Appetizers</SelectItem>
                  <SelectItem value="dessert">Desserts</SelectItem>
                  <SelectItem value="beverage">Beverages</SelectItem>
                  <SelectItem value="side">Side Dishes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cost" className="text-right">
                Cost *
              </Label>
              <Input
                id="cost"
                type="number"
                min="0"
                step="0.01"
                value={newMenuItem.cost}
                onChange={(e) =>
                  setNewMenuItem({
                    ...newMenuItem,
                    cost: parseFloat(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price *
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={newMenuItem.price}
                onChange={(e) =>
                  setNewMenuItem({
                    ...newMenuItem,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={newMenuItem.status}
                onValueChange={(value) =>
                  setNewMenuItem({ ...newMenuItem, status: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Show calculated profit margin preview */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Profit Margin</Label>
              <div className="col-span-3">
                <span
                  className={`font-medium ${
                    calculateProfitMargin(
                      newMenuItem.cost,
                      newMenuItem.price
                    ) >= 60
                      ? "text-green-600"
                      : calculateProfitMargin(
                          newMenuItem.cost,
                          newMenuItem.price
                        ) >= 40
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {calculateProfitMargin(
                    newMenuItem.cost,
                    newMenuItem.price
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={addMenuItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Menu Item Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) setError(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Update the details for this menu item.
            </DialogDescription>
          </DialogHeader>
          {editingMenuItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name *
                </Label>
                <Input
                  id="edit-name"
                  value={editingMenuItem.name}
                  onChange={(e) =>
                    setEditingMenuItem({
                      ...editingMenuItem,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category *
                </Label>
                <Select
                  value={editingMenuItem.category}
                  onValueChange={(value) =>
                    setEditingMenuItem({ ...editingMenuItem, category: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Dishes</SelectItem>
                    <SelectItem value="appetizer">Appetizers</SelectItem>
                    <SelectItem value="dessert">Desserts</SelectItem>
                    <SelectItem value="beverage">Beverages</SelectItem>
                    <SelectItem value="side">Side Dishes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-cost" className="text-right">
                  Cost *
                </Label>
                <Input
                  id="edit-cost"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingMenuItem.cost}
                  onChange={(e) =>
                    setEditingMenuItem({
                      ...editingMenuItem,
                      cost: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price *
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingMenuItem.price}
                  onChange={(e) =>
                    setEditingMenuItem({
                      ...editingMenuItem,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editingMenuItem.status}
                  onValueChange={(value) =>
                    setEditingMenuItem({ ...editingMenuItem, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Show calculated profit margin preview */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Profit Margin</Label>
                <div className="col-span-3">
                  <span
                    className={`font-medium ${
                      calculateProfitMargin(
                        editingMenuItem.cost,
                        editingMenuItem.price
                      ) >= 60
                        ? "text-green-600"
                        : calculateProfitMargin(
                            editingMenuItem.cost,
                            editingMenuItem.price
                          ) >= 40
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {calculateProfitMargin(
                      editingMenuItem.cost,
                      editingMenuItem.price
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={updateMenuItem}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open);
          if (!open) setError(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this menu item? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setItemToDelete(null);
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteMenuItem}>
              Delete Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
