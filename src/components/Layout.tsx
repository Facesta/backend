import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";
import { useState } from "react";
import Panel from "./Panel";

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
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const openPanel = (panel: string) => {
    setActivePanel(panel);
  };

  const closePanel = () => {
    setActivePanel(null);
  };
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
          <Footer openPanel={openPanel} />
          <Panel activePanel={activePanel} closePanel={closePanel} />
        </main>
      </body>
    </>
  );
}
