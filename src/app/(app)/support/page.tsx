import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Support - SBMP",
  description: "FAQ, contact support, and bug reporting",
};

const faqs = [
  {
    q: "How do I add a new location?",
    a: "Go to Profile → Business info → Edit business info, then add the new location name and address.",
  },
  {
    q: "Why is an item showing as low stock?",
    a: "An item is flagged low stock once its quantity drops below the reorder threshold set on the Inventory page.",
  },
  {
    q: "Can I schedule staff across multiple locations?",
    a: "Yes — the Staff page's shift scheduler lets you assign a staff member to any location for a given shift.",
  },
  {
    q: "How do promotions apply at checkout?",
    a: "Active campaigns on the Promotions page automatically apply their discount to matching orders.",
  },
];

export default async function SupportPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <h1 className="text-xl font-semibold text-foreground">Support</h1>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {faqs.map((item) => (
            <details key={item.q} className="group border-b border-border/60 py-3 last:border-0">
              <summary className="cursor-pointer list-none text-sm font-medium text-foreground marker:content-none">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-foreground/60">{item.a}</p>
            </details>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Contact support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <textarea
              rows={4}
              placeholder="Describe your question or issue…"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            />
            <Button variant="primary" size="sm">
              Send message
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Report a bug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <input
              placeholder="Short summary"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            />
            <textarea
              rows={3}
              placeholder="Steps to reproduce…"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            />
            <Button variant="outline" size="sm">
              Submit bug report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
