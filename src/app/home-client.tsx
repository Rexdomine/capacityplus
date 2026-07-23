'use client';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Lightbulb,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function HomeClient() {
  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <Header />

      <main className='flex-1'>
        {/* Hero Section - Premium Dark with Split Layout */}
        <section className='relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48'>
          <div className='relative mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              {/* Left Content */}
              <div className='space-y-8' data-aos='fade-up'>
                <div className='space-y-4'>
                  <div className='inline-block mb-4'>
                    <span className='px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium'>
                      Healthcare Intelligence Platform
                    </span>
                  </div>

                  <h1 className='text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight'>
                    <span className='bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent'>
                      We Increase Capacity
                    </span>{' '}
                    in Primary Care
                  </h1>
                </div>

                <p className='text-xl text-muted-foreground leading-relaxed text-balance max-w-lg'>
                  Eliminate clinician burnout, streamline workflows, and build
                  sustainable practice infrastructure with our integrated
                  solutions for GPs and pharmacies.
                </p>

                <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                  <Link
                    href='/contact'
                    className='px-8 py-4 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 group'
                  >
                    Schedule Call{' '}
                    <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                  </Link>
                  <Link
                    href='#solutions'
                    className='px-8 py-4 border border-border text-foreground rounded-xl hover:bg-card hover:border-primary/30 transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2'
                  >
                    View Solutions <ArrowRight className='h-4 w-4' />
                  </Link>
                </div>
              </div>

              {/* Right Side - Flow of Care Image */}
              <div
                className='relative hidden lg:flex items-center justify-center'
                data-aos='fade-left'
              >
                <Image
                  src='/images/flow-of-care.jpg'
                  alt='Flow of care showing GP consultation, patient direction to pharmacy, and pharmacy clinical appointment'
                  width={500}
                  height={500}
                  className='w-full h-auto rounded-xl shadow-lg'
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions Section */}
        <section className='py-20 lg:py-32 border-t border-border/50 bg-card/30'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* Transparent by Design */}
              <div className='space-y-4' data-aos='fade-up'>
                <h3 className='text-2xl font-bold text-primary'>
                  Transparent by Design
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  Every referral. Every outcome. Fully trackable.
                </p>
              </div>

              {/* Built for Capacity */}
              <div
                className='space-y-4'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <h3 className='text-2xl font-bold text-secondary'>
                  Built for Capacity
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  Increase clinical throughput without increasing burnout.
                </p>
              </div>

              {/* Aligned With Primary Care */}
              <div
                className='space-y-4'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <h3 className='text-2xl font-bold text-accent'>
                  Aligned With Primary Care
                </h3>
                <p className='text-muted-foreground leading-relaxed'>
                  Supports GP practices and pharmacies — not one at the expense
                  of the other.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section - Three Pillars */}
        <section
          id='solutions'
          className='py-20 lg:py-32 border-t border-border/50'
        >
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='text-center space-y-4 mb-16' data-aos='fade-up'>
              <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                Our Integrated Solutions
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Three complementary services designed to address the core
                challenges in modern healthcare delivery
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* Solution 1 */}
              <Link
                href='/services/digital-gp-pharmacy-integration'
                className='group'
                data-aos='fade-up'
                data-aos-delay='0'
              >
                <div className='relative h-full bg-card border border-border rounded-2xl p-8 hover:border-primary/50 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300'>
                  <div className='absolute -top-4 right-6 w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center'>
                    <Shield className='h-6 w-6 text-primary-foreground' />
                  </div>

                  <h3 className='text-2xl font-bold mb-3 mt-4 group-hover:text-primary transition-colors'>
                    Digital GP–Pharmacy Integration
                  </h3>
                  <p className='text-muted-foreground mb-6 leading-relaxed'>
                    Streamline referrals with secure, compliant workflows backed
                    by SLAs. Pharmacies gain access to GP systems; GPs unlock
                    capacity. Transparent, trackable, sustainable.
                  </p>

                  <ul className='space-y-3 mb-8'>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-primary flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>
                        Secure data sharing with SLA protection
                      </span>
                    </li>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-primary flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>
                        Automated referral processing
                      </span>
                    </li>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-primary flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>
                        Real-time tracking and reporting
                      </span>
                    </li>
                  </ul>

                  <div className='flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all'>
                    Explore <ArrowRight className='h-4 w-4' />
                  </div>
                </div>
              </Link>

              {/* Solution 2 */}
              <Link
                href='/services/life-leadership-coaching'
                className='group'
                data-aos='fade-up'
                data-aos-delay='100'
              >
                <div className='relative h-full bg-card border border-border rounded-2xl p-8 hover:border-secondary/50 hover:bg-card/80 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300'>
                  <div className='absolute -top-4 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center'>
                    <Lightbulb className='h-6 w-6 text-primary-foreground' />
                  </div>

                  <h3 className='text-2xl font-bold mb-3 mt-4 group-hover:text-secondary transition-colors'>
                    Life & Leadership Coaching
                  </h3>
                  <p className='text-muted-foreground mb-6 leading-relaxed'>
                    Combat burnout and build sustainable performance through
                    principle-based coaching. For healthcare leaders seeking
                    clarity, resilience, and transformation.
                  </p>

                  <ul className='space-y-3 mb-8'>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-secondary flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>
                        1-on-1 personalized coaching
                      </span>
                    </li>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-secondary flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>Group cohort programs</span>
                    </li>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-secondary flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>
                        Healthcare-specific strategies
                      </span>
                    </li>
                  </ul>

                  <div className='flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all'>
                    Explore <ArrowRight className='h-4 w-4' />
                  </div>
                </div>
              </Link>

              {/* Solution 3 */}
              <Link
                href='/services/social-media-visibility'
                className='group'
                data-aos='fade-up'
                data-aos-delay='200'
              >
                <div className='relative h-full bg-card border border-border rounded-2xl p-8 hover:border-accent/50 hover:bg-card/80 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300'>
                  <div className='absolute -top-4 right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center'>
                    <TrendingUp className='h-6 w-6 text-primary-foreground' />
                  </div>

                  <h3 className='text-2xl font-bold mb-3 mt-4 group-hover:text-accent transition-colors'>
                    AI-Powered Social Media Visibility
                  </h3>
                  <p className='text-muted-foreground mb-6 leading-relaxed'>
                    Deploy AI agents that create hyper-realistic, consistent
                    educational content across Facebook, Instagram, and
                    LinkedIn—at scale, without daily effort.
                  </p>

                  <ul className='space-y-3 mb-8'>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-accent flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>
                        AI agents mirror your voice and presence
                      </span>
                    </li>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-accent flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>
                        Educational content at scale
                      </span>
                    </li>
                    <li className='flex gap-3 items-start'>
                      <Check className='h-5 w-5 text-accent flex-shrink-0 mt-0.5' />
                      <span className='text-sm'>
                        Increased local visibility and patient trust
                      </span>
                    </li>
                  </ul>

                  <div className='flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all'>
                    Explore <ArrowRight className='h-4 w-4' />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Why GP Practices Choose Section */}
        <section className='overflow-x-hidden py-20 lg:py-32 bg-card/30 border-t border-border/50'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='space-y-12'>
              <div className='space-y-4'>
                <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                  Why GP Practices Choose Capacity+
                </h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='space-y-4' data-aos='fade-up'>
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-primary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Offload appropriate appointments to pharmacy
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Free up clinical capacity for complex care
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='space-y-4'
                  data-aos='fade-up'
                  data-aos-delay='50'
                >
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-primary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Increase appointment availability for complex care
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Prioritize high-acuity patients
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='space-y-4'
                  data-aos='fade-up'
                  data-aos-delay='100'
                >
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-primary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Faster patient turnaround for clinical pathways
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Streamlined referral and outcome tracking
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='space-y-4'
                  data-aos='fade-up'
                  data-aos-delay='150'
                >
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-primary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Extended patient access when GP is closed
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        24/7 pharmacy support
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='space-y-4'
                  data-aos='fade-up'
                  data-aos-delay='200'
                >
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-primary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Unlock collaborative workstreams with local pharmacies
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Build sustainable partnerships
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Pharmacies Choose Section */}
        <section className='overflow-x-hidden py-20 lg:py-32 border-t border-border/50'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='space-y-12'>
              <div className='space-y-4'>
                <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                  Why Pharmacies Choose Capacity+
                </h2>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='space-y-4' data-aos='fade-up'>
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-secondary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Increased referral volume
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        In some cases acting as a local referral hub
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='space-y-4'
                  data-aos='fade-up'
                  data-aos-delay='50'
                >
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-secondary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Structured, formalised GP relationships
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Professional governance framework
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='space-y-4'
                  data-aos='fade-up'
                  data-aos-delay='100'
                >
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-secondary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Clear governance via SLA + data-sharing framework
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Full compliance and transparency
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='space-y-4'
                  data-aos='fade-up'
                  data-aos-delay='150'
                >
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-secondary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Access to collaborative service development
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Co-create clinical pathways
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className='space-y-4'
                  data-aos='fade-up'
                  data-aos-delay='200'
                >
                  <div className='flex gap-3 items-start'>
                    <Check className='h-6 w-6 text-secondary flex-shrink-0 mt-0.5' />
                    <div>
                      <h3 className='font-semibold mb-1'>
                        Increased local visibility and patient trust
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Build community authority
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className='py-20 lg:py-32 border-t border-border/50'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='text-center space-y-4 mb-16' data-aos='fade-up'>
              <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                How Capacity+ Works
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                A simple, proven process to transform your practice
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
              {[
                {
                  step: 1,
                  title: 'Strategic Discovery',
                  desc: 'Workflow review & service alignment',
                },
                {
                  step: 2,
                  title: 'SLA Agreement',
                  desc: 'Governance & operational framework',
                },
                {
                  step: 3,
                  title: 'Partner Activation',
                  desc: 'GP–Pharmacy pathway setup',
                },
                {
                  step: 4,
                  title: 'Implementation',
                  desc: 'Deployment & team onboarding',
                },
                {
                  step: 5,
                  title: 'Support & Scale',
                  desc: 'Optimisation & capacity growth',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className='relative'
                  data-aos='fade-up'
                  data-aos-delay={`${(item.step - 1) * 100}`}
                >
                  <div className='bg-card border border-border rounded-xl p-6 h-full'>
                    <div className='flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary mb-4'>
                      <span className='text-lg font-bold text-primary-foreground'>
                        {item.step}
                      </span>
                    </div>
                    <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
                    <p className='text-muted-foreground text-sm'>{item.desc}</p>
                  </div>
                  {item.step < 5 && (
                    <div className='hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 translate-x-1/2'>
                      <ArrowRight className='h-5 w-5 text-primary/30' />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Video Section */}
        <section className='py-20 lg:py-32 border-t border-border/50'>
          <div className='mx-auto max-w-4xl px-6 lg:px-8'>
            <div className='text-center space-y-8' data-aos='fade-up'>
              <div className='space-y-4'>
                <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                  Founder Overview
                </h2>
                <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                  Understand our vision and mission for transforming primary
                  care
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

        {/* Key Features Section */}
        <section className='py-20 lg:py-32 border-t border-border/50'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='text-center space-y-4 mb-16' data-aos='fade-up'>
              <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                Powerful Features Built for Healthcare
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Everything you need to succeed
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  desc: 'NHS-compliant, GDPR-ready, data protection guaranteed',
                },
                {
                  icon: TrendingUp,
                  title: 'Real-Time Analytics',
                  desc: 'Track progress with comprehensive dashboards and insights',
                },
                {
                  icon: Users,
                  title: 'Team Collaboration',
                  desc: 'Built-in tools for seamless team communication',
                },
                {
                  icon: Award,
                  title: 'Expert Support',
                  desc: 'Dedicated support from healthcare professionals',
                },
                {
                  icon: Lightbulb,
                  title: 'Custom Solutions',
                  desc: 'Tailored approaches for your unique needs',
                },
                {
                  icon: Check,
                  title: 'Proven Results',
                  desc: 'Measurable outcomes backed by real data',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className='bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300'
                  data-aos='fade-up'
                  data-aos-delay={`${i * 100}`}
                >
                  <div className='w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4'>
                    <feature.icon className='h-6 w-6' />
                  </div>
                  <h3 className='text-lg font-semibold mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-muted-foreground text-sm'>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='py-20 lg:py-32 bg-card/30 border-t border-border/50'>
          <div className='mx-auto max-w-4xl px-6 lg:px-8'>
            <div className='text-center space-y-4 mb-16' data-aos='fade-up'>
              <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                Frequently Asked Questions
              </h2>
              <p className='text-xl text-muted-foreground'>
                Everything you need to know about Capacity+
              </p>
            </div>

            <div className='space-y-4'>
              {[
                {
                  q: 'How do we integrate with existing systems?',
                  a: 'Capacity+ supplies pharmacies with secure laptops that allow remote access into EMIS or SystmOne, provided access is granted by the GP practice. The model functions similarly to a remote pharmacist clinic — a widely adopted structure within primary care. This ensures referrals remain within NHS systems and governance frameworks while increasing local clinical capacity.',
                },
                {
                  q: 'How long does implementation take?',
                  a: 'Most practices are fully onboarded within 2-4 weeks. We provide dedicated support every step of the way to ensure a smooth transition.',
                },
                {
                  q: 'Is our data secure with Capacity+?',
                  a: 'Yes. We maintain enterprise-grade security with full NHS compliance, GDPR certification, and regular security audits. Your data is always encrypted and protected.',
                },
                {
                  q: 'Can we customize the solutions for our practice?',
                  a: 'Absolutely. Every solution is tailored to your specific needs, workflows, and goals. Our team works closely with you to ensure perfect fit.',
                },
                {
                  q: 'What kind of support do you provide?',
                  a: 'We offer 24/5 dedicated support, regular check-ins, training sessions, and continuous optimization based on your feedback and metrics.',
                },
                {
                  q: "What's the pricing structure?",
                  a: 'Pricing is based on your practice size and chosen services. We offer flexible monthly or annual plans with no long-term contracts. Contact us for a personalized quote.',
                },
              ].map((faq, i) => (
                <div key={i} data-aos='fade-up' data-aos-delay={`${i * 100}`}>
                  <FAQItem question={faq.q} answer={faq.a} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className='py-20 lg:py-32 border-t border-border/50'>
          <div
            className='mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-8'
            data-aos='fade-up'
          >
            <div className='space-y-4'>
              <h2 className='text-4xl lg:text-5xl font-bold tracking-tight'>
                Ready to Transform Your Practice?
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Join hundreds of healthcare leaders who are reducing burnout,
                improving outcomes, and building sustainable practices with
                Capacity+.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
              <Link
                href='/contact'
                className='px-8 py-4 bg-linear-to-r from-primary/80 to-secondary/90 text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2 group'
              >
                Schedule a Call{' '}
                <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </Link>
              <Link
                href='/contact'
                className='px-8 py-4 border border-border text-foreground rounded-xl hover:bg-card transition-all duration-300 font-semibold'
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors'
      >
        <h3 className='text-lg font-semibold text-left'>{question}</h3>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className='px-6 pb-4'>
          <p className='text-muted-foreground leading-relaxed'>{answer}</p>
        </div>
      )}
    </div>
  );
}
