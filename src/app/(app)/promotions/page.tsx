import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PromotionsChart } from "./components/promotions-chart";

export const metadata: Metadata = {
  title: "Promotions - SBMP",
  description: "Create promotions and view campaign analytics",
};

const campaigns = [
  { name: "Weekend Combo", discount: "15% off", ends: "In 3 days", status: "Active" },
  { name: "Loyalty 10%", discount: "10% off", ends: "Ongoing", status: "Active" },
  { name: "New Store Launch", discount: "RM 5 off", ends: "Ended", status: "Ended" },
  { name: "Happy Hour", discount: "20% off (3–5PM)", ends: "In 12 days", status: "Active" },
];

export default async function PromotionsPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-foreground">Promotions</h1>
        <Button variant="primary" size="sm">
          + Create promotion
        </Button>
      </div>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">New promotion</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Promotion name"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
          <input
            placeholder="Discount (e.g. 15% off)"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
          <input
            type="date"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
          <Button variant="primary" className="sm:w-fit">
            Launch campaign
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Redemptions by campaign</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <PromotionsChart />
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground/50">
                <th className="px-6 py-2 font-medium">Campaign</th>
                <th className="px-2 py-2 font-medium">Discount</th>
                <th className="px-2 py-2 font-medium">Ends</th>
                <th className="px-6 py-2 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} className="border-b border-border/60 last:border-0">
                  <td className="px-6 py-3 text-foreground">{c.name}</td>
                  <td className="px-2 py-3 text-foreground/70">{c.discount}</td>
                  <td className="px-2 py-3 text-foreground/50">{c.ends}</td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className={
                        c.status === "Active"
                          ? "rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                          : "rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground/60"
                      }
                    >
                      {c.status}
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
