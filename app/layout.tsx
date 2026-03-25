import type { Metadata } from "next";
import { Abril_Fatface, Poppins } from "next/font/google";
import "./globals.css";

const abrilFatface = Abril_Fatface({
  variable: "--font-abril",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bugün Ne Oldu?",
  description: "Güncel haberleri takip et",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${abrilFatface.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}