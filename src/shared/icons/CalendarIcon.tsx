import type { SVGProps } from 'react';

export const CalendarIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M8 3V7M16 3V7M4 10H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.4"
      />
    </svg>
  );
};
