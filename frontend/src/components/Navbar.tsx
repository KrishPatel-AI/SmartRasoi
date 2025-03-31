"use client";

import Link from "next/link";

import { ModeToggle } from "../components/ModeToggle";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-background border-b shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">Smart Rasoi</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/inventory"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Inventory
          </Link>

          <Link
            href="/menu_optimization"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Menu Optimization
          </Link>

          <Link
            href="/ai_classifier"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            AI Classifier
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
