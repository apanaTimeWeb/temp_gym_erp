import Link from "next/link";
import {
  Dumbbell,
  Users,
  CalendarCheck,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  LogIn,
  ExternalLink,
  Sparkles,
  Lock,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const features = [
    {
      title: "Member Management",
      desc: "Comprehensive lifecycle tracking, biometric check-in, and tiered memberships.",
      icon: Users,
    },
    {
      title: "Class & Attendance",
      desc: "Real-time automated attendance logging, scheduling, and trainer allocation.",
      icon: CalendarCheck,
    },
    {
      title: "Revenue & Billing",
      desc: "Automated recurring invoices, multi-gateway payments, and granular financial reporting.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-page text-text-primary">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-header px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-subtle text-primary">
              <Dumbbell className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-text-primary text-lg">
                SMART GYM <span className="text-primary">360</span>
              </span>
              <span className="ml-2 rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary">
                ERP v1.0
              </span>
            </div>
          </Link>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-xs font-medium text-success-text">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            System Operational
          </span>

          <Link
            href="/frontend_public/public_landing"
            data-testid="home-nav-public-landing"
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-text-secondary transition hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ExternalLink className="h-4 w-4" />
            Public Website
          </Link>

          <Link
            href="/frontend_auth/auth_login/login_credentials_and_demo_access"
            data-testid="home-nav-login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-text-on-primary transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In / Demo</span>
          </Link>

          <div className="border-l border-border pl-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="flex-1 px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Hero Section */}
          <section className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-text-secondary shadow-card">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Next.js App Router &bull; Enterprise Micro-Modular Architecture</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-text-primary">
              Next-Generation <span className="text-primary">Gym ERP</span> System
            </h1>
            
            <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
              Engineered with extreme module isolation, tokenized luxury gold design system,
              TanStack Query v5, Zustand state, and strict schema validation.
            </p>

            {/* Prominent Action Call-To-Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/frontend_auth/auth_login/login_credentials_and_demo_access"
                data-testid="home-hero-login-btn"
                className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-text-on-primary shadow-card transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In to ERP Portal</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/frontend_public/public_landing"
                data-testid="home-hero-landing-btn"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-base font-semibold text-text-primary shadow-card transition-all hover:bg-surface-hover hover:border-primary hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ExternalLink className="h-5 w-5 text-primary" />
                <span>Explore Public Website</span>
              </Link>
            </div>

            {/* Quick Demo Credentials Info Pill */}
            <div className="pt-2">
              <Link
                href="/frontend_auth/auth_login/login_credentials_and_demo_access"
                className="inline-flex items-center gap-2 rounded-full bg-primary-subtle px-4 py-1.5 text-xs font-semibold text-primary transition hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Instant 1-Click Demo Profiles Available: Superadmin &bull; Owner &bull; Trainer &bull; Member</span>
              </Link>
            </div>
          </section>

          {/* Quick Route Portals */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Public Portal Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary">
              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                  <Dumbbell className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">
                  Public Landing Portal
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  The client-facing website with interactive BMI calculator, transformation stories, class timetables, membership plans, trainer directories, and lead capture forms.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-md bg-page px-2 py-1 text-xs text-text-secondary border border-border">BMI Calculator</span>
                  <span className="rounded-md bg-page px-2 py-1 text-xs text-text-secondary border border-border">Class Schedule</span>
                  <span className="rounded-md bg-page px-2 py-1 text-xs text-text-secondary border border-border">Online Booking</span>
                  <span className="rounded-md bg-page px-2 py-1 text-xs text-text-secondary border border-border">Trainer Directory</span>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/frontend_public/public_landing"
                  data-testid="home-portal-landing-link"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-page px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:border-primary hover:bg-surface-hover hover:text-primary"
                >
                  <span>Launch Public Website</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Auth Portal Card */}
            <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary">
              <div className="space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                  <Lock className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">
                  ERP Authentication Suite
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Enterprise security gate with multi-role RBAC, CSRF-hardened cookie storage, session auto-refresh, role-based dashboard redirects, and 1-click test credentials.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-md bg-page px-2 py-1 text-xs text-text-secondary border border-border">Multi-Role RBAC</span>
                  <span className="rounded-md bg-page px-2 py-1 text-xs text-text-secondary border border-border">1-Click Demo Logins</span>
                  <span className="rounded-md bg-page px-2 py-1 text-xs text-text-secondary border border-border">Session Refresh</span>
                  <span className="rounded-md bg-page px-2 py-1 text-xs text-text-secondary border border-border">Password Reset</span>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href="/frontend_auth/auth_login/login_credentials_and_demo_access"
                  data-testid="home-portal-auth-link"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-text-on-primary transition hover:bg-primary-hover shadow-sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Access ERP Login</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Core Feature Pillars */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:border-primary hover:bg-surface-hover"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-subtle text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Quick Architecture Status Card */}
          <section className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-text-primary">
                  Ready for Production &amp; Testing
                </h2>
                <p className="text-sm text-text-secondary">
                  The <code className="rounded bg-bg-input px-1.5 py-0.5 text-primary">src/app/frontend_public</code> and <code className="rounded bg-bg-input px-1.5 py-0.5 text-primary">src/app/frontend_auth</code> modules are fully integrated and functional.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/frontend_public/public_landing"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-page px-4 py-2 text-sm font-medium text-text-primary transition hover:border-primary hover:text-primary"
                >
                  <span>Public Landing</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="/frontend_auth/auth_login/login_credentials_and_demo_access"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-text-on-primary transition hover:bg-primary-hover shadow-sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span>ERP Login</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-header py-8 px-6 text-text-secondary">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            Smart Gym 360 ERP &bull; Built with Next.js App Router, Tailwind CSS v4, TypeScript &amp; TanStack Query
          </div>
          <div className="flex items-center gap-4">
            <Link href="/frontend_public/public_landing" className="hover:text-primary transition">
              Public Website
            </Link>
            <span>&bull;</span>
            <Link href="/frontend_auth/auth_login/login_credentials_and_demo_access" className="hover:text-primary transition">
              ERP Sign In
            </Link>
            <span>&bull;</span>
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
