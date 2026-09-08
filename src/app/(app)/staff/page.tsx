import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Staff - SBMP",
  description: "Shift scheduling, task assignment, and performance",
};

const shifts = [
  { name: "Nurul Aina", role: "Barista", location: "Downtown", shift: "9:00–17:00", status: "On shift" },
  { name: "Faizal Hakim", role: "Cashier", location: "Riverside", shift: "12:00–20:00", status: "On shift" },
  { name: "Wei Ling", role: "Shift lead", location: "Uptown", shift: "8:00–16:00", status: "On break" },
  { name: "Danish Iqbal", role: "Barista", location: "Downtown", shift: "17:00–22:00", status: "Upcoming" },
];

const tasks = [
  { task: "Restock cold case", assignee: "Nurul Aina", due: "Today, 3:00 PM" },
  { task: "Deep-clean espresso machine", assignee: "Wei Ling", due: "Today, 5:00 PM" },
  { task: "Count till & reconcile", assignee: "Faizal Hakim", due: "Tomorrow, 9:00 AM" },
];

const performance = [
  { name: "Nurul Aina", sales: "RM 2,140", rating: 4.8 },
  { name: "Faizal Hakim", sales: "RM 1,920", rating: 4.6 },
  { name: "Wei Ling", sales: "RM 2,610", rating: 4.9 },
];

export default async function StaffPage() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data?.user || error) redirect("/auth/signin");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12 animate-page-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-foreground">Staff</h1>
        <Button variant="primary" size="sm">
          + Add shift
        </Button>
      </div>

      <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-foreground/60">Today&apos;s schedule</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground/50">
                <th className="px-6 py-2 font-medium">Name</th>
                <th className="px-2 py-2 font-medium">Role</th>
                <th className="px-2 py-2 font-medium">Location</th>
                <th className="px-2 py-2 font-medium">Shift</th>
                <th className="px-6 py-2 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((s) => (
                <tr key={s.name} className="border-b border-border/60 last:border-0">
                  <td className="px-6 py-3 text-foreground">{s.name}</td>
                  <td className="px-2 py-3 text-foreground/70">{s.role}</td>
                  <td className="px-2 py-3 text-foreground/70">{s.location}</td>
                  <td className="px-2 py-3 font-mono text-foreground/70">{s.shift}</td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className={
                        s.status === "On shift"
                          ? "rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                          : s.status === "On break"
                            ? "rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground/60"
                            : "rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      }
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Task assignments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((t) => (
              <div key={t.task} className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm text-foreground">{t.task}</p>
                  <p className="text-xs text-foreground/50">Assigned to {t.assignee}</p>
                </div>
                <span className="shrink-0 text-xs text-foreground/50">{t.due}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-muted/40 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/60">Performance this week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {performance.map((p) => (
              <div key={p.name} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-foreground">{p.name}</span>
                <span className="font-mono text-sm text-foreground/70">{p.sales}</span>
                <span className="text-xs text-accent">★ {p.rating}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
