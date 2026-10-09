import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { CustomCursor } from "@/components/CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shivam Kumar | Product, Growth & Analytics",
  description: "Shivam Kumar’s portfolio: hands-on experience in entrepreneurship, digital marketing and operations, with a focus on product, growth and analytics.",
  openGraph: {
    title: "Shivam Kumar | Product, Growth & Analytics",
    description: "Explore my work in entrepreneurship, digital marketing and operations.",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/@fontsource-variable/google-sans-flex/index.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${montserrat.variable} antialiased font-sans text-foreground bg-background selection:bg-foreground selection:text-background`}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CustomCursor />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
