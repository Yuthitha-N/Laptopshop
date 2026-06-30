"use client";

// app/page.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { HERO_LAPTOPS, PROMO_IMAGES, BRANDS } from "@/lib/product-images";

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const hero = HERO_LAPTOPS[heroIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_LAPTOPS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero — model-specific laptop images only */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#0A0A0A] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute -bottom-32 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              India&apos;s Premium Laptop Store
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Think different.
              <br />
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Work smarter.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-gray-400">
              Flagship laptops from Apple, Dell, HP, Lenovo & more — priced in
              ₹ INR. Browse the full catalog on our shop page.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-medium transition-all hover:bg-accent-hover active:scale-95"
              >
                Shop Now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium transition-all hover:bg-white/10 active:scale-95"
              >
                Browse without signing in
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              No account needed to shop · Sign in only for checkout
            </p>
          </div>

          {/* Rotating hero — each slide shows the correct laptop model image */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-lg">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-purple-600/30 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl bg-[#1C1C1E] shadow-2xl">
                {HERO_LAPTOPS.map((item, i) => (
                  <div
                    key={item.name}
                    className={`transition-opacity duration-700 ${
                      i === heroIndex
                        ? "relative opacity-100"
                        : "absolute inset-0 opacity-0"
                    }`}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-6"
                        priority={i === 0}
                        sizes="500px"
                      />
                    </div>
                    <div className="border-t border-white/10 px-6 py-4 text-center">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-400">{item.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {HERO_LAPTOPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === heroIndex ? "w-8 bg-accent" : "w-2 bg-white/30"
                    }`}
                    aria-label={`Show laptop ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Brand — links only, no product cards */}
      <section className="bg-surface py-20 dark:bg-surface-dark">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Shop by Brand
            </h2>
            <p className="mt-2 text-primary-secondary dark:text-gray-400">
              Explore laptops on the shop page
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/products?brand=${encodeURIComponent(brand.slug)}&category=laptop`}
                className={`group flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br ${brand.color} p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95`}
              >
                <span className="text-lg font-semibold tracking-tight">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo tiles with real laptop images */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/products?category=laptop"
            className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-white transition-transform hover:scale-[1.01]"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-10">
                <p className="text-sm text-accent">New arrivals</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                  MacBook & Ultrabooks
                </h3>
                <p className="mt-2 text-gray-400">From {formatPrice(74999)}</p>
                <span className="mt-6 inline-block text-accent group-hover:underline">
                  Shop laptops →
                </span>
              </div>
              <div className="relative min-h-[200px] md:min-h-0">
                <Image
                  src={PROMO_IMAGES.ultrabook}
                  alt='MacBook Air 15"'
                  fill
                  className="object-contain p-4"
                  sizes="400px"
                />
              </div>
            </div>
          </Link>
          <Link
            href="/products?category=laptop&brand=ASUS"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-accent text-white transition-transform hover:scale-[1.01]"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-10">
                <p className="text-sm text-blue-100">Performance</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                  Gaming Laptops
                </h3>
                <p className="mt-2 text-blue-100">ROG · MSI · Legion</p>
                <span className="mt-6 inline-block group-hover:underline">
                  Explore gaming →
                </span>
              </div>
              <div className="relative min-h-[200px] md:min-h-0">
                <Image
                  src={PROMO_IMAGES.gaming}
                  alt="ROG Zephyrus G14"
                  fill
                  className="object-contain p-4"
                  sizes="400px"
                />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Why LaptopStore?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Genuine Products",
                desc: "100% authentic laptops from top global brands with full warranty.",
                icon: "✓",
              },
              {
                title: "Indian Pricing",
                desc: "All prices displayed in ₹ INR — no hidden conversion fees.",
                icon: "₹",
              },
              {
                title: "Free Delivery",
                desc: "Complimentary shipping on every order across India.",
                icon: "🚚",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border-subtle bg-surface p-8 text-center dark:bg-surface-dark"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl text-accent">
                  {item.icon}
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-primary-secondary dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-[#0A0A0A] to-[#1a1a2e] px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to upgrade?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-400">
            All laptops, accessories & filters are on the shop page. No sign-in
            required to browse.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-full bg-accent px-10 py-3.5 font-medium transition-all hover:bg-accent-hover active:scale-95"
          >
            Go to Shop
          </Link>
        </div>
      </section>
    </>
  );
}
