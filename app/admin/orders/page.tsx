"use client";

// app/admin/orders/page.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { formatPrice, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

interface Order {
  _id: string;
  userId: { name: string; email: string } | string;
  products: { name: string; quantity: number; price: number }[];
  totalPrice: number;
  address: string;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
}

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, orderStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      toast.success("Order status updated");
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus } : o))
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">Order Management</h1>
        <Link
          href="/admin"
          className="rounded-full border-subtle px-5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          ← Dashboard
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="mt-10 text-center text-primary-secondary dark:text-gray-400">
          No orders yet.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => {
            const customer =
              typeof order.userId === "object"
                ? order.userId
                : { name: "Unknown", email: "" };

            return (
              <div
                key={order._id}
                className="rounded-3xl bg-surface p-6 dark:bg-surface-dark"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-sm text-primary-secondary dark:text-gray-400">
                      {customer.email}
                    </p>
                    <p className="mt-1 text-xs text-primary-secondary dark:text-gray-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="rounded-full border-subtle bg-white px-4 py-2 text-sm capitalize outline-none dark:bg-gray-900"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <ul className="mt-4 space-y-1 text-sm">
                  {order.products.map((p, i) => (
                    <li key={i}>
                      {p.name} × {p.quantity} —{" "}
                      {formatPrice(p.price * p.quantity)}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-primary-secondary dark:text-gray-400">
                  <span>Address: {order.address}</span>
                  <span className="capitalize">
                    Payment: {order.paymentMethod}
                  </span>
                </div>

                <p className="mt-3 font-bold text-accent">
                  Total: {formatPrice(order.totalPrice)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute adminOnly>
      <OrdersManagement />
    </ProtectedRoute>
  );
}
