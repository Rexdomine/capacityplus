import { CapacityPlusLoader } from '@/components/loader';
import { ThemeProvider } from '@/components/theme-provider';
import AOSInitializer from '@/lib/aos-initializer';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Capacity+ | Healthcare Services',
    template: '%s | Capacity+',
  },
  description:
    'Transform primary care with digital integration, coaching, and visibility solutions. Empower healthcare professionals with innovative tools and strategies.',
  keywords: [
    'healthcare',
    'primary care',
    'digital integration',
    'pharmacy integration',
    'life leadership coaching',
    'social media visibility',
    'healthcare consulting',
    'medical practice optimization',
  ],
  authors: [{ name: 'Capacity+' }],
  creator: 'Capacity+',
  publisher: 'Capacity+',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.capacityx.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.capacityx.co.uk',
    title: 'Capacity+ | Healthcare Services',
    description:
      'Transform primary care with digital integration, coaching, and visibility solutions.',
    siteName: 'Capacity+',
    images: [
      {
        url: '/images/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'Capacity+ Healthcare Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capacity+ | Healthcare Services',
    description:
      'Transform primary care with digital integration, coaching, and visibility solutions.',
    images: ['/images/og-image.jpg'],
    creator: '@capacityplus', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // Replace with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <Suspense fallback={<CapacityPlusLoader />}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <AOSInitializer />
            {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
