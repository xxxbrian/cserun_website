import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
        url: 'https://cserun.bojin.co/cserun-logo.png',
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
