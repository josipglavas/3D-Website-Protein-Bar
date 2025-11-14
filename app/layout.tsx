import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import "./globals.css";
import Navbar from "./navbar";
import ViewCanvas from "./components/ViewCanvas";

gsap.registerPlugin(ScrollTrigger, SplitText);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bombus Protein Bars",
  description: "Healthy and delicious protein bars for an active lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
          <Navbar />
          <main>{children}</main>
          <ViewCanvas />
          {/* <Footer /> */}
        </>
      </body>
    </html>
  );
}
