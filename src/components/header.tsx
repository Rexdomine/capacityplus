"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const howItWorksLinks = [
  { href: "/how-it-works", label: "How it works overview" },
  { href: "/for-gp-practices", label: "For GP practices" },
  { href: "/for-pharmacies", label: "For pharmacies" },
  { href: "/for-commissioners", label: "For commissioners" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const desktopSubmenuButtonRef = useRef<HTMLButtonElement>(null);
  const submenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (desktopSubmenuOpen) {
        setDesktopSubmenuOpen(false);
        desktopSubmenuButtonRef.current?.focus();
      } else if (mobileSubmenuOpen) {
        setMobileSubmenuOpen(false);
        submenuButtonRef.current?.focus();
      } else if (open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [desktopSubmenuOpen, mobileSubmenuOpen, open]);

  function closeMobileMenu() {
    setMobileSubmenuOpen(false);
    setOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="container nav-bar" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Capacity+ home">
          <Image
            src="/images/capacity-logo-web.png"
            width={196}
            height={100}
            priority
            alt="Capacity+"
          />
        </Link>
        <div className="desktop-nav">
          <Link href="/">Home</Link>
          <div className="nav-submenu">
            <button
              ref={desktopSubmenuButtonRef}
              type="button"
              className="submenu-button"
              aria-expanded={desktopSubmenuOpen}
              aria-controls="desktop-how-it-works-menu"
              onClick={() => setDesktopSubmenuOpen((current) => !current)}
            >
              How it works <ChevronDown aria-hidden="true" />
            </button>
            <div
              id="desktop-how-it-works-menu"
              className="submenu-panel desktop-submenu"
              hidden={!desktopSubmenuOpen}
            >
              {howItWorksLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDesktopSubmenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {primaryLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="button-primary compact" href="/contact">
            Book a call
          </Link>
        </div>
        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            setOpen((current) => !current);
            setMobileSubmenuOpen(false);
          }}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div id="mobile-menu" className="mobile-nav" hidden={!open}>
          <Link href="/" onClick={closeMobileMenu}>
            Home
          </Link>
          <button
            ref={submenuButtonRef}
            type="button"
            className="submenu-button mobile-submenu-button"
            aria-expanded={mobileSubmenuOpen}
            aria-controls="mobile-how-it-works-menu"
            onClick={() => setMobileSubmenuOpen((current) => !current)}
          >
            How it works <ChevronDown aria-hidden="true" />
          </button>
          <div
            id="mobile-how-it-works-menu"
            className="submenu-panel mobile-submenu"
            hidden={!mobileSubmenuOpen}
          >
            {howItWorksLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMobileMenu}>
                {link.label}
              </Link>
            ))}
          </div>
          {primaryLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMobileMenu}>
              {link.label}
            </Link>
          ))}
          <Link
            className="button-primary"
            href="/contact"
            onClick={closeMobileMenu}
          >
            Book a call
          </Link>
        </div>
      </nav>
    </header>
  );
}
