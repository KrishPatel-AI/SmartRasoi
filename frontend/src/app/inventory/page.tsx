// Inventory Page - Frontend (ShadCN UI, React, Lucide Icons)

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";

const InventoryPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex space-x-2">
          <Input placeholder="Search Inventory..." className="w-72" />
          <Button variant="outline">
            <Search className="w-5 h-5" />
          </Button>
          <Button className="flex items-center">
            <PlusCircle className="w-5 h-5 mr-2" /> Add Item
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Expiration Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Sample Data Row */}
          <TableRow>
            <TableCell>Tomatoes</TableCell>
            <TableCell>Vegetables</TableCell>
            <TableCell>10</TableCell>
            <TableCell>Kg</TableCell>
            <TableCell>2025-04-10</TableCell>
            <TableCell className="text-red-500">Near Expiry</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Chicken</TableCell>
            <TableCell>Meat</TableCell>
            <TableCell>5</TableCell>
            <TableCell>Kg</TableCell>
            <TableCell>2025-03-30</TableCell>
            <TableCell className="text-green-500">Fresh</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryPage;

/*
Planned Database Schema (PostgreSQL - NeonDB):

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit TEXT NOT NULL,
  expiration_date DATE,
  status TEXT CHECK (status IN ('Fresh', 'Near Expiry', 'Expired')),
  image_url TEXT,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

AI Model Integration (Future Backend Implementation):
- Computer Vision (YOLO, OpenCV, AWS Rekognition) to auto-detect ingredients.
- Time Series Forecasting (ARIMA, Prophet, LSTM) for demand prediction.
- NLP (OpenAI, Hugging Face) for AI-based menu recommendations.
- Image Segmentation (U-Net) for food waste classification.

*/
