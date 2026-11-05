// RESPONSIBILITY: Defines the public prop contract for the shared Admin error fallback.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutErrorFallbackTypes.ts)

export interface AdminErrorFallbackProps {
  error: Error & { digest?: string; status?: number; statusCode?: number; code?: string; response?: { status?: number } };
  reset: () => void;
  moduleName: string;
}
