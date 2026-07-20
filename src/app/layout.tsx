import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, BUSINESS } from "@/lib/site";
import StructuredData from "@/components/StructuredData";

// Google Ads conversion tracking (gtag.js) — loaded on every page.
const GOOGLE_ADS_ID = "AW-18298008775";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const TITLE =
  "Redro Cleaning | End of Lease, Move-In & Move-Out Cleaning in Sydney";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Redro Cleaning",
  },
  description: BUSINESS.description,
  applicationName: "Redro Cleaning",
  keywords: [
    "end of lease cleaning Sydney",
    "bond cleaning Sydney",
    "move out cleaning Sydney",
    "move in cleaning Sydney",
    "vacate cleaning",
    "carpet steam cleaning Sydney",
    "house cleaning Parramatta",
    "bond back guarantee cleaning",
  ],
  authors: [{ name: "Redro Cleaning" }],
  creator: "Redro Cleaning",
  publisher: "Redro Cleaning",
  category: "Cleaning Service",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: "Redro Cleaning",
    title: TITLE,
    description: BUSINESS.description,
    images: [
      {
        url: "/heroimage.png",
        alt: "Redro Cleaning — professional cleaning across Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: BUSINESS.description,
    images: ["/heroimage.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-white antialiased">
        {children}

        <StructuredData />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
