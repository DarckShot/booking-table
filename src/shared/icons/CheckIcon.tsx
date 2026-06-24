import type { SVGAttributes } from 'react';

interface CheckIconProps extends SVGAttributes<SVGSVGElement> {
  className?: string;
}

export const CheckIcon = ({ className, ...props }: CheckIconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};
