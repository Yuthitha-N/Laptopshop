"use client";

// components/CartItem.tsx
import Image from "next/image";
import { CartItem as CartItemType } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 rounded-3xl bg-surface p-4 dark:bg-surface-dark">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-gray-900">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-2"
          sizes="96px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold tracking-tight">{item.name}</h3>
          <p className="text-sm font-bold text-accent">
            {formatPrice(item.price)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border-subtle transition-colors hover:bg-gray-200 active:scale-95 dark:hover:bg-gray-700"
            >
              −
            </button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="flex h-8 w-8 items-center justify-center rounded-full border-subtle transition-colors hover:bg-gray-200 active:scale-95 disabled:opacity-40 dark:hover:bg-gray-700"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.productId)}
            className="text-sm text-red-500 transition-colors hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
