"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CurrentMenuTab from "../../components/CurrentMenu";
import DishGeneratorTab from "../../components/RecipeGenerator";

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
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList>
          <TabsTrigger value="current">Current Menu</TabsTrigger>
          <TabsTrigger value="generator">Dish Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4 mt-4">
          <CurrentMenuTab />
        </TabsContent>

        <TabsContent value="generator" className="mt-4 space-y-6">
          <DishGeneratorTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
