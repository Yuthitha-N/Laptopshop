"use client";

// app/cart/page.tsx
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Your Cart</h1>
        <p className="mt-4 text-primary-secondary dark:text-gray-400">
          Your cart is empty.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-medium text-white transition-colors hover:bg-accent-hover active:scale-95"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Your Cart</h1>
      <p className="mt-1 text-sm text-primary-secondary dark:text-gray-400">
        {items.length} item{items.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <div className="h-fit rounded-3xl bg-surface p-6 dark:bg-surface-dark">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-primary-secondary dark:text-gray-400">
              Subtotal
            </span>
            <span className="font-bold">{formatPrice(totalPrice)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-primary-secondary dark:text-gray-400">
              Shipping
            </span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-subtle pt-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-accent">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-accent py-3 text-center font-medium text-white transition-colors hover:bg-accent-hover active:scale-95"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
