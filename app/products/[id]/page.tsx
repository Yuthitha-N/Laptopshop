"use client";

// app/products/[id]/page.tsx
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category?: "laptop" | "accessory";
  price: number;
  image: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  description: string;
  stock: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product ?? null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;
    addItem(
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
      },
      1
    );
    toast.success("Added to cart!");
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const specs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    { label: "Display", value: product.display },
  ].filter((s) => s.value && s.value !== "N/A");

  const isAccessory = product.category === "accessory";

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface dark:bg-surface-dark">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary-secondary dark:text-gray-400">
            {product.brand}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-accent">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-primary-secondary dark:text-gray-400">
            {product.description}
          </p>

          {specs.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-2xl bg-surface p-4 dark:bg-surface-dark"
                >
                  <p className="text-xs text-primary-secondary dark:text-gray-400">
                    {spec.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          )}

          {isAccessory && (
            <p className="mt-6 rounded-2xl bg-accent/10 px-4 py-3 text-sm text-accent">
              Laptop accessory — compatible with most 13–16&quot; laptops
            </p>
          )}

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="rounded-full bg-accent px-8 py-3 font-medium text-white transition-colors hover:bg-accent-hover active:scale-95 disabled:opacity-40"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            {product.stock > 0 && (
              <span className="text-sm text-primary-secondary dark:text-gray-400">
                {product.stock} in stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
