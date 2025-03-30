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
import { AlertTriangle, ArrowUpDown, Camera, Clock, Filter, Package, Plus, RefreshCw, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Sample inventory data
const inventoryItems = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    quantity: 5.2,
    unit: "kg",
    status: "low",
    expiryDate: "2023-04-05",
    lastUpdated: "2023-04-01",
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Meat",
    quantity: 8.5,
    unit: "kg",
    status: "optimal",
    expiryDate: "2023-04-08",
    lastUpdated: "2023-04-01",
  },
  {
    id: 3,
    name: "Heavy Cream",
    category: "Dairy",
    quantity: 4,
    unit: "L",
    status: "expiring",
    expiryDate: "2023-04-03",
    lastUpdated: "2023-03-30",
  },
  {
    id: 4,
    name: "Lettuce",
    category: "Vegetables",
    quantity: 3.2,
    unit: "kg",
    status: "expiring",
    expiryDate: "2023-04-02",
    lastUpdated: "2023-03-31",
  },
  {
    id: 5,
    name: "Rice",
    category: "Grains",
    quantity: 25,
    unit: "kg",
    status: "optimal",
    expiryDate: "2023-07-15",
    lastUpdated: "2023-03-25",
  },
  {
    id: 6,
    name: "Olive Oil",
    category: "Oils",
    quantity: 8,
    unit: "L",
    status: "optimal",
    expiryDate: "2023-09-20",
    lastUpdated: "2023-03-15",
  },
  {
    id: 7,
    name: "Bell Peppers",
    category: "Vegetables",
    quantity: 2.1,
    unit: "kg",
    status: "low",
    expiryDate: "2023-04-06",
    lastUpdated: "2023-04-01",
  },
  {
    id: 8,
    name: "Salmon Fillets",
    category: "Seafood",
    quantity: 3.5,
    unit: "kg",
    status: "optimal",
    expiryDate: "2023-04-04",
    lastUpdated: "2023-04-01",
  },
];

// Function to get status badge
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

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground">
            Track, manage, and optimize your kitchen inventory
          </p>
        </div>
        <div className="flex items-center gap-2">
         
          <Button size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="low">Low Stock</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="visual">Visual Inventory</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-full sm:w-[200px] pl-8"
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
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="seafood">Seafood</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
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
                    <TableHead className="text-right">
                      <Button variant="ghost" className="p-0 h-8">
                        <span>Quantity</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 h-8">
                        <span>Expiry Date</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recommended</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems
                    .filter((item) => item.status === "low")
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                        <TableCell className="text-right">
                          <Button size="sm">Reorder</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems
                    .filter((item) => item.status === "expiring")
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity} {item.unit}
                        </TableCell>
                        <TableCell>{item.expiryDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-amber-500 font-medium">
                              2 days
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Recipe Ideas
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Visual Inventory Tracking</CardTitle>
                <Button>
                  <Camera className="mr-2 h-4 w-4" />
                  Scan Now
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted aspect-video relative flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=300&width=500"
                      alt="Camera feed"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" className="bg-background/80">
                        <Camera className="mr-2 h-4 w-4" />
                        Activate Camera
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Live Camera Feed</h3>
                    <p className="text-sm text-muted-foreground">
                      Point the camera at your inventory to automatically detect
                      and track items using computer vision.
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted">
                    <h3 className="font-semibold mb-2">
                      Last Scan Results (2 hours ago)
                    </h3>
                    <div className="space-y-4 mt-4">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">12 items detected</p>
                          <p className="text-sm text-muted-foreground">
                            3 new items added to inventory
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded bg-amber-500/10 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">2 items flagged</p>
                          <p className="text-sm text-muted-foreground">
                            Lettuce and tomatoes showing signs of spoilage
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-3">Detected Items</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {["Tomatoes", "Lettuce", "Onions", "Bell Peppers"].map(
                        (item, i) => (
                          <div
                            key={i}
                            className="border rounded p-2 flex items-center justify-between"
                          >
                            <span>{item}</span>
                            {i < 2 && (
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      View Full Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
