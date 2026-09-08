import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Inventory - SBMP",
  description: "Stock tracking and low-stock alerts",
};

const stock = [
  { sku: "SKU-1042", name: "Espresso Beans 1kg", location: "Downtown", qty: 6, reorder: 15, status: "low" },
  { sku: "SKU-2091", name: "Oat Milk 1L", location: "Downtown", qty: 42, reorder: 20, status: "ok" },
  { sku: "SKU-3310", name: "Paper Cups 12oz", location: "Riverside", qty: 3, reorder: 50, status: "low" },
  { sku: "SKU-4187", name: "Croissant (frozen)", location: "Riverside", qty: 120, reorder: 40, status: "ok" },
  { sku: "SKU-5502", name: "Napkins (pack)", location: "Uptown", qty: 8, reorder: 25, status: "low" },
  { sku: "SKU-6120", name: "Cleaning Spray", location: "Uptown", qty: 30, reorder: 10, status: "ok" },
];

const lowStock = stock.filter((s) => s.status === "low");

export default async function InventoryPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-foreground">Inventory</h1>
        <Button variant="primary" size="sm">
          + Add stock item
        </Button>
      </div>

      {lowStock.length > 0 && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <strong>{lowStock.length} items are low on stock</strong> — {lowStock.map((s) => s.name).join(", ")}.
        </div>
      )}

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Stock by location</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground/50">
                <th className="px-6 py-2 font-medium">SKU</th>
                <th className="px-2 py-2 font-medium">Item</th>
                <th className="px-2 py-2 font-medium">Location</th>
                <th className="px-2 py-2 font-medium text-right">Qty</th>
                <th className="px-2 py-2 font-medium text-right">Reorder at</th>
                <th className="px-6 py-2 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {stock.map((item) => (
                <tr key={item.sku} className="border-b border-border/60 last:border-0">
                  <td className="px-6 py-3 text-foreground/70">{item.sku}</td>
                  <td className="px-2 py-3 font-sans text-foreground">{item.name}</td>
                  <td className="px-2 py-3 font-sans text-foreground/70">{item.location}</td>
                  <td className="px-2 py-3 text-right">{item.qty}</td>
                  <td className="px-2 py-3 text-right text-foreground/50">{item.reorder}</td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className={
                        item.status === "low"
                          ? "rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-sans font-medium text-destructive"
                          : "rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-sans font-medium text-accent"
                      }
                    >
                      {item.status === "low" ? "Low stock" : "In stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
