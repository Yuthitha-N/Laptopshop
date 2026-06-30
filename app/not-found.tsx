// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-primary-secondary dark:text-gray-400">
        Page not found
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-8 py-3 font-medium text-white transition-colors hover:bg-accent-hover active:scale-95"
      >
        Back to Shop
      </Link>
    </div>
  );
}
