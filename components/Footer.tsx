// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-subtle bg-surface dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Laptop<span className="text-accent">Store</span>
            </h3>
            <p className="mt-2 text-sm text-primary-secondary dark:text-gray-400">
              Premium laptops for work, creativity, and everything in between.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-primary-secondary dark:text-gray-400">
              <li><Link href="/products" className="hover:text-accent">All Laptops</Link></li>
              <li><Link href="/products?category=accessory" className="hover:text-accent">Accessories</Link></li>
              <li><Link href="/cart" className="hover:text-accent">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Account</h4>
            <ul className="mt-3 space-y-2 text-sm text-primary-secondary dark:text-gray-400">
              <li><Link href="/login" className="hover:text-accent">Sign In</Link></li>
              <li><Link href="/signup" className="hover:text-accent">Create Account</Link></li>
              <li><Link href="/profile" className="hover:text-accent">Profile</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-subtle pt-6 text-center text-xs text-primary-secondary dark:text-gray-500">
          © {new Date().getFullYear()} LaptopStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
