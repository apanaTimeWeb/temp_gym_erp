// RESPONSIBILITY: Unique bespoke geometric gym brand emblem (Hex-Plate + Kinetic Barbell Crest) for the Manager shell.
import type { SVGProps } from 'react';

export function ManagerNavigationBrandIcon({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8.5 2.75H15.5L21.25 8.5V15.5L15.5 21.25H8.5L2.75 15.5V8.5L8.5 2.75Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <rect x="5.75" y="9" width="2.4" height="6" rx="0.8" fill="currentColor" />
      <rect x="15.85" y="9" width="2.4" height="6" rx="0.8" fill="currentColor" />
      <path
        d="M8.15 12H10.4L11.55 9.35L12.65 14.65L13.75 12H15.85"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ManagerNavigationBrandIcon;
