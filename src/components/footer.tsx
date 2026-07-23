import { logo } from '@/assets';
import {
  ArrowRight,
  Instagram,
  Linkedin,
  Mail,
  Music,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className='overflow-x-hidden border-t border-border/50 bg-card/30 backdrop-blur-sm'>
      {/* Newsletter CTA */}
      <div className='border-b border-border/50'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8 py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            <div data-aos='fade-right'>
              <h3 className='text-2xl font-bold mb-2'>Stay Updated</h3>
              <p className='text-muted-foreground'>
                Get insights on healthcare innovation and practice
                transformation.
              </p>
            </div>
            <div
              className='flex flex-col gap-3 sm:flex-row sm:items-center'
              data-aos='fade-left'
            >
              <input
                type='email'
                placeholder='your@email.com'
                className='flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
              />
              <button className='px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className='mx-auto max-w-7xl px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-12 mb-12'>
          {/* Brand */}
          <div className='md:col-span-2 space-y-4' data-aos='fade-up'>
            <Link href='/' className='flex items-center gap-2 group'>
              <Image
                src={logo}
                alt='Capacity Plus Logo'
                priority
                className='h-24 w-auto object-contain'
              />
            </Link>
            <p className='text-muted-foreground leading-relaxed max-w-sm'>
              Empowering healthcare leaders to reduce burnout, streamline
              workflows, and build sustainable primary care practices.
            </p>
            <div className='flex gap-3 pt-4'>
              {/* LinkedIn */}
              <a
                href='https://www.linkedin.com/in/ojoseph-ebare?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300'
              >
                <Linkedin className='h-5 w-5' />
              </a>

              {/* X (Twitter) */}
              <a
                href='https://x.com/osenadiaje?s=21'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300'
              >
                <Twitter className='h-5 w-5' />
              </a>

              {/* Instagram */}
              <a
                href='https://www.instagram.com/itsaboutbecoming?igsh=MWhvODd2MjkzbWdzYQ%3D%3D&utm_source=qr'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300'
              >
                <Instagram className='h-5 w-5' />
              </a>

              {/* TikTok */}
              <a
                href='https://www.tiktok.com/@itsaboutbecoming?_r=1&_t=ZN-948ncNh4zUk'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300'
              >
                <Music className='h-5 w-5' />
              </a>

              {/* Email */}
              <a
                href='mailto:os@jemedicalassociates.com'
                className='p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300'
              >
                <Mail className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Services */}
          <div data-aos='fade-up' data-aos-delay='100'>
            <h4 className='font-semibold mb-6 text-foreground'>Services</h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/services/digital-gp-pharmacy-integration'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Digital Integration{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
              <li>
                <Link
                  href='/services/life-leadership-coaching'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Coaching{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
              <li>
                <Link
                  href='/services/social-media-visibility'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Visibility{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
              <li>
                <Link
                  href='/speaking'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Speaking{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div data-aos='fade-up' data-aos-delay='200'>
            <h4 className='font-semibold mb-6 text-foreground'>Company</h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  About{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Contact{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Blog{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div data-aos='fade-up' data-aos-delay='300'>
            <h4 className='font-semibold mb-6 text-foreground'>Legal</h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Privacy Policy{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Terms of Service{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group'
                >
                  Cookie Policy{' '}
                  <ArrowRight className='h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all' />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground'>
          <p>
            &copy; 2026 Capacity+. All rights reserved. Transforming primary
            care together.
          </p>
          <p>Made with care for healthcare professionals</p>
        </div>
      </div>
    </footer>
  );
}
