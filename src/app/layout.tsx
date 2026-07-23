import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Capacity+ | Integrated primary care pathways",
    template: "%s | Capacity+",
  },
  description:
    "Capacity+ coordinates integrated GP–community-pharmacy working to increase primary-care capacity.",
  applicationName: "Capacity+",
  authors: [{ name: "Capacity+" }],
  creator: "Capacity+",
  publisher: "Capacity+",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Capacity+",
    title: "Capacity+ | Integrated primary care pathways",
    description:
      "Coordinating integrated GP–community-pharmacy working to increase primary-care capacity.",
  },
  twitter: {
    card: "summary",
    title: "Capacity+ | Integrated primary care pathways",
    description:
      "Coordinating integrated GP–community-pharmacy working to increase primary-care capacity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
