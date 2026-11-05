// RESPONSIBILITY: Renders the Manager role's zero-business route-transition progress indicator using the global primary semantic token.
'use client';

import NextTopLoader from 'nextjs-toploader';

/**
 * @description Provides the top-of-viewport progress indicator for Next.js client route transitions in the Manager shell.
 * @dependencies Requires the approved nextjs-toploader package and the global --primary theme token for the visual color.
 * @edge-case Disables the built-in spinner so the shell does not display a second loader while module skeletons remain responsible for page content loading.
 */
export default function ManagerNavigationRouteProgress() {
  return (
    <NextTopLoader
      color="var(--primary)"
      height={3}
      showSpinner={false}
      crawl={true}
      speed={200}
      shadow="0 0 8px var(--primary),0 0 4px var(--primary)"
    />
  );
}
