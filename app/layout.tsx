import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingDonateButton from "@/components/FloatingDonateButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.srisaiswamysevafoundation.org"),
  title: {
    default: "Sri Sai Swamy Seva Foundation",
    template: "%s · Sri Sai Swamy Seva Foundation",
  },
  description:
    "Hope, dignity, and brighter futures — Sri Sai Swamy Seva Foundation serves communities across India through healthcare camps, food distribution, education support, disaster relief, and spiritual seva rooted in devotion.",
  keywords: [
    "Sri Sai Swamy Seva Foundation",
    "seva",
    "charity India",
    "Vidyādāna",
    "health camps",
    "disaster relief",
    "education support",
  ],
  openGraph: {
    title: "Sri Sai Swamy Seva Foundation",
    description:
      "Hope, dignity, and brighter futures. Healthcare, food, education and disaster relief for communities across India.",
    url: "https://www.srisaiswamysevafoundation.org",
    siteName: "Sri Sai Swamy Seva Foundation",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${workSans.variable} font-body`}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingDonateButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
