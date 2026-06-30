"use client";

// components/FilterSidebar.tsx
import { formatPrice } from "@/lib/utils";

interface FilterSidebarProps {
  brands: string[];
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export default function FilterSidebar({
  brands,
  selectedBrands,
  onBrandToggle,
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
}: FilterSidebarProps) {
  return (
    <aside className="space-y-6 rounded-3xl bg-surface p-6 dark:bg-surface-dark">
      <div>
        <h3 className="text-sm font-semibold tracking-tight">Brand</h3>
        <div className="mt-3 space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-3 text-sm"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandToggle(brand)}
                className="h-4 w-4 rounded accent-accent"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold tracking-tight">Price Range</h3>
        <div className="mt-3 space-y-3">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], Number(e.target.value)])
            }
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-primary-secondary dark:text-gray-400">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
