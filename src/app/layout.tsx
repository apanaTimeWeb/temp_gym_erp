import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { IntlProvider } from "@/providers/IntlProvider";

export const metadata: Metadata = {
  title: "Smart Gym 360 | ERP",
  description: "Enterprise Gym Management & Operations Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-page text-text-primary antialiased selection:bg-primary-subtle selection:text-primary">
        <IntlProvider>
          <QueryProvider>
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </QueryProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
