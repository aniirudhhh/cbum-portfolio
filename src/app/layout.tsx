import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { Loader } from "@/components/Loader";

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
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans text-foreground bg-background selection:bg-foreground selection:text-background">
        <Loader />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
