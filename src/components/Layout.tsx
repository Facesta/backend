import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Facesta - Connect Through Face Recognition",
  description:
    "Share social profiles, make payments, and exchange IDs instantly with face scanning technology. The future of digital connection.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>Facesta - It’s All About the Face</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        {/* <link rel="icon" href="/img/logo.png" /> */}
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </Head>
      <body>
        <main className="min-h-screen bg-white">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </>
  );
}
