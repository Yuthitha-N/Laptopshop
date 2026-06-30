"use client";

// app/checkout/page.tsx
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
          address,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");

      clearCart();
      toast.success("Order placed successfully!");
      router.push("/profile");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
        <p className="mt-4 text-primary-secondary dark:text-gray-400">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Shipping Address
            </label>
            <textarea
              id="address"
              required
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, City, State, ZIP"
              className="mt-1 w-full rounded-2xl border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent dark:bg-surface-dark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Payment Method</label>
            <div className="mt-2 space-y-2">
              {[
                { value: "card", label: "Credit / Debit Card" },
                { value: "paypal", label: "PayPal" },
                { value: "cod", label: "Cash on Delivery" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border-subtle bg-surface px-4 py-3 dark:bg-surface-dark"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-accent"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit rounded-3xl bg-surface p-6 dark:bg-surface-dark">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-subtle pt-4">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-accent">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-accent py-3 font-medium text-white transition-colors hover:bg-accent-hover active:scale-95 disabled:opacity-60"
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutForm />
    </ProtectedRoute>
  );
}
