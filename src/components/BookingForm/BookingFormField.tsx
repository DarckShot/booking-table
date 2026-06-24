import type { ReactNode } from 'react';

interface BookingFormFieldProps {
  children: ReactNode;
  error?: string;
  errorId?: string;
  htmlFor: string;
  label: string;
}

export const getBookingInputClassName = (hasError: boolean, className?: string) => {
  const baseClassName =
    'mt-2 w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted/65 focus:border-accent focus:ring-4 focus:ring-accent/15';

  const stateClassName = hasError
    ? 'border-error focus:border-error focus:ring-error/10'
    : 'border-border';

  return [baseClassName, stateClassName, className].filter(Boolean).join(' ');
};

export const BookingFormField = ({
  children,
  error,
  errorId,
  htmlFor,
  label,
}: BookingFormFieldProps) => {
  return (
    <div>
      <label className="text-sm font-medium text-foreground" htmlFor={htmlFor}>
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-2 text-sm text-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
};
