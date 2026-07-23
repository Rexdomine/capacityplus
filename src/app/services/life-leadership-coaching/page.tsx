'use client';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Lottie from 'lottie-react';
import { ArrowRight, Heart, Lightbulb, Target, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CoachingPage() {
  const [animationData, setAnimationData] = useState(null);

  // Load JSON from CDN
  useEffect(() => {
    fetch(
      'https://lottie.host/0a798f17-8671-49c3-be7d-f766c06c1602/JoHTY1EpTC.json'
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
        <section className='bg-gradient-to-br from-secondary/10 to-transparent py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div data-aos='fade-up'>
                <h1 className='text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-balance'>
                  Life & Leadership Coaching
                </h1>
                <p className='text-xl text-muted-foreground mb-8 text-balance'>
                  Combat burnout, resolve decision fatigue, and build
                  sustainable leadership through personalized coaching.
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

        {/* Problem Statement */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-up'>
              Is This You?
            </h2>
            <div
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div
                className='bg-card border border-border rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='0'
              >
                <h3 className='font-bold mb-2'>Experiencing Burnout</h3>
                <p className='text-muted-foreground text-sm'>
                  Constant pressure, long hours, and emotional exhaustion are
                  wearing you down.
                </p>
              </div>
              <div
                className='bg-card border border-border rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <h3 className='font-bold mb-2'>Decision Fatigue</h3>
                <p className='text-muted-foreground text-sm'>
                  Making critical decisions daily leaves you drained and
                  questioning your direction.
                </p>
              </div>
              <div
                className='bg-card border border-border rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <h3 className='font-bold mb-2'>Unsustainable Performance</h3>
                <p className='text-muted-foreground text-sm'>
                  You're not sure how long you can maintain your current pace
                  and standards.
                </p>
              </div>
              <div
                className='bg-card border border-border rounded-lg p-6'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                <h3 className='font-bold mb-2'>Unclear Identity</h3>
                <p className='text-muted-foreground text-sm'>
                  Work defines you, and you've lost sight of who you are outside
                  of your role.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Coaching Matters */}
        <section className='py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-up'>
              Why Coaching Matters
            </h2>
            <div
              className='prose prose-sm max-w-none text-muted-foreground mb-12'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <p className='text-lg'>
                Healthcare leaders face unique challenges: moral injury,
                compassion fatigue, systemic pressures, and the weight of
                patient responsibility. Traditional approaches miss the mark
                because they don't address the core issue—your relationship with
                work, identity, and sustainable performance.
              </p>
              <p className='text-lg mt-4'>
                Coaching provides a structured space to work through these
                challenges with expert guidance. We help you clarify your
                values, reconnect with your purpose, and build systems that
                allow you to show up fully—for your patients and yourself.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div
                className='bg-card border border-secondary/20 rounded-lg p-8'
                data-aos='fade-right'
                data-aos-delay='0'
              >
                <h3 className='text-xl font-bold mb-4 flex items-center gap-3'>
                  <Users className='h-6 w-6 text-secondary' />
                  1-on-1 Coaching
                </h3>
                <ul className='space-y-3 text-sm'>
                  <li className='flex items-start gap-2'>
                    <span className='text-secondary font-bold'>•</span>
                    <span>
                      Personalized support tailored to your specific challenges
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-secondary font-bold'>•</span>
                    <span>
                      Deep work on identity, values, and sustainable performance
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-secondary font-bold'>•</span>
                    <span>
                      Regular check-ins to track progress and adjust approaches
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-secondary font-bold'>•</span>
                    <span>
                      Flexible scheduling to fit your demanding calendar
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className='bg-card border border-secondary/20 rounded-lg p-8'
                data-aos='fade-left'
                data-aos-delay='100'
              >
                <h3 className='text-xl font-bold mb-4 flex items-center gap-3'>
                  <Target className='h-6 w-6 text-secondary' />
                  Small-Group Coaching
                </h3>
                <ul className='space-y-3 text-sm'>
                  <li className='flex items-start gap-2'>
                    <span className='text-secondary font-bold'>•</span>
                    <span>
                      Cohort-based learning with peers facing similar challenges
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-secondary font-bold'>•</span>
                    <span>
                      Shared wisdom, accountability, and mutual support
                    </span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-secondary font-bold'>•</span>
                    <span>Cost-effective access to expert guidance</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-secondary font-bold'>•</span>
                    <span>
                      Community and connection with other healthcare leaders
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className='py-16 sm:py-24'>
          <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
            <div className='text-center space-y-8' data-aos='fade-up'>
              <div className='space-y-4'>
                <h2 className='text-3xl font-bold tracking-tight'>
                  Understanding Coaching for Healthcare Leaders
                </h2>
                <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                  Discover how coaching transforms burnout into resilience
                </p>
              </div>

              <div className='relative w-full aspect-video bg-card border border-border rounded-2xl overflow-hidden'>
                <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
                  <div className='text-center space-y-4'>
                    <div className='text-6xl'>🎬</div>
                    <p>Video embed goes here</p>
                    <p className='text-sm'>
                      Replace with YouTube, Vimeo, or self-hosted video
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-up'>
              Core Focus Areas
            </h2>
            <div
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div className='flex gap-4' data-aos='fade-up' data-aos-delay='0'>
                <Heart className='h-6 w-6 text-secondary flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-bold mb-2'>Burnout Recovery</h3>
                  <p className='text-muted-foreground text-sm'>
                    Understand the roots of your burnout and rebuild resilience
                    and joy in your work.
                  </p>
                </div>
              </div>
              <div
                className='flex gap-4'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <Lightbulb className='h-6 w-6 text-secondary flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-bold mb-2'>Decision Clarity</h3>
                  <p className='text-muted-foreground text-sm'>
                    Develop a decision-making framework grounded in your values
                    and priorities.
                  </p>
                </div>
              </div>
              <div
                className='flex gap-4'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <Target className='h-6 w-6 text-secondary flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-bold mb-2'>Identity & Purpose</h3>
                  <p className='text-muted-foreground text-sm'>
                    Reconnect with who you are beyond your professional role and
                    rediscover your purpose.
                  </p>
                </div>
              </div>
              <div
                className='flex gap-4'
                data-aos='fade-up'
                data-aos-delay='300'
              >
                <Users className='h-6 w-6 text-secondary flex-shrink-0 mt-1' />
                <div>
                  <h3 className='font-bold mb-2'>Sustainable Performance</h3>
                  <p className='text-muted-foreground text-sm'>
                    Build systems and habits that allow you to perform at your
                    best without sacrificing wellbeing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className='py-16 sm:py-24'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-bold mb-8' data-aos='fade-up'>
              What You'll Achieve
            </h2>
            <div
              className='bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/10 rounded-xl p-8 sm:p-12'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <span className='text-secondary font-bold text-lg'>✓</span>
                  <span className='text-lg'>
                    <strong>Clarity</strong> on your values, identity, and
                    sustainable career path
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-secondary font-bold text-lg'>✓</span>
                  <span className='text-lg'>
                    <strong>Resilience</strong> to navigate pressure and recover
                    from burnout
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-secondary font-bold text-lg'>✓</span>
                  <span className='text-lg'>
                    <strong>Confidence</strong> in your decisions and leadership
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-secondary font-bold text-lg'>✓</span>
                  <span className='text-lg'>
                    <strong>Better outcomes</strong> for your patients and teams
                    when you're healthier
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-secondary font-bold text-lg'>✓</span>
                  <span className='text-lg'>
                    <strong>Sustainable career</strong> that doesn't cost your
                    health and relationships
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className='py-16 sm:py-24 bg-muted/20'>
          <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:px-8'>
            <h2
              className='text-3xl font-bold mb-8 text-center'
              data-aos='fade-up'
            >
              Get Started
            </h2>
            <form
              className='bg-card border border-border rounded-xl p-8 space-y-6'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  placeholder='Your name'
                  className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>Email</label>
                <input
                  type='email'
                  placeholder='your@email.com'
                  className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Which service interests you?
                </label>
                <select className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'>
                  <option>1-on-1 Coaching</option>
                  <option>Small-Group Coaching</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Tell us about your biggest challenge right now
                </label>
                <textarea
                  placeholder='What brings you here?'
                  rows={4}
                  className='w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none'
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium'
              >
                Register Your Interest
              </button>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-16 sm:py-24 bg-secondary text-secondary-foreground'>
          <div
            className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center'
            data-aos='fade-up'
          >
            <h2 className='text-3xl font-bold mb-4'>Ready for Change?</h2>
            <p className='text-lg mb-8 opacity-90 max-w-2xl mx-auto'>
              Book a discovery call to explore how coaching can transform your
              leadership and wellbeing.
            </p>
            <Link
              href='/contact'
              className='px-8 py-3 bg-secondary-foreground text-secondary rounded-lg hover:opacity-90 transition-opacity font-medium inline-flex items-center justify-center gap-2'
            >
              Book a Call <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
