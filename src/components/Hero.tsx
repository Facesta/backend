import type React from "react";
import { Button } from "@/components/ui/button";
import { Download, Apple } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect Through
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Face Recognition
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Share social profiles, make payments, and exchange IDs instantly
              with just a face scan. The future of digital connection is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg hover:cursor-pointer"
              >
                <Apple className="w-5 h-5 mr-2" />
                App Store
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg bg-transparent hover:cursor-pointer"
              >
                <Download className="w-5 h-5 mr-2" />
                Google Play
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/face-scanning-smartphone.png"
                alt="Facesta App Interface"
                className="mx-auto rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
