import { redirect } from "next/navigation";
import { createServerClient } from "@/utils/supabase/server";

// Root is a pure gate, not a landing page: every visitor gets bounced
// straight to the page that actually applies to them — signed-in users to
// their dashboard, everyone else to sign-in — rather than being shown a
// public marketing page first. See DESIGN.md's "Auth pages" section.
export default async function Home() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(user ? "/dashboard" : "/auth/signin");
}
