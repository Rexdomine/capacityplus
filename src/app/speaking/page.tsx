'use client';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Lottie from 'lottie-react';
import { Activity, ArrowRight, Compass, RefreshCw, Smile } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SpeakingPage() {
  const [animationData, setAnimationData] = useState(null);

  // Load JSON from CDN
  useEffect(() => {
    fetch(
      'https://lottie.host/58cfcf91-9554-4207-aafa-5351aec20ed1/JSKzHwB26k.json'

      // 'https://lottie.host/eb5c4a5e-4c19-4451-81cd-3e4194ae9a37/mtQFRBmudt.json'
    )
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load animation:', err));
  }, []);
  const topics = [
    {
      title: 'Principles Over Beliefs',
      description:
        'How aligning with universal principles — rather than personal opinions — creates predictable, scalable success in life and leadership.',
      icon: <Compass className='w-12 h-12 text-primary' />,
    },
    {
      title: 'Transformation Inside and Outside Work',
      description:
        'Why performance at work mirrors alignment in personal life — and how to build systems that support both.',
      icon: <RefreshCw className='w-12 h-12 text-secondary' />,
    },
    {
      title: 'Increasing Capacity in Primary Care',
      description:
        'A forward-thinking look at GP–pharmacy integration, workforce burnout, and how infrastructure — not willpower — solves systemic pressure.',
      icon: <Activity className='w-12 h-12 text-accent' />,
    },
    {
      title: 'The Pursuit of Happiness — Finding It Now',
      description:
        "Why happiness isn't a future destination, but a by-product of aligned daily actions.",
      icon: <Smile className='w-12 h-12 text-green-500' />,
    },
  ];

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <Header />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48'>
          <div className='relative mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div className='space-y-8' data-aos='fade-up'>
                <div className='space-y-4'>
                  <h1 className='text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight'>
                    Speaking Topics
                  </h1>
                  <p className='text-xl text-muted-foreground leading-relaxed text-balance max-w-2xl'>
                    Insights on leadership, transformation, and building
                    sustainable systems in healthcare and beyond.
                  </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                  <Link
                    href='/contact'
                    className='px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 group'
                  >
                    Book a Speaking Engagement{' '}
                    <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                  </Link>
                </div>
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

        {/* Speaking Topics Section */}
        <section className='py-20 lg:py-32 border-t border-border/50'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              {topics.map((topic, i) => (
                <div
                  key={i}
                  className='space-y-6 p-8 rounded-2xl border border-border hover:border-primary/50 hover:bg-card/50 transition-all duration-300'
                  data-aos='fade-up'
                  data-aos-delay={`${i * 100}`}
                >
                  <div className='text-5xl'>{topic.icon}</div>
                  <div className='space-y-3'>
                    <h2 className='text-2xl lg:text-3xl font-bold'>
                      {topic.title}
                    </h2>
                    <p className='text-lg text-muted-foreground leading-relaxed'>
                      {topic.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className='py-20 lg:py-32 bg-card/30 border-t border-border/50'>
          <div
            className='mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-8'
            data-aos='fade-up'
          >
            <div className='space-y-4'>
              <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                Interested in Having Us Speak at Your Event?
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                We're available for conferences, workshops, team retreats, and
                corporate events. Let's discuss how we can add value to your
                audience.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
              <Link
                href='/contact'
                className='px-8 py-4 bg-linear-to-r from-primary/80 to-secondary/90 text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 group'
              >
                Get in Touch{' '}
                <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </Link>
              <Link
                href='/'
                className='px-8 py-4 border border-border text-foreground rounded-xl hover:bg-card transition-all duration-300 font-semibold'
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
