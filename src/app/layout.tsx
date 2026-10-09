import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { Loader } from "@/components/Loader";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivam Kumar | Product, Growth & Analytics",
  description: "Product & Growth Professional based in Bangalore.",
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
        <Loader />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
