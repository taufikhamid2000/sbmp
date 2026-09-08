import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "./components/sales-chart";

export const metadata: Metadata = {
  title: "Sales - SBMP",
  description: "Sales monitor and trends",
};

const recentSales = [
  { id: "ORD-8841", customer: "Walk-in", location: "Downtown", total: "RM 24.50", time: "2 min ago" },
  { id: "ORD-8840", customer: "Aina R.", location: "Riverside", total: "RM 118.00", time: "17 min ago" },
  { id: "ORD-8839", customer: "Walk-in", location: "Uptown", total: "RM 9.90", time: "31 min ago" },
  { id: "ORD-8838", customer: "Hafiz T.", location: "Downtown", total: "RM 62.30", time: "1 hr ago" },
];

export default async function SalesPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <h1 className="text-xl font-semibold text-foreground">Sales</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-foreground/60">This week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-foreground">RM 29,280</p>
            <p className="mt-1 text-xs text-accent">+8.4% vs last week</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-foreground/60">Avg. order value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-foreground">RM 38.20</p>
            <p className="mt-1 text-xs text-foreground/50">across 3 locations</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-foreground/60">Transactions today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-foreground">112</p>
            <p className="mt-1 text-xs text-foreground/50">as of now</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Revenue — last 7 days</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <SalesChart />
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Recent sales</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground/50">
                <th className="px-6 py-2 font-medium">Order</th>
                <th className="px-2 py-2 font-medium">Customer</th>
                <th className="px-2 py-2 font-medium">Location</th>
                <th className="px-2 py-2 font-medium text-right">Total</th>
                <th className="px-6 py-2 font-medium text-right">When</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-b border-border/60 last:border-0">
                  <td className="px-6 py-3 font-mono text-foreground/70">{sale.id}</td>
                  <td className="px-2 py-3 text-foreground">{sale.customer}</td>
                  <td className="px-2 py-3 text-foreground/70">{sale.location}</td>
                  <td className="px-2 py-3 text-right font-mono text-foreground">{sale.total}</td>
                  <td className="px-6 py-3 text-right text-foreground/50">{sale.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
