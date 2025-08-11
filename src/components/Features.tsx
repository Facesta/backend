import type React from "react";

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Future of Digital Connection
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Secure Face Recognition
                  </h3>
                  <p className="text-gray-600">
                    Advanced biometric technology ensures your identity is
                    protected while enabling seamless connections.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Instant Payments
                  </h3>
                  <p className="text-gray-600">
                    Send and receive money instantly by simply scanning
                    someone's face - no need for phone numbers or usernames.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Privacy First
                  </h3>
                  <p className="text-gray-600">
                    You control what information is shared and when, with
                    granular privacy settings for every interaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/facesta-app-screens.png"
              alt="Facesta Features"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
