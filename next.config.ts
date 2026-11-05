import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/frontend_auth/auth_login/login_credentials_and_demo_access",
        permanent: false,
      },
      {
        source: "/frontend_auth",
        destination: "/frontend_auth/auth_login/login_credentials_and_demo_access",
        permanent: false,
      },
      {
        source: "/frontend_auth/auth/login",
        destination: "/frontend_auth/auth_login/login_credentials_and_demo_access",
        permanent: false,
      },
      {
        source: "/frontend_auth/auth_login",
        destination: "/frontend_auth/auth_login/login_credentials_and_demo_access",
        permanent: false,
      },
      {
        source: "/landing",
        destination: "/frontend_public/public_landing",
        permanent: false,
      },
      {
        source: "/frontend_public",
        destination: "/frontend_public/public_landing",
        permanent: false,
      },
      {
        source: "/trainer",
        destination: "/frontend_trainer/trainer_dashboard/dashboard_overview",
        permanent: false,
      },
      {
        source: "/trainer/dashboard",
        destination: "/frontend_trainer/trainer_dashboard/dashboard_overview",
        permanent: false,
      },
      {
        source: "/frontend_trainer",
        destination: "/frontend_trainer/trainer_dashboard/dashboard_overview",
        permanent: false,
      },
      {
        source: "/frontend_trainer/trainer_dashboard",
        destination: "/frontend_trainer/trainer_dashboard/dashboard_overview",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/auth/me",
        destination: "/frontend_auth/auth/me",
      },
      {
        source: "/trainer/trainer_dashboard/stats",
        destination: "/frontend_trainer/trainer_dashboard/stats",
      },
      {
        source: "/trainer/:path*",
        destination: "/frontend_trainer/api/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
