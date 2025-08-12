import type React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Panel({ activePanel, closePanel }: any) {
  return (
    <>
      {activePanel && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={closePanel}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          activePanel === "privacy" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
            <button
              onClick={closePanel}
              className="p-2 hover:bg-gray-100 hover:cursor-pointer rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4 text-gray-600">
            <p className="font-semibold text-gray-900">Your Privacy Matters</p>
            <p>
              At Facesta, we take your privacy seriously. We use advanced
              encryption and secure storage to protect your biometric data and
              personal information.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">
              Data Collection
            </h3>
            <p>
              We collect only the necessary information to provide our face
              recognition services, including facial biometric templates and
              profile information you choose to share.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">Data Usage</h3>
            <p>
              Your data is used solely for identity verification and connection
              services. We never sell or share your personal information with
              third parties without your explicit consent.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">Security</h3>
            <p>
              All biometric data is encrypted using industry-standard AES-256
              encryption and stored securely on our servers with multi-factor
              authentication protection.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">Your Rights</h3>
            <p>
              You have the right to access, modify, or delete your data at any
              time through the app settings or by contacting our support team.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          activePanel === "terms" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Terms of Service
            </h2>
            <button
              onClick={closePanel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4 text-gray-600">
            <p className="font-semibold text-gray-900">Agreement to Terms</p>
            <p>
              By using Facesta, you agree to these terms of service. Please read
              them carefully before using our application.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">Acceptable Use</h3>
            <p>
              You agree to use Facesta only for legitimate purposes and in
              compliance with all applicable laws. Misuse of the face
              recognition technology is strictly prohibited.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">
              Account Responsibility
            </h3>
            <p>
              You are responsible for maintaining the security of your account
              and for all activities that occur under your account.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">
              Service Availability
            </h3>
            <p>
              While we strive for 99.9% uptime, we cannot guarantee
              uninterrupted service and reserve the right to perform maintenance
              as needed.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">
              Limitation of Liability
            </h3>
            <p>
              Facesta is provided "as is" and we disclaim all warranties. Our
              liability is limited to the maximum extent permitted by law.
            </p>
            <h3 className="font-semibold text-gray-900 mt-6">Termination</h3>
            <p>
              We reserve the right to terminate accounts that violate these
              terms or engage in fraudulent activity.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          activePanel === "support" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Support Center</h2>
            <button
              onClick={closePanel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm">
                Our support team is here to help you with any questions or
                issues you may have.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Contact Options</h3>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">
                  Email Support
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  Get help via email within 24 hours
                </p>
                <a
                  href="mailto:support@facesta.com"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  support@facesta.com
                </a>
              </div>

              {/* <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">Live Chat</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Available Monday-Friday, 9AM-6PM EST
                </p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Start Chat
                </Button>
              </div> */}

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">FAQ</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Find answers to common questions
                </p>
                <a
                  href="/#faq"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View FAQ →
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Common Issues</h3>
              <div className="space-y-2">
                <details className="border border-gray-200 rounded-lg">
                  <summary className="p-3 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                    Face recognition not working
                  </summary>
                  <div className="p-3 pt-0 text-gray-600 text-sm">
                    Ensure good lighting and hold your device at eye level.
                    Clean your camera lens and make sure the app has camera
                    permissions.
                  </div>
                </details>
                <details className="border border-gray-200 rounded-lg">
                  <summary className="p-3 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                    Payment issues
                  </summary>
                  <div className="p-3 pt-0 text-gray-600 text-sm">
                    Check your payment method is valid and has sufficient funds.
                    Contact your bank if the issue persists.
                  </div>
                </details>
                <details className="border border-gray-200 rounded-lg">
                  <summary className="p-3 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
                    Account security
                  </summary>
                  <div className="p-3 pt-0 text-gray-600 text-sm">
                    Enable two-factor authentication and use a strong password.
                    Never share your login credentials.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
