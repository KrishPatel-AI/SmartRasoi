"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Clock,
  Filter,
  Plus,
  Search,
  Edit,
  Trash,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
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

function getStatusBadge(status: string) {
  switch (status) {
    case "low":
      return (
        <Badge variant="destructive" className="capitalize">
          Low Stock
        </Badge>
      );
    case "expiring":
      return (
        <Badge variant="secondary" className="capitalize">
          Expiring Soon
        </Badge>
      );
    case "optimal":
      return (
        <Badge variant="outline" className="capitalize">
          Optimal
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

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: string;
  amount: number;
  expiry_date: string | null;
  last_updated?: string;
}

const defaultItem = {
  name: "",
  category: "vegetables", // Set a default category
  quantity: 1,
  unit: "kg", // Set a default unit
  status: "optimal",
  amount: 0, // Add default amount
  expiry_date: "",
};

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [newItem, setNewItem] = useState(defaultItem);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Inventory Items from Supabase
  async function fetchInventory() {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching inventory:", error);
        setError(`Failed to fetch inventory: ${error.message}`);
      } else {
        setInventoryItems(data || []);
      }
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
      setError("An unexpected error occurred while fetching inventory");
    } finally {
      setIsLoading(false);
    }
  }

  // Add a New Item to Supabase
  async function addItem() {
    setError(null);
    try {
      // Validate required fields
      if (!newItem.name) {
        setError("Item name is required");
        return;
      }

      if (!newItem.category) {
        setError("Category is required");
        return;
      }

      // Prepare the item data
      const itemToAdd = {
        name: newItem.name,
        category: newItem.category,
        quantity: newItem.quantity,
        amount: newItem.amount || 0, // Ensure amount has a default value
        unit: newItem.unit || "unit",
        status: newItem.status,
        expiry_date: newItem.expiry_date ? newItem.expiry_date : null,
      };

      // Insert the item into Supabase
      const { error: insertError } = await supabase
        .from("inventory")
        .insert([itemToAdd]);

      if (insertError) {
        console.error("Error adding item:", insertError);
        setError(`Failed to add item: ${insertError.message}`);
      } else {
        await fetchInventory();
        setNewItem(defaultItem);
        setIsAddDialogOpen(false);
      }
    } catch (err: any) {
      console.error("Failed to add item:", err);
      setError(`An unexpected error occurred: ${err.message}`);
    }
  }

  // Update an Item in Supabase
  async function updateItem() {
    if (!editingItem) return;
    setError(null);

    try {
      // Validate required fields
      if (!editingItem.name) {
        setError("Item name is required");
        return;
      }

      if (!editingItem.category) {
        setError("Category is required");
        return;
      }

      // Prepare the item data
      const itemToUpdate = {
        name: editingItem.name,
        category: editingItem.category,
        quantity: editingItem.quantity,
        amount: editingItem.amount || 0, // Ensure amount has a default value
        unit: editingItem.unit || "unit",
        status: editingItem.status,
        expiry_date: editingItem.expiry_date ? editingItem.expiry_date : null,
      };

      // Update the item in Supabase
      const { error: updateError } = await supabase
        .from("inventory")
        .update(itemToUpdate)
        .eq("id", editingItem.id);

      if (updateError) {
        console.error("Error updating item:", updateError);
        setError(`Failed to update item: ${updateError.message}`);
      } else {
        await fetchInventory();
        setEditingItem(null);
        setIsEditDialogOpen(false);
      }
    } catch (err: any) {
      console.error("Failed to update item:", err);
      setError(`An unexpected error occurred: ${err.message}`);
    }
  }

  // Delete an Item from Supabase
  async function deleteItem() {
    if (!itemToDelete) return;
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from("inventory")
        .delete()
        .eq("id", itemToDelete);

      if (deleteError) {
        console.error("Error deleting item:", deleteError);
        setError(`Failed to delete item: ${deleteError.message}`);
      } else {
        await fetchInventory();
        setItemToDelete(null);
        setIsDeleteDialogOpen(false);
      }
    } catch (err: any) {
      console.error("Failed to delete item:", err);
      setError(`An unexpected error occurred: ${err.message}`);
    }
  }

  // Filter items based on search query and category
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Set up real-time subscription for inventory changes
  useEffect(() => {
    fetchInventory();

    // Set up real-time subscription
    const channel = supabase
      .channel("inventory-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inventory" },
        () => {
          fetchInventory();
        }
      )
      .subscribe();

    // Clean up the subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Open Edit Dialog with selected item data
  function handleEditClick(item: InventoryItem) {
    setEditingItem({
      ...item,
      // Convert the date format for the input field
      expiry_date: item.expiry_date
        ? new Date(item.expiry_date).toISOString().split("T")[0]
        : "",
    });
    setIsEditDialogOpen(true);
  }

  // Open Delete Dialog with selected item id
  function handleDeleteClick(id: number) {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Inventory Management
          </h2>
          <p className="text-muted-foreground">
            Track, manage, and optimize your kitchen inventory
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-9"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
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

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="low">Low Stock</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-full sm:w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle>Inventory Items</CardTitle>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <p>Loading inventory items...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="flex justify-center items-center p-8">
                  <p>No inventory items found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">
                        <Button variant="ghost" className="p-0 h-8">
                          <span>Name</span>
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>
                          {item.expiry_date
                            ? new Date(item.expiry_date).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {item.last_updated
                            ? new Date(item.last_updated).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex  gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditClick(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
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
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <p>Loading low stock items...</p>
                </div>
              ) : inventoryItems.filter((item) => item.status === "low")
                  .length === 0 ? (
                <div className="flex justify-center items-center p-8">
                  <p>No low stock items found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Recommended</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems
                      .filter((item) => item.status === "low")
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>{item.amount}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={(item.quantity / 10) * 100}
                                className="h-2 w-24"
                              />
                              <span className="text-sm text-muted-foreground">
                                10 {item.unit}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button size="sm">Reorder</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <p>Loading expiring items...</p>
                </div>
              ) : inventoryItems.filter((item) => item.status === "expiring")
                  .length === 0 ? (
                <div className="flex justify-center items-center p-8">
                  <p>No expiring items found.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems
                      .filter((item) => item.status === "expiring")
                      .map((item) => {
                        const expiryDate = item.expiry_date
                          ? new Date(item.expiry_date)
                          : null;
                        const today = new Date();
                        const daysLeft = expiryDate
                          ? Math.ceil(
                              (expiryDate.getTime() - today.getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          : null;

                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                              {item.quantity} {item.unit}
                            </TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>
                              {expiryDate
                                ? expiryDate.toLocaleDateString()
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-amber-500" />
                                <span className="text-sm text-amber-500 font-medium">
                                  {daysLeft !== null
                                    ? `${daysLeft} days`
                                    : "N/A"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                Recipe Ideas
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>
              Enter the details for the new inventory item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
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
                value={newItem.category}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, category: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruit">Fruits</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unit
              </Label>
              <Input
                id="unit"
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem({ ...newItem, unit: e.target.value })
                }
                className="col-span-3"
                placeholder="kg, g, l, ml, etc."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                min="0"
                value={newItem.amount}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    amount: parseInt(e.target.value) || 0,
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
                value={newItem.status}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, status: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="optimal">Optimal</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="expiring">Expiring Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry_date" className="text-right">
                Expiry Date
              </Label>
              <Input
                id="expiry_date"
                type="date"
                value={newItem.expiry_date}
                onChange={(e) =>
                  setNewItem({ ...newItem, expiry_date: e.target.value })
                }
                className="col-span-3"
              />
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
            <Button onClick={addItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) setError(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Update the details for this inventory item.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name *
                </Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
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
                  value={editingItem.category}
                  onValueChange={(value) =>
                    setEditingItem({ ...editingItem, category: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  min="0"
                  value={editingItem.quantity}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-unit" className="text-right">
                  Unit
                </Label>
                <Input
                  id="edit-unit"
                  value={editingItem.unit}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, unit: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="edit-amount"
                  type="number"
                  min="0"
                  value={editingItem.amount}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      amount: parseInt(e.target.value) || 0,
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
                  value={editingItem.status}
                  onValueChange={(value) =>
                    setEditingItem({ ...editingItem, status: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="optimal">Optimal</SelectItem>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-expiry_date" className="text-right">
                  Expiry Date
                </Label>
                <Input
                  id="edit-expiry_date"
                  type="date"
                  value={editingItem.expiry_date || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      expiry_date: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
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
            <Button onClick={updateItem}>Save Changes</Button>
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
            <DialogTitle>Delete Inventory Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setError(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteItem}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
