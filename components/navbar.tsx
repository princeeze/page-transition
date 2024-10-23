import Link from "next/link";

export default function Navbar() {
  return (
    <div className="header">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
}
