import type React from "react";
import { Button } from "@/components/ui/button";
import { Download, Apple } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform How You Connect?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already experiencing the future of
          digital interaction. Download Facesta today and start connecting
          through face recognition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:cursor-pointer hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            <Apple className="w-5 h-5 mr-2" />
            Download for iOS
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-1 border-white text-white hover:cursor-pointer hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold bg-transparent"
          >
            <Download className="w-5 h-5 mr-2" />
            Download for Android
          </Button>
        </div>
      </div>
    </section>
  );
}
