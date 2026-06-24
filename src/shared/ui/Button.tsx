import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
}

const getButtonClassName = (variant: ButtonVariant, className?: string) => {
  const baseClassName =
    'flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70';

  const variantClassName =
    variant === 'primary'
      ? 'bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent/90'
      : 'border border-border bg-surface text-foreground shadow-sm hover:border-accent hover:text-accent';

  return [baseClassName, variantClassName, className].filter(Boolean).join(' ');
};

export const Button = ({
  children,
  className,
  disabled,
  isLoading = false,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={getButtonClassName(variant, className)}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading && (
        <span className="size-4 animate-spin rounded-full border-2 border-current/40 border-t-current" />
      )}

      {children}
    </button>
  );
};
