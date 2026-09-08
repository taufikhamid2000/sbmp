import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Orders - SBMP",
  description: "Order management and status tracking",
};

const orders = [
  { id: "ORD-8841", customer: "Walk-in", items: 2, total: "RM 24.50", status: "Fulfilled" },
  { id: "ORD-8840", customer: "Aina R.", items: 6, total: "RM 118.00", status: "Preparing" },
  { id: "ORD-8839", customer: "Walk-in", items: 1, total: "RM 9.90", status: "Fulfilled" },
  { id: "ORD-8838", customer: "Hafiz T.", items: 4, total: "RM 62.30", status: "Ready for pickup" },
  { id: "ORD-8837", customer: "Mei Sze", items: 3, total: "RM 41.00", status: "Preparing" },
  { id: "ORD-8836", customer: "Walk-in", items: 1, total: "RM 6.50", status: "Cancelled" },
];

const statusStyle: Record<string, string> = {
  Fulfilled: "bg-accent/10 text-accent",
  Preparing: "bg-primary/10 text-primary",
  "Ready for pickup": "bg-primary/10 text-primary",
  Cancelled: "bg-destructive/10 text-destructive",
};

export default async function OrdersPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  const counts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-foreground">Orders</h1>
        <Button variant="primary" size="sm">
          + New order
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {Object.entries(counts).map(([status, count]) => (
          <Card key={status} className="rounded-2xl border-border bg-muted/40 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-foreground/60">{status}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-foreground">{count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">All orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground/50">
                <th className="px-6 py-2 font-medium">Order</th>
                <th className="px-2 py-2 font-medium">Customer</th>
                <th className="px-2 py-2 font-medium text-right">Items</th>
                <th className="px-2 py-2 font-medium text-right">Total</th>
                <th className="px-6 py-2 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border/60 last:border-0">
                  <td className="px-6 py-3 font-mono text-foreground/70">{o.id}</td>
                  <td className="px-2 py-3 text-foreground">{o.customer}</td>
                  <td className="px-2 py-3 text-right text-foreground/70">{o.items}</td>
                  <td className="px-2 py-3 text-right font-mono text-foreground">{o.total}</td>
                  <td className="px-6 py-3 text-right">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[o.status]}`}>
                      {o.status}
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
