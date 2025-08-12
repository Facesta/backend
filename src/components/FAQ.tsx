"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Shield,
  Smartphone,
  Users,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Smartphone className="w-5 h-5" />,
      color: "from-blue-500 to-purple-500",
      questions: [
        {
          question: "How do I create a Facesta account?",
          answer:
            "Download the Facesta app from the App Store or Google Play, then follow the onboarding process. You'll need to scan your face to create a secure biometric profile and verify your identity with a government-issued ID.",
        },
        {
          question: "What devices are compatible with Facesta?",
          answer:
            "Facesta works on iOS 14+ and Android 8+ devices with front-facing cameras. For optimal performance, we recommend devices released within the last 3 years with good camera quality.",
        },
        {
          question: "Is Facesta free to use?",
          answer:
            "Yes, Facesta is free to download and use for basic features like profile sharing and social connections. Premium features like advanced privacy controls and business integrations require a subscription.",
        },
        {
          question: "How accurate is the face recognition?",
          answer:
            "Our face recognition technology has a 99.7% accuracy rate under normal lighting conditions. The system continuously learns and improves with each scan to provide better recognition over time.",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="w-5 h-5" />,
      color: "from-purple-500 to-blue-500",
      questions: [
        {
          question: "How is my biometric data protected?",
          answer:
            "Your facial biometric data is encrypted using AES-256 encryption and stored securely on our servers. We use advanced security measures including multi-factor authentication and regular security audits to protect your information.",
        },
        {
          question:
            "Can I control what information is shared when someone scans my face?",
          answer:
            "You have complete control over your privacy settings. You can choose what information to share (social profiles, payment info, contact details) and set different sharing modes for different situations.",
        },
        {
          question:
            "What happens if someone tries to scan my face without permission?",
          answer:
            "All scans require your explicit approval. When someone attempts to scan your face, you'll receive a notification and can choose to approve or deny the request. You can also block specific users if needed.",
        },
        {
          question: "Can I delete my biometric data?",
          answer:
            "Yes, you can delete your account and all associated biometric data at any time through the app settings. Once deleted, your data is permanently removed from our servers within 30 days.",
        },
      ],
    },
    {
      title: "Payments & Transactions",
      icon: <CreditCard className="w-5 h-5" />,
      color: "from-blue-500 to-purple-500",
      questions: [
        {
          question: "How do face-to-face payments work?",
          answer:
            "Simply scan someone's face to initiate a payment. They'll receive a notification to approve the transaction, enter the amount, and confirm. The payment is processed securely through your linked bank account or card.",
        },
        {
          question: "What payment methods are supported?",
          answer:
            "We support major credit cards, debit cards, bank transfers, and popular digital wallets like Apple Pay and Google Pay. You can link multiple payment methods and choose your preferred one for each transaction.",
        },
        {
          question: "Are there any transaction fees?",
          answer:
            "Standard peer-to-peer payments are free. Business transactions and international transfers may have small fees, which are clearly displayed before you confirm any transaction.",
        },
        {
          question: "How long do payments take to process?",
          answer:
            "Most payments are instant between Facesta users. Bank transfers may take 1-3 business days depending on your bank. You'll receive notifications when payments are sent, received, and processed.",
        },
      ],
    },
    {
      title: "Social Features",
      icon: <Users className="w-5 h-5" />,
      color: "from-purple-500 to-blue-500",
      questions: [
        {
          question: "What social profiles can I share?",
          answer:
            "You can link and share profiles from Instagram, Twitter, LinkedIn, TikTok, Snapchat, and many other platforms. You can also share custom links, your website, or business information.",
        },
        {
          question: "Can I share different information with different people?",
          answer:
            "Yes! You can create multiple sharing modes (Professional, Personal, Social, etc.) and choose which mode to use when someone scans your face. Each mode can have different information and social profiles.",
        },
        {
          question: "How do I connect with someone I've scanned?",
          answer:
            "After a successful scan, you'll both receive each other's shared information. You can then follow their social profiles, save their contact information, or send them a connection request within the app.",
        },
        {
          question: "Can I see who has scanned my face?",
          answer:
            "Yes, you can view a history of all scan requests in your activity log, including approved and denied scans. You can also see analytics about your profile views and connections.",
        },
      ],
    },
  ];

  return (
    <section id="faq">
      {/* Header Section */}
      <div className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Questions
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Facesta's face recognition
              technology, privacy features, and how to get the most out of the
              app.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center mb-8">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mr-4`}
                >
                  <div className="text-white">{category.icon}</div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const globalIndex = categoryIndex * 100 + index;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <Card
                      key={index}
                      className="border-2 border-gray-100 hover:border-blue-200 transition-colors p-0"
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors hover:cursor-pointer"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6">
                            <div className="border-t border-gray-100 pt-4">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here
            to help you with any questions about Facesta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="border-1 border-blue bg-white text-blue-600 hover:cursor-pointer hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <MessageCircle />
              Contact Support
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-1 border-blue text-gray-600 hover:cursor-pointer hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold bg-transparent"
            >
              Live Chat
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
