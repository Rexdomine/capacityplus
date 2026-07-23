import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Eliminate clinician burnout, streamline workflows, and build sustainable practice infrastructure with our integrated solutions for GPs and pharmacies.',
  keywords: [
    'primary care capacity',
    'GP pharmacy integration',
    'healthcare workflow optimization',
    'clinician burnout solutions',
    'practice infrastructure',
  ],
  openGraph: {
    title: 'Capacity+ | Transform Primary Care',
    description:
      'Eliminate clinician burnout, streamline workflows, and build sustainable practice infrastructure.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Capacity+ Healthcare Services',
      },
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}
