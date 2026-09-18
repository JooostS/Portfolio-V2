import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

export default function Header() {
  return (
    <header className="wrap site-header">
      <Link href="/" className="brand" aria-label="Joost Schreuders, home">
        <Image src={logo} alt="" width={40} height={40} priority />
        <span className="brand-name">Joost Schreuders</span>
      </Link>
      <nav className="site-nav" aria-label="Main">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact" className="btn small">Get in touch</Link>
      </nav>
    </header>
  );
}
