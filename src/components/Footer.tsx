import type React from "react";

export default function Footer({ openPanel }: any) {
  return (
    <footer className="pt-12 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end">
          <div className="mb-4 md:mb-0">
            <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Facesta
            </div>
            <p className="text-gray-400 mt-2">
              The future of digital connection
            </p>
          </div>
          <div className="flex space-x-6">
            <button
              onClick={() => openPanel("privacy")}
              className="text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => openPanel("terms")}
              className="text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
            >
              Terms
            </button>
            <button
              onClick={() => openPanel("support")}
              className="text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
            >
              Support
            </button>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-2 pt-3 text-center">
          <p className="text-gray-400">© 2025 Facesta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
