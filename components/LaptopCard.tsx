// components/LaptopCard.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: "laptop" | "accessory";
  price: number;
  image: string;
  processor: string;
  ram: string;
  stock: number;
}

interface LaptopCardProps {
  product: Product;
}

export default function LaptopCard({ product }: LaptopCardProps) {
  const [imgSrc, setImgSrc] = useState(product.image);
  const placeholder = "/images/placeholder.svg";
  return (
    <Link
      href={`/products/${product._id}`}
      className="group block overflow-hidden rounded-3xl bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-surface-dark"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white dark:bg-gray-900">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          onError={() => setImgSrc(placeholder)}
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-primary-secondary dark:text-gray-400">
          {product.brand}
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-primary-secondary dark:text-gray-400">
          {product.processor} · {product.ram}
        </p>
        <p className="mt-3 text-xl font-bold text-accent">
          {formatPrice(product.price)}
        </p>
        {product.stock === 0 && (
          <span className="mt-2 inline-block text-xs font-medium text-red-500">
            Out of stock
          </span>
        )}
      </div>
    </Link>
  );
}
