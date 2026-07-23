'use client'
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

export default function DigitalGPPharmacyPage() {
  const [animationData, setAnimationData] = useState(null);

  // Load JSON from CDN
  useEffect(() => {
    fetch(
      'https://lottie.host/f3a3a309-8f00-4ea3-80cd-9be9f74b434f/ShFhI1WmIp.json'
    )
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load animation:', err));
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='bg-gradient-to-br from-primary/10 to-transparent py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div data-aos='fade-up'>
                <h1 className='text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-balance'>
                  Digital GP-Pharmacy Integration
                </h1>
                <p className='text-xl text-muted-foreground mb-8 text-balance'>
                  Streamline referrals, reduce admin burden, and ensure safe data
                  sharing with SLA-backed workflows.
                </p>
              </div>
              <div data-aos='fade-left' className='hidden lg:flex justify-center'>
                {/* Lottie Animation */}
                <div className='relative w-full h-full'>
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    className='w-full h-full object-contain'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-up'>
              The Challenge
            </h2>
            <div
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div className='bg-card border border-border rounded-lg p-6'>
                <h3 className='font-bold mb-2'>Manual Referral Processes</h3>
                <p className='text-muted-foreground text-sm'>
                  GPs and pharmacies rely on fragmented systems, faxes, and
                  phone calls, creating delays and errors.
                </p>
              </div>
              <div className='bg-card border border-border rounded-lg p-6'>
                <h3 className='font-bold mb-2'>Data Sharing Complexity</h3>
                <p className='text-muted-foreground text-sm'>
                  Navigating compliance requirements while ensuring secure
                  patient information exchange is overwhelming.
                </p>
              </div>
              <div className='bg-card border border-border rounded-lg p-6'>
                <h3 className='font-bold mb-2'>Admin Burden</h3>
                <p className='text-muted-foreground text-sm'>
                  Clinicians spend hours on administrative tasks instead of
                  patient care.
                </p>
              </div>
              <div className='bg-card border border-border rounded-lg p-6'>
                <h3 className='font-bold mb-2'>Inconsistent Outcomes</h3>
                <p className='text-muted-foreground text-sm'>
                  Without structured workflows, patient safety and care quality
                  suffer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
            <div className='text-center space-y-8' data-aos='fade-up'>
              <div className='space-y-4'>
                <h2 className='text-3xl font-bold tracking-tight'>
                  Understanding the Model
                </h2>
                <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                  Watch how digital integration transforms GP-pharmacy collaboration
                </p>
              </div>

              <div className='relative w-full aspect-video bg-card border border-border rounded-2xl overflow-hidden'>
                <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
                  <div className='text-center space-y-4'>
                    <div className='text-6xl'>🎬</div>
                    <p>Video embed goes here</p>
                    <p className='text-sm'>Replace with YouTube, Vimeo, or self-hosted video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Overview */}
        <section className='py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-up'>
              How It Works
            </h2>
            <p
              className='text-lg text-muted-foreground mb-12 max-w-3xl'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              Capacity+ supplies pharmacies with secure laptops that allow remote access into EMIS or SystmOne (with GP-granted access). This model functions similarly to a remote pharmacist clinic—a widely adopted structure within primary care. Referrals remain within NHS systems and governance frameworks while increasing local clinical capacity.
            </p>

            {/* Process Steps */}
            <div
              className='grid grid-cols-1 md:grid-cols-3 gap-8'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='relative' data-aos='fade-up' data-aos-delay='0'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold'>
                    1
                  </div>
                  <h3 className='text-xl font-bold'>Integration Setup</h3>
                </div>
                <p className='text-muted-foreground'>
                  We configure secure data sharing, define SLAs, and establish
                  clinic access protocols aligned with your workflows.
                </p>
              </div>

              <div className='relative' data-aos='fade-up' data-aos-delay='100'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold'>
                    2
                  </div>
                  <h3 className='text-xl font-bold'>Onboarding</h3>
                </div>
                <p className='text-muted-foreground'>
                  Compliance documentation, staff training, and full system
                  setup ensure seamless handoff to operations.
                </p>
              </div>

              <div className='relative' data-aos='fade-up' data-aos-delay='200'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold'>
                    3
                  </div>
                  <h3 className='text-xl font-bold'>Live Operations</h3>
                </div>
                <p className='text-muted-foreground'>
                  Secure referrals, restricted access controls, and automated
                  pharmacy workflows reduce admin time by up to 40%.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Referral Types */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-up'>
              Supported Referral Types
            </h2>
            <div
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div
                className='bg-card border border-primary/20 rounded-lg p-6 hover:shadow-lg transition-shadow'
                data-aos='fade-up'
                data-aos-delay='0'
              >
                <h3 className='font-bold mb-2 flex items-center gap-2'>
                  <CheckCircle className='h-5 w-5 text-primary' />
                  Hypertension Management
                </h3>
                <p className='text-muted-foreground text-sm'>
                  Direct GP-to-pharmacy referrals for blood pressure reviews and
                  ongoing monitoring.
                </p>
              </div>
              <div
                className='bg-card border border-secondary/20 rounded-lg p-6 hover:shadow-lg transition-shadow'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <h3 className='font-bold mb-2 flex items-center gap-2'>
                  <CheckCircle className='h-5 w-5 text-secondary' />
                  ABPM (Ambulatory BP Monitoring)
                </h3>
                <p className='text-muted-foreground text-sm'>
                  Coordinate complex monitoring cases with integrated clinical
                  oversight.
                </p>
              </div>
              <div
                className='bg-card border border-accent/20 rounded-lg p-6 hover:shadow-lg transition-shadow'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <h3 className='font-bold mb-2 flex items-center gap-2'>
                  <CheckCircle className='h-5 w-5 text-accent' />
                  Contraception Reviews
                </h3>
                <p className='text-muted-foreground text-sm'>
                  Efficient pharmacy-led reviews with secure clinical
                  communication and documentation.
                </p>
              </div>
              <div
                className='bg-card border border-primary/20 rounded-lg p-6 hover:shadow-lg transition-shadow'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                <h3 className='font-bold mb-2 flex items-center gap-2'>
                  <CheckCircle className='h-5 w-5 text-primary' />
                  Pharmacy First Referrals
                </h3>
                <p className='text-muted-foreground text-sm'>
                  Structured workflows for first-contact pharmacy assessments
                  with GP collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className='py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-up'>
              Key Benefits
            </h2>
            <div
              className='grid grid-cols-1 md:grid-cols-2 gap-8'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div className='flex gap-4' data-aos='fade-up' data-aos-delay='0'>
                <Shield className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-bold mb-2'>Compliant & Secure</h3>
                  <p className='text-muted-foreground'>
                    All data sharing meets healthcare regulations with audit
                    trails and access controls.
                  </p>
                </div>
              </div>
              <div
                className='flex gap-4'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <TrendingUp className='h-6 w-6 text-secondary flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-bold mb-2'>Faster Referrals</h3>
                  <p className='text-muted-foreground'>
                    Reduce referral-to-action time from days to hours with
                    automated workflows.
                  </p>
                </div>
              </div>
              <div
                className='flex gap-4'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <Users className='h-6 w-6 text-accent flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-bold mb-2'>Better Collaboration</h3>
                  <p className='text-muted-foreground'>
                    GP and pharmacy teams work seamlessly with clear
                    communication and accountability.
                  </p>
                </div>
              </div>
              <div
                className='flex gap-4'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                <TrendingUp className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-bold mb-2'>Predictable Revenue</h3>
                  <p className='text-muted-foreground'>
                    SLA-backed referral volumes create sustainable, predictable
                    income streams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 sm:py-24 bg-primary text-primary-foreground'>
          <div
            className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center'
            data-aos='fade-up'
          >
            <h2 className='text-3xl font-bold mb-4'>
              Ready to Streamline Your Referral Workflows?
            </h2>
            <p className='text-lg mb-8 opacity-90 max-w-2xl mx-auto'>
              Book a call to discuss how digital integration can transform your
              practice.
            </p>
            <Link
              href='/contact'
              className='px-8 py-3 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity font-medium inline-flex items-center justify-center gap-2'
            >
              Schedule a Discovery Call <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
