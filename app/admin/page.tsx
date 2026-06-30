"use client";

// app/admin/page.tsx
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
}

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

const emptyForm = {
  name: "",
  brand: "",
  price: "",
  image: "",
  processor: "",
  ram: "",
  storage: "",
  display: "",
  description: "",
  stock: "",
};

function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ]);
      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      const prods: Product[] = productsData.products ?? [];
      const orders = ordersData.orders ?? [];

      setProducts(prods);
      setStats({
        totalProducts: prods.length,
        totalOrders: orders.length,
        totalRevenue: orders.reduce(
          (sum: number, o: { totalPrice: number }) => sum + o.totalPrice,
          0
        ),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      toast.success(editingId ? "Product updated" : "Product created");
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error saving product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (id: string) => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    const p = data.product;
    if (!p) return;

    setForm({
      name: p.name,
      brand: p.brand,
      price: String(p.price),
      image: p.image,
      processor: p.processor,
      ram: p.ram,
      storage: p.storage,
      display: p.display,
      description: p.description,
      stock: String(p.stock),
    });
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted");
      fetchData();
    } else {
      toast.error("Failed to delete product");
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
        <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
        <Link
          href="/admin/orders"
          className="rounded-full border-subtle px-5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          View Orders →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Products", value: stats.totalProducts },
          { label: "Orders", value: stats.totalOrders },
          { label: "Revenue", value: formatPrice(stats.totalRevenue) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl bg-surface p-6 dark:bg-surface-dark"
          >
            <p className="text-sm text-primary-secondary dark:text-gray-400">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Products</h2>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover active:scale-95"
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-4 rounded-3xl bg-surface p-6 sm:grid-cols-2 dark:bg-surface-dark"
        >
          {(
            Object.keys(emptyForm) as Array<keyof typeof emptyForm>
          ).map((key) => (
            <div key={key} className={key === "description" ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-medium capitalize">
                {key}
              </label>
              {key === "description" ? (
                <textarea
                  required
                  rows={3}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="mt-1 w-full rounded-xl border-subtle bg-white px-3 py-2 text-sm outline-none focus:border-accent dark:bg-gray-900"
                />
              ) : (
                <input
                  required
                  type={key === "price" || key === "stock" ? "number" : "text"}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="mt-1 w-full rounded-xl border-subtle bg-white px-3 py-2 text-sm outline-none focus:border-accent dark:bg-gray-900"
                />
              )}
            </div>
          ))}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {submitting
                ? "Saving..."
                : editingId
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-3xl bg-surface dark:bg-surface-dark">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-subtle text-left">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Brand</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-subtle last:border-0">
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.brand}</td>
                <td className="p-4">{formatPrice(p.price)}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p._id)}
                      className="text-accent hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
