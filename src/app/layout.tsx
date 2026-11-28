import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { IntlProvider } from "@/providers/IntlProvider";

export const metadata: Metadata = {
  title: "Smart Gym 360 | ERP",
  description: "Enterprise Gym Management & Operations Platform",
  icons: {
    icon: [
      { url: "/gym-brand-icon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "32x32" },
    ],
    shortcut: "/gym-brand-icon.svg?v=2",
    apple: "/gym-brand-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
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
