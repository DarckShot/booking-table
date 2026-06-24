import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'default' | 'accent';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

const getBadgeClassName = (variant: BadgeVariant, className?: string) => {
  const baseClassName = 'inline-flex rounded-full border px-3 py-1 text-xs font-medium shadow-sm';

  const variantClassName =
    variant === 'accent'
      ? 'border-accent/25 bg-accent/10 text-accent'
      : 'border-border bg-surface text-muted';

  return [baseClassName, variantClassName, className].filter(Boolean).join(' ');
};

export const Badge = ({ children, className, variant = 'default', ...props }: BadgeProps) => {
  return (
    <span className={getBadgeClassName(variant, className)} {...props}>
      {children}
    </span>
  );
};
