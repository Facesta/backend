import type React from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-8 py-1 lg:py-2 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="lg:me-4 font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          FACESTA
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#about"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </a>
          <a
            href="#features"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Features
          </a>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:cursor-pointer">
            Download
          </Button>
        </div>
      </div>
    </nav>
  );
}
