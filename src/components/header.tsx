"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-gp-practices", label: "For GP practices" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

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
          {links.map((link) => (
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
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div id="mobile-menu" className="mobile-nav" hidden={!open}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="button-primary"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Book a call
          </Link>
        </div>
      </nav>
    </header>
  );
}
