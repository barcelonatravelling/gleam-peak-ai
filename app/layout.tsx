
import Script from "next/script";
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
    default: "Gleam Peak AI | Infraestructura de confianza para una IA de impacto público",
    template: "%s | Gleam Peak AI",
  },
  description:
    "Desarrollamos infraestructura de IA responsable y ciberseguridad para que organizaciones y administraciones evalúen riesgos, gobiernen sus sistemas de IA y demuestren confianza digital con evidencias verificables.",
  keywords: [
    "IA responsable",
    "ciberseguridad con IA",
    "confianza digital",
    "gobernanza de agentes de IA",
    "Cyber Trust Passport",
    "conocimiento cero",
    "trusted AI",
    "AI governance",
    "zero-knowledge proofs",
    "Gleam Peak AI",
  ],
  authors: [{ name: "Gleam Peak AI" }],
  creator: "Gleam Peak AI",
  publisher: "Gleam Peak AI",
  openGraph: {
    title: "Gleam Peak AI | Trusted AI infrastructure for public impact",
    description:
      "Responsible AI and cybersecurity infrastructure that helps organisations assess risk, govern AI systems and demonstrate digital trust through verifiable evidence.",
    url: "https://gleampeak.ai",
    siteName: "Gleam Peak AI",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gleam Peak AI | Trusted AI infrastructure for public impact",
    description:
      "Responsible AI and cybersecurity infrastructure for verifiable digital trust.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2FYSNWDHS4"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2FYSNWDHS4');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}