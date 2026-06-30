"use client";

// components/SearchBar.tsx
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-secondary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search laptops..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border-subtle bg-surface py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent dark:bg-surface-dark"
      />
    </div>
  );
}
