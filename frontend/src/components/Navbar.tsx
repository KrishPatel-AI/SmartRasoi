"use client";

import Link from "next/link";

import { ModeToggle } from "../components/ModeToggle";

import { Button } from "../components/ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-background border-b shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">Smart Rasoi</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Home
          </Link>

          <Link
            href="/finance"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Finance
          </Link>

          <Link
            href="/expenses"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Expenses
          </Link>

          <Link
            href="/investments"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Investments
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />

          <Button className="">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
