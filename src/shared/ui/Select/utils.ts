export const getButtonClassName = (error: boolean) => {
  const baseClassName =
    'mt-2 flex w-full items-center justify-between gap-3 rounded-2xl border bg-background px-4 py-3 text-left text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-70';

  const stateClassName = error
    ? 'border-error focus:border-error focus:ring-error/10'
    : 'border-border';

  return `${baseClassName} ${stateClassName}`;
};
