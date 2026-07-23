'use client';
import { owner } from '@/assets';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Lottie from 'lottie-react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function AboutPage() {
  const [animationData, setAnimationData] = useState(null);

  // Load JSON from CDN
  useEffect(() => {
    fetch(
      'https://lottie.host/87e2c9b7-164d-4527-9765-46540306e914/D83eJQNWtX.json'
    )
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load animation:', err));
  }, []);
  return (
    <div className='overflow-x-hidden flex flex-col min-h-screen'>
      <Header />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='bg-gradient-to-br from-primary/10 to-transparent py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div data-aos='fade-up'>
                <h1 className='text-4xl sm:text-5xl font-bold tracking-tight mb-4'>
                  About Capacity+
                </h1>
                <p className='text-xl text-muted-foreground max-w-2xl'>
                  We exist to transform primary care by reducing clinician
                  burden, improving patient outcomes, and building sustainable
                  healthcare systems.
                </p>
              </div>
              <div
                data-aos='fade-left'
                className='hidden lg:flex justify-center'
              >
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

        {/* Mission Section */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-6' data-aos='fade-right'>
              Our Mission
            </h2>
            <div
              className='bg-card border border-primary/10 rounded-xl p-8 mb-8'
              data-aos='fade-up'
            >
              <p className='text-lg text-muted-foreground leading-relaxed'>
                Healthcare professionals are drowning in administrative burden.
                Burnout is rampant. Clinicians are exhausted. Patients aren't
                getting the care they deserve. And the system feels
                unsustainable.
              </p>
              <p className='text-lg text-muted-foreground leading-relaxed mt-4'>
                We believe this doesn't have to be the way. With the right
                tools, coaching, and systems in place, healthcare teams can work
                more efficiently, enjoy their work again, and deliver better
                outcomes for patients.
              </p>
              <p className='text-lg text-muted-foreground leading-relaxed mt-4'>
                That's why Capacity+ exists. We partner with primary care
                practices and pharmacies to address the root causes of burden
                and build systems that work for clinicians and patients alike.
              </p>
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className='py-16 sm:py-24'>
          <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-right'>
              Why We Do This
            </h2>
            <div className='space-y-8'>
              <div
                className='border-l-4 border-primary pl-6'
                data-aos='fade-up'
                data-aos-delay='0'
              >
                <h3 className='text-xl font-bold mb-2'>
                  Burnout Is Unsustainable
                </h3>
                <p className='text-muted-foreground'>
                  Healthcare professionals sacrifice their health and
                  relationships for their work. It's not noble—it's broken.
                  We're here to change that.
                </p>
              </div>
              <div
                className='border-l-4 border-secondary pl-6'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <h3 className='text-xl font-bold mb-2'>
                  The System Needs Better Tools
                </h3>
                <p className='text-muted-foreground'>
                  GP-pharmacy integration, streamlined workflows, and digital
                  solutions can cut admin time dramatically. Many teams just
                  don't know where to start.
                </p>
              </div>
              <div
                className='border-l-4 border-accent pl-6'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <h3 className='text-xl font-bold mb-2'>
                  Coaching Changes Lives
                </h3>
                <p className='text-muted-foreground'>
                  Healthcare leaders need a space to work through burnout,
                  clarify their values, and rebuild sustainable performance.
                  Coaching provides that.
                </p>
              </div>
              <div
                className='border-l-4 border-primary pl-6'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                <h3 className='text-xl font-bold mb-2'>
                  Visibility Builds Trust
                </h3>
                <p className='text-muted-foreground'>
                  When pharmacies and practices are visible and credible in
                  their communities, they attract better patient relationships
                  and sustainable revenue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Founder */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-right'>
              Meet the Founder
            </h2>
            <div
              className='bg-card border border-border rounded-xl p-8'
              data-aos='fade-up'
            >
              <div className='flex gap-8 flex-col md:flex-row'>
                <div className='md:flex-shrink-0 md:w-48' data-aos='fade-right'>
                  <div className='h-48 w-48 rounded-lg overflow-hidden border border-border'>
                    <Image
                      src={owner}
                      alt='Founder of Capacity+'
                      width={192}
                      height={192}
                      className='object-cover w-full h-full'
                      priority
                    />
                  </div>
                </div>
                <div data-aos='fade-left'>
                  <h3 className='text-2xl font-bold mb-4'>
                    Your Healthcare Expert
                  </h3>
                  <p className='text-muted-foreground mb-4'>
                    With years of experience working at the frontlines of
                    primary care, I've seen firsthand the challenges GPs and
                    pharmacies face. The manual workflows. The admin burden. The
                    burnout.
                  </p>
                  <p className='text-muted-foreground mb-4'>
                    I've worked with dozens of practices to implement digital
                    solutions, coach healthcare leaders through burnout, and
                    help pharmacies build community credibility. The results
                    speak for themselves: reduced admin time, healthier
                    clinicians, and better patient outcomes.
                  </p>
                  <p className='text-muted-foreground'>
                    Capacity+ is my mission to scale these solutions and help
                    more practices and pharmacies transform their systems and
                    culture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className='py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-right'>
              Our Values
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div
                className='bg-card border border-primary/10 rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='0'
              >
                <h3 className='text-lg font-bold mb-2 text-primary'>
                  Clinician-Centric
                </h3>
                <p className='text-muted-foreground text-sm'>
                  Everything we do starts with understanding the real challenges
                  healthcare professionals face. We design solutions that work
                  for them, not against them.
                </p>
              </div>
              <div
                className='bg-card border border-secondary/10 rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <h3 className='text-lg font-bold mb-2 text-secondary'>
                  Evidence-Driven
                </h3>
                <p className='text-muted-foreground text-sm'>
                  We combine evidence-based practices with real-world healthcare
                  knowledge to create solutions that actually work.
                </p>
              </div>
              <div
                className='bg-card border border-accent/10 rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <h3 className='text-lg font-bold mb-2 text-accent'>
                  Honest & Grounded
                </h3>
                <p className='text-muted-foreground text-sm'>
                  No fluff, no hype. We're transparent about what's possible,
                  realistic about timelines, and grounded in the realities of
                  healthcare.
                </p>
              </div>
              <div
                className='bg-card border border-primary/10 rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                <h3 className='text-lg font-bold mb-2 text-primary'>
                  Long-Term Thinking
                </h3>
                <p className='text-muted-foreground text-sm'>
                  We don't just deliver quick wins. We build systems and habits
                  that create sustainable change for years to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 sm:py-24 bg-primary text-primary-foreground'>
          <div
            className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center'
            data-aos='fade-up'
          >
            <h2 className='text-3xl font-bold mb-4'>Let's Work Together</h2>
            <p className='text-lg mb-8 opacity-90'>
              Whether you're looking to streamline operations, rebuild clinician
              wellbeing, or build community visibility, we're here to help.
            </p>
            <Link
              href='/contact'
              className='px-8 py-3 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity font-medium inline-flex items-center justify-center gap-2'
            >
              Schedule a Call <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
