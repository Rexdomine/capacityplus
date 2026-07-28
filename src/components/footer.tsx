import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" aria-label="Capacity+ home">
            <Image
              src="/images/capacity-logo-web.png"
              width={196}
              height={100}
              alt="Capacity+"
              className="footer-logo"
            />
          </Link>
          <p>
            Integrated primary care pathways, coordinated around local teams and
            patients.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/how-it-works">How it works</Link>
            </li>
            <li>
              <Link href="/for-gp-practices">For GP practices</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/contact">Book a call</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h2>Legal</h2>
          <ul>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/cookies">Cookie policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 Capacity+. All rights reserved.</p>
        <p>
          Transparent by design. Every referral. Every outcome. Fully trackable.
        </p>
      </div>
    </footer>
  );
}
