import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { AtmosphereProvider } from "@/components/ui/Atmosphere";
import { SiteNav } from "@/components/ui/SiteNav";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AtmosphereProvider>
          <SiteNav />
          <div className="site-main">{children}</div>
        </AtmosphereProvider>
      </body>
    </html>
  );
}
