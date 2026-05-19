
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gleampeak.ai"),
  title: {
    default: "Gleam Peak AI | Sistemas de IA empresarial y automatización inteligente",
    template: "%s | Gleam Peak AI",
  },
  description:
    "Diseñamos sistemas de IA empresarial que eliminan carga operativa, automatizan procesos y ayudan a las empresas a escalar sin añadir complejidad.",
  keywords: [
    "IA empresarial",
    "automatización inteligente",
    "sistemas de inteligencia artificial",
    "AI automation",
    "enterprise AI",
    "AI agents",
    "business automation",
    "Gleam Peak AI",
  ],
  authors: [{ name: "Gleam Peak AI" }],
  creator: "Gleam Peak AI",
  publisher: "Gleam Peak AI",
  openGraph: {
    title: "Gleam Peak AI | Enterprise AI Systems",
    description:
      "Enterprise-grade AI systems and intelligent automation designed to reduce operational load, accelerate execution and scale business capacity.",
    url: "https://gleampeak.ai",
    siteName: "Gleam Peak AI",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gleam Peak AI | Enterprise AI Systems",
    description:
      "Enterprise-grade AI systems and intelligent automation for modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}