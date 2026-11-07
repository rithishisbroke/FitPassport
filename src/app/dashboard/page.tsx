import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { signOut } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/user";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Fit Passport.",
  robots: { index: false },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
            <Wordmark />
            <Link
              href="/"
              className="text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
            >
              Back to home
            </Link>
          </div>
        </Container>
      </header>

      <main id="main-content" className="flex-1">
        <Suspense fallback={<DashboardLoading />}>
          <DashboardOverview />
        </Suspense>
      </main>

      <footer className="border-t border-line">
        <Container>
          <p className="py-6 text-xs text-ink-faint">© 2026 FitPassport</p>
        </Container>
      </footer>
    </div>
  );
}

async function DashboardOverview() {
  const user = await getCurrentUser();

  if (!user) {
    // Without credentials there is nowhere to sign in, so explain the setup
    // instead of bouncing between the dashboard and the login page.
    if (!isSupabaseConfigured) {
      return <DashboardSetupNotice />;
    }

    redirect("/login");
  }

  return (
    <Container>
      <div className="py-14 sm:py-20">
        <p className="text-[0.68rem] font-medium tracking-[0.18em] text-accent uppercase">
          Fit Passport
        </p>
        <h1 className="mt-5 font-serif text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02] tracking-[-0.015em] text-balance">
          Your Fit Passport
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-ink-muted">
          This is where your sizes will live. In the next stage you’ll add the
          clothes that fit you well and see them build into a fit profile.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-line py-4">
          <p className="text-sm text-ink-muted">
            Signed in as{" "}
            <span className="font-medium text-ink">
              {user.fullName || user.email}
            </span>
            {user.fullName && user.email ? (
              <span className="text-ink-faint"> ({user.email})</span>
            ) : null}
          </p>
          <form action={signOut}>
            <Button type="submit" variant="secondary">
              Log out
            </Button>
          </form>
        </div>

        <section
          aria-labelledby="sizes-heading"
          className="mt-10 rounded-card border border-line bg-paper-raised p-6 sm:p-10"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="sizes-heading" className="text-base font-medium">
              Sizes you wear
            </h2>
            <p className="text-xs text-ink-faint">Men’s T-shirts</p>
          </div>

          <div className="mt-8 rounded-field border border-dashed border-line-strong px-6 py-14 text-center">
            <p className="font-serif text-2xl">Nothing added yet</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-pretty text-ink-muted">
              You’ll add the sizes you already wear here — starting with the
              T-shirts that fit you well.
            </p>
            <Button className="mt-6" disabled aria-describedby="add-size-note">
              Add a size
            </Button>
            <p id="add-size-note" className="mt-3 text-xs text-ink-faint">
              Size entry arrives with onboarding in the next stage.
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}

function DashboardLoading() {
  return (
    <Container>
      <p className="py-20 text-sm text-ink-muted">Loading your Fit Passport…</p>
    </Container>
  );
}

function DashboardSetupNotice() {
  return (
    <Container>
      <div className="py-14 sm:py-20">
        <p className="text-[0.68rem] font-medium tracking-[0.18em] text-accent uppercase">
          Setup required
        </p>
        <h1 className="mt-5 font-serif text-3xl leading-tight tracking-[-0.01em]">
          Connect Supabase to sign in
        </h1>
        <div className="mt-5 max-w-xl space-y-4 text-sm leading-relaxed text-ink-muted">
          <p>
            Authentication is implemented, but this environment has no Supabase
            credentials yet. Copy <code className="text-ink">.env.example</code>{" "}
            to <code className="text-ink">.env.local</code> and set the project
            URL and anon key, then restart the dev server.
          </p>
          <p className="text-xs text-ink-faint">
            The dashboard will redirect signed-out visitors to the login page as
            soon as credentials are present.
          </p>
        </div>
        <Button href="/login" className="mt-7">
          Go to log in
        </Button>
      </div>
    </Container>
  );
}
