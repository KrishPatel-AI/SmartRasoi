import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   Legend,
// } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  Download,
  Filter,
  Leaf,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for charts
const weeklyWasteData = [
  { name: "Mon", vegetables: 5.2, meat: 2.1, dairy: 1.5, other: 0.8 },
  { name: "Tue", vegetables: 4.8, meat: 1.8, dairy: 1.2, other: 0.6 },
  { name: "Wed", vegetables: 6.5, meat: 2.5, dairy: 1.8, other: 1.2 },
  { name: "Thu", vegetables: 5.9, meat: 2.2, dairy: 1.6, other: 0.9 },
  { name: "Fri", vegetables: 7.2, meat: 3.1, dairy: 2.0, other: 1.5 },
  { name: "Sat", vegetables: 8.5, meat: 3.8, dairy: 2.5, other: 1.8 },
  { name: "Sun", vegetables: 7.8, meat: 3.5, dairy: 2.2, other: 1.6 },
];

const monthlyTrendData = [
  { name: "Jan", amount: 120 },
  { name: "Feb", amount: 110 },
  { name: "Mar", amount: 95 },
  { name: "Apr", amount: 85 },
  { name: "May", amount: 80 },
  { name: "Jun", amount: 75 },
  { name: "Jul", amount: 70 },
  { name: "Aug", amount: 65 },
  { name: "Sep", amount: 60 },
  { name: "Oct", amount: 55 },
  { name: "Nov", amount: 50 },
  { name: "Dec", amount: 45 },
];

const forecastData = [
  { name: "Mon", actual: 12, predicted: 12 },
  { name: "Tue", actual: 10, predicted: 11 },
  { name: "Wed", actual: 15, predicted: 14 },
  { name: "Thu", actual: 13, predicted: 13 },
  { name: "Fri", actual: 18, predicted: 17 },
  { name: "Sat", actual: 20, predicted: 19 },
  { name: "Sun", actual: 18, predicted: 18 },
  { name: "Mon", actual: null, predicted: 16 },
  { name: "Tue", actual: null, predicted: 15 },
  { name: "Wed", actual: null, predicted: 14 },
  { name: "Thu", actual: null, predicted: 13 },
  { name: "Fri", actual: null, predicted: 15 },
  { name: "Sat", actual: null, predicted: 17 },
  { name: "Sun", actual: null, predicted: 16 },
];

// Sample waste prediction alerts
const wasteAlerts = [
  {
    id: 1,
    item: "Lettuce",
    quantity: "5.2 kg",
    expiryDate: "2023-04-02",
    daysLeft: 2,
    wasteRisk: "high",
    recommendation: "Use in today's specials or donate",
  },
  {
    id: 2,
    item: "Tomatoes",
    quantity: "3.8 kg",
    expiryDate: "2023-04-03",
    daysLeft: 3,
    wasteRisk: "medium",
    recommendation: "Use in sauce preparation",
  },
  {
    id: 3,
    item: "Heavy Cream",
    quantity: "2.5 L",
    expiryDate: "2023-04-03",
    daysLeft: 3,
    wasteRisk: "medium",
    recommendation: "Use in dessert specials",
  },
  {
    id: 4,
    item: "Chicken Breast",
    quantity: "2.1 kg",
    expiryDate: "2023-04-04",
    daysLeft: 4,
    wasteRisk: "low",
    recommendation: "Freeze or use in tomorrow's menu",
  },
];

// Function to get risk badge
function getRiskBadge(risk: string) {
  switch (risk) {
    case "high":
      return (
        <Badge variant="destructive" className="capitalize">
          High Risk
        </Badge>
      );
    case "medium":
      return (
        <Badge variant="secondary" className="capitalize">
          Medium Risk
        </Badge>
      );
    case "low":
      return (
        <Badge variant="outline" className="capitalize">
          Low Risk
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="capitalize">
          {risk}
        </Badge>
      );
  }
}

export default function WastePredictionPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            AI-Powered Waste Prediction
          </h2>
          <p className="text-muted-foreground">
            Forecast potential waste and take proactive measures
          </p>
        </div>
        <div className="flex items-center gap-2">
 
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Waste (This Week)
            </CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5 kg</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500">↓ 12% from last week</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Potential Cost Savings
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245.80</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500">
                If all recommendations followed
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items at Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 items</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-amber-500">4 high risk, 4 medium risk</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prediction Accuracy
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500">↑ 2.5% from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Weekly Waste Breakdown</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="current">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Week</SelectItem>
                      <SelectItem value="previous">Previous Week</SelectItem>
                      <SelectItem value="last30">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yearly Waste Trend</CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Waste Pattern Detected</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Vegetables consistently show higher waste on weekends.
                        Consider reducing weekend vegetable orders by 15%.
                      </p>
                      <Button size="sm" className="mt-3">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-amber-500/10">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Seasonal Adjustment Needed
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Historical data shows 20% less dairy consumption during
                        summer months. Adjust your ordering accordingly.
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">
                        Apply Recommendation
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-500/10">
                      <Leaf className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Waste Reduction Success</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your waste reduction efforts have improved by 12%
                        compared to last month. Keep up the good work!
                      </p>
                      <Button size="sm" variant="outline" className="mt-3">
                        Share Results
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>14-Day Waste Forecast</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-500/10">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Forecast Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        AI predicts a 15% decrease in waste over the next 14
                        days
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Highest Waste Day
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold">Saturday</p>
                        <p className="text-sm text-muted-foreground">
                          19kg predicted
                        </p>
                      </div>
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Lowest Waste Day
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold">Tuesday</p>
                        <p className="text-sm text-muted-foreground">
                          13kg predicted
                        </p>
                      </div>
                      <Leaf className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">
                      Model Confidence
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold">92.5%</p>
                        <p className="text-sm text-muted-foreground">
                          Based on historical data
                        </p>
                      </div>
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Waste Risk Alerts</CardTitle>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risks</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Waste Risk</TableHead>
                    <TableHead>Recommendation</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wasteAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">
                        {alert.item}
                      </TableCell>
                      <TableCell>{alert.quantity}</TableCell>
                      <TableCell>{alert.expiryDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{alert.daysLeft} days</span>
                        </div>
                      </TableCell>
                      <TableCell>{getRiskBadge(alert.wasteRisk)}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {alert.recommendation}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm">View Recipes</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">AI Recommendation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on the current inventory and expiry dates, consider
                      creating a Harvest Special menu for tomorrow featuring
                      lettuce, tomatoes, and cream-based dishes to minimize
                      potential waste.
                    </p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm">Generate Menu</Button>
                      <Button size="sm" variant="outline">
                        Dismiss
                      </Button>
                    </div>
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
