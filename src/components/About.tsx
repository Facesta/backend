import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Shield, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Facesta Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience seamless digital interactions with cutting-edge face
            recognition technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Onboard with Face Scan
              </h3>
              <p className="text-gray-600">
                Quick and secure registration using advanced facial recognition
                technology
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Scan & Share
              </h3>
              <p className="text-gray-600">
                Instantly share payments, social profiles, IDs, and custom links
                by scanning faces
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Approve & Control
              </h3>
              <p className="text-gray-600">
                Easily approve or reject scan requests with complete control
                over your privacy
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multiple Modes
              </h3>
              <p className="text-gray-600">
                Customize what information is visible and when with flexible
                scan modes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
