import {
  Dumbbell,
  Users,
  CalendarCheck,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

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
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-xs font-medium text-success-text">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            System Operational
          </span>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="flex-1 px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Hero Section */}
          <section className="space-y-4 text-center">
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
                  Ready for Feature Implementation
                </h2>
                <p className="text-sm text-text-secondary">
                  The <code className="rounded bg-bg-input px-1.5 py-0.5 text-primary">src/app/</code> route structure, design tokens, and application infrastructure baseline are fully prepared.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-text-on-primary transition hover:bg-primary-hover">
                  Explore Architecture
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-header py-6 text-center text-xs text-text-secondary">
        Smart Gym 360 ERP &bull; Built with Next.js App Router, Tailwind CSS v4, TypeScript &amp; TanStack Query
      </footer>
    </div>
  );
}
