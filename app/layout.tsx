import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { SiteFrame } from "./components/site-frame";
import "./globals.css";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpha Tauro Transporting",
  description:
    "Home page responsive para Alpha Tauro Transporting, marca de autobuses y soluciones de transporte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${lexendDeca.variable} bg-carbon text-white antialiased`}>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
