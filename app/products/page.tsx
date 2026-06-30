"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import LaptopCard, { Product } from "@/components/LaptopCard";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";

function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl bg-surface dark:bg-surface-dark">
      <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();

  const categoryFilter = searchParams?.get("category") || "";

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items: Product[] = data.products ?? [];
        setProducts(items);
        if (items.length) {
          const prices = items.map((p) => p.price);
          setPriceRange([Math.min(...prices), Math.max(...prices)]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products]
  );

  const minPrice = products.length ? Math.min(...products.map((p) => p.price)) : 0;
  const maxPrice = products.length ? Math.max(...products.map((p) => p.price)) : 0;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        !categoryFilter || p.category === categoryFilter;
      const searchMatch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      return categoryMatch && searchMatch && brandMatch && priceMatch;
    });
  }, [products, categoryFilter, search, selectedBrands, priceRange]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Shop Laptops & Accessories</h1>
          {categoryFilter && (
            <p className="mt-1 text-sm text-primary-secondary dark:text-gray-400">
              Showing results for {categoryFilter}.
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <div className="flex-1 sm:max-w-xs">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-full border-subtle px-4 py-2 text-sm md:hidden"
          >
            Filters
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
          <FilterSidebar
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandToggle={toggleBrand}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-20 text-center text-primary-secondary dark:text-gray-400">
              No products found. Try changing filters or search terms.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <LaptopCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
