import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Load Inter as the sans-serif font (for regular text)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Load JetBrains Mono as the monospace font (for code)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CSERun - UNSW",
  description: "A utility tool designed to assist UNSW CSE students running course commands such as autotest and give in local environment.",
  keywords: "UNSW, CSE, CSERun, Rust, autotest, give, local, CSE Machine, COMP",
  openGraph: {
    title: 'CSERun - UNSW',
    description: 'A utility tool designed to assist UNSW CSE students running course commands such as autotest and give in local environment.',
    url: 'https://cserun.bojin.co',
    siteName: 'CSERun - UNSW',
    images: [
      {
        url: 'https://cserun.bojin.co/cserun-op.png',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}