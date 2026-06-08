import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Sarabun, Noto_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-ibm",
});

const sarabun = Sarabun({
  weight: ['400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
});

const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Confide Portal",
  description: "Confide Portal - High-end editorial experience for enterprise operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSansThai.variable} ${sarabun.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sarabun bg-surface text-on-surface">{children}</body>
    </html>
  );
}
