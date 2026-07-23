'use client';

import { logo } from '@/assets';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center gap-2 group'
          data-aos='fade-right'
        >
          <Image
            src={logo}
            alt='Capacity Plus Logo'
            priority
            className='h-24 w-auto object-contain'
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden lg:flex items-center gap-1' data-aos='fade-down'>
          <NavLink href='/services/digital-gp-pharmacy-integration'>
            Digital Integration
          </NavLink>
          <NavLink href='/services/life-leadership-coaching'>Coaching</NavLink>
          <NavLink href='/services/social-media-visibility'>Visibility</NavLink>
          <NavLink href='/speaking'>Speaking</NavLink>
          <NavLink href='/about'>About</NavLink>
        </div>

        {/* CTA Buttons */}
        <div className='hidden lg:flex items-center gap-3' data-aos='fade-left'>
          <ThemeToggle />
          <Link
            href='/contact'
            className='px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 hover:text-primary'
          >
            Contact
          </Link>
          <Link
            href='/contact'
            className='px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300'
          >
            Book Call
          </Link>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className='lg:hidden flex items-center gap-2'>
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='p-2 hover:bg-muted rounded-lg transition-colors'
            aria-label='Toggle menu'
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='lg:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200'>
          <div className='mx-auto max-w-7xl px-6 py-6 space-y-2'>
            <MobileNavLink
              href='/services/digital-gp-pharmacy-integration'
              onClick={() => setIsOpen(false)}
            >
              Digital Integration
            </MobileNavLink>
            <MobileNavLink
              href='/services/life-leadership-coaching'
              onClick={() => setIsOpen(false)}
            >
              Coaching
            </MobileNavLink>
            <MobileNavLink
              href='/services/social-media-visibility'
              onClick={() => setIsOpen(false)}
            >
              Visibility
            </MobileNavLink>
            <MobileNavLink href='/speaking' onClick={() => setIsOpen(false)}>
              Speaking
            </MobileNavLink>
            <MobileNavLink href='/about' onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <div className='pt-4 border-t border-border flex gap-2'>
              <Link
                href='/contact'
                onClick={() => setIsOpen(false)}
                className='flex-1 px-4 py-2 text-sm font-medium text-center text-foreground border border-border rounded-lg hover:bg-muted transition-colors'
              >
                Contact
              </Link>
              <Link
                href='/contact'
                onClick={() => setIsOpen(false)}
                className='flex-1 px-4 py-2 text-sm font-medium text-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'
              >
                Book Call
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className='px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300'
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300'
    >
      {children}
    </Link>
  );
}
