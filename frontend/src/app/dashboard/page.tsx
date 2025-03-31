"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Image as ImageIcon, XCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme, setTheme } = useTheme();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(data);
    } catch (err) {
      setError("❌ Prediction failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground transition-colors duration-300">
      <Button
        className="absolute top-5 right-5"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">AI Freshness Checker 🍓</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          {preview && (
            <div className="relative w-48 h-48 mb-4">
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              <XCircle className="absolute -top-2 -right-2 text-red-500 cursor-pointer" onClick={resetAll} />
            </div>
          )}

          <div className="flex flex-col gap-2 items-center">
            <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <ImageIcon className="w-5 h-5" />
              <span>Upload Image</span>
              <Input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
            <Button onClick={handleSubmit} disabled={!file || loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Check Freshness"}
            </Button>
          </div>

          {result && (
            <div className="mt-4 text-center">
              <p className={`text-lg font-bold ${result.freshness === "Fresh" ? "text-green-500" : "text-red-500"}`}>
                {result.freshness === "Fresh" ? "✅ Fresh" : "❌ Rotten"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Prediction: {result.prediction}</p>
              <p className="text-gray-600 dark:text-gray-400">Confidence: {result.confidence}%</p>
            </div>
          )}

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}