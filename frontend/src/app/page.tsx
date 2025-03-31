import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
     
      <section className="text-center w-full max-w-4xl my-8">
        <h2 className="text-3xl font-bold">
          AI-Powered Smart Kitchen with Menu Optimization and AI Classifier
        </h2>
        <p className="mt-2 text-gray-500">
          Automate inventory tracking, predict food spoilage classifier, and optimize menus to minimize waste and maximize efficiency.
        </p>
        <Button className="mt-4">Get Started</Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl my-8">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold"> Intelligent Menu Optimization</h3>
            <p className="text-sm text-gray-500 mt-1">
              Generate cost-effective recipes using surplus ingredients.
            </p>
            <Badge className="mt-2">Gemini API</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold"> Food Classification</h3>
            <p className="text-sm text-gray-500 mt-1">
              Detect fresh vs. spoiled food using AI image analysis.
            </p>
            <Badge className="mt-2">TensorFlow</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold"> Real-Time Inventory</h3>
            <p className="text-sm text-gray-500 mt-1">
              Identify spoiled or near-expiry ingredients automatically.
            </p>
            <Badge className="mt-2">Supabase</Badge>
          </CardContent>
        </Card>
      </section>

      {/* Solution Architecture */}
      <section className="text-center w-full max-w-4xl my-8">
        <h3 className="text-xl font-bold">Solution Architecture</h3>
        <p className="text-gray-500 mt-2">
          AI-driven classification, inventory tracking, and menu optimization for reducing waste.
        </p>
      </section>

      {/* Future Scope */}
      <section className="text-center w-full max-w-4xl my-8">
        <h3 className="text-xl font-bold">Future Scope</h3>
        <p className="text-gray-500 mt-2">
          Real-time sales prediction, waste heatmaps, and dynamic inventory tracking.
        </p>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-4xl py-4 text-center text-gray-500">
        Powered by <strong>SmartRasoi</strong> | AI-Powered Kitchen Tech
      </footer>
    </div>
  );
}
