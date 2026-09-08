import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Profile - SBMP",
  description: "Account, business info, and subscription",
};

export default async function ProfilePage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  const user = data.user;
  // Supabase anonymous users have email as an empty string, not null —
  // "guest" fallback covers both undefined and "".
  const email = user.email || "guest";

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <h1 className="text-xl font-semibold text-foreground">Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong className="text-foreground">Email:</strong>{" "}
              <span className="text-foreground/70">{email}</span>
            </p>
            <p>
              <strong className="text-foreground">User ID:</strong>{" "}
              <span className="font-mono text-xs text-foreground/50">{user.id}</span>
            </p>
            <p>
              <strong className="text-foreground">Joined:</strong>{" "}
              <span className="text-foreground/70">
                {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Business info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong className="text-foreground">Business name:</strong>{" "}
              <span className="text-foreground/70">Not set</span>
            </p>
            <p>
              <strong className="text-foreground">Locations:</strong>{" "}
              <span className="text-foreground/70">Downtown, Riverside, Uptown</span>
            </p>
            <p>
              <strong className="text-foreground">Business type:</strong>{" "}
              <span className="text-foreground/70">Retail / F&amp;B</span>
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Edit business info
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-muted/40 shadow-none md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Subscription</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-foreground">
                <strong>Plan:</strong> Growth — RM 149/month
              </p>
              <p className="mt-1 text-xs text-foreground/50">Next billing date: 1 Oct 2026 · 3 locations included</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Manage billing
              </Button>
              <Button variant="secondary" size="sm">
                Upgrade plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
