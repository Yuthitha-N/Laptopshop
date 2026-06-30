"use client";

// components/Navbar.tsx
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-subtle">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Laptop<span className="text-accent">Store</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/products" className="text-sm text-primary-secondary transition-colors hover:text-accent dark:text-gray-400">
            Shop
          </Link>
          <Link href="/products?category=laptop" className="text-sm text-primary-secondary transition-colors hover:text-accent dark:text-gray-400">
            Laptops
          </Link>
          <Link href="/products?category=accessory" className="text-sm text-primary-secondary transition-colors hover:text-accent dark:text-gray-400">
            Accessories
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin" className="text-sm text-primary-secondary transition-colors hover:text-accent dark:text-gray-400">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border-subtle bg-surface transition-colors hover:bg-gray-200 dark:bg-surface-dark dark:hover:bg-gray-700 active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {!loading && (
            user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="hidden rounded-full px-4 py-2 text-sm transition-colors hover:text-accent sm:block"
                >
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent active:scale-95 dark:border-gray-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover active:scale-95"
              >
                Sign In
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
