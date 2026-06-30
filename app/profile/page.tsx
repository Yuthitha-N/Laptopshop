"use client";

// app/profile/page.tsx
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, formatDate } from "@/lib/utils";

interface Order {
  _id: string;
  products: { name: string; quantity: number; price: number }[];
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
}

function ProfileContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>

      <div className="mt-8 rounded-3xl bg-surface p-6 dark:bg-surface-dark">
        <h2 className="text-lg font-semibold">Account Details</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="text-primary-secondary dark:text-gray-400">Name:</dt>
            <dd>{user?.name}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-primary-secondary dark:text-gray-400">Email:</dt>
            <dd>{user?.email}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-primary-secondary dark:text-gray-400">Role:</dt>
            <dd className="capitalize">{user?.role}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Order History</h2>
        {loading ? (
          <div className="mt-6 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : orders.length === 0 ? (
          <p className="mt-4 text-sm text-primary-secondary dark:text-gray-400">
            No orders yet.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-3xl bg-surface p-6 dark:bg-surface-dark"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm text-primary-secondary dark:text-gray-400">
                    {formatDate(order.createdAt)}
                  </span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium capitalize text-accent">
                    {order.orderStatus}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm">
                  {order.products.map((p, i) => (
                    <li key={i}>
                      {p.name} × {p.quantity} — {formatPrice(p.price * p.quantity)}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 font-bold text-accent">
                  Total: {formatPrice(order.totalPrice)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
