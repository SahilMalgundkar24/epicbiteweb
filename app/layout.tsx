import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { NavigationProvider } from "@/components/NavigationProvider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Epic Bite",
  description: "Homemade Recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-4397873588107078"
        ></meta>
      </head>
      <body
        className={`${poppins.className}  bg-[url('/images/HomepageBg.png')] bg-cover bg-no-repeat`}
      >
        <NavigationProvider>{children}</NavigationProvider>
        <Analytics />
      </body>
    </html>
  );
}
