"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { formatRwf } from "@/lib/utils";

export type PickerProduct = { id: string; name: string; unit: string; priceRwf: number | null; category: string };
export type PickedItem = { productId: string; quantity: number };

export function ProductPicker({
  value,
  onChange,
  pricedOnly = false,
}: {
  value: PickedItem[];
  onChange: (v: PickedItem[]) => void;
  pricedOnly?: boolean;
}) {
  const [products, setProducts] = useState<PickerProduct[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: PickerProduct[]) => setProducts(pricedOnly ? d.filter((p) => p.priceRwf != null) : d))
      .catch(() => setFailed(true));
  }, [pricedOnly]);

  if (failed) return <p className="text-sm text-laterite">We could not load the product list. Refresh the page or contact us directly.</p>;
  if (!products) return <p className="text-sm text-granite">Loading products…</p>;
  if (products.length === 0) return <p className="text-sm text-granite">No products are listed yet. Describe what you need in the message box.</p>;

  const qty = (id: string) => value.find((v) => v.productId === id)?.quantity ?? 0;
  const set = (id: string, q: number) => {
    const rest = value.filter((v) => v.productId !== id);
    onChange(q > 0 ? [...rest, { productId: id, quantity: q }] : rest);
  };

  return (
    <ul className="divide-y divide-granite/15 border border-granite/20 bg-white">
      {products.map((p) => (
        <li key={p.id} className="flex items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-granite">{p.priceRwf != null ? `${formatRwf(p.priceRwf)} per ${p.unit}` : "Price on request"}</p>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="sr-only">Quantity of {p.name} in {p.unit}s</span>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              className="h-10 w-24"
              value={qty(p.id) || ""}
              placeholder="0"
              onChange={(e) => set(p.id, Math.max(0, Math.floor(Number(e.target.value) || 0)))}
            />
            <span className="text-granite">{p.unit}s</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
