import type { SelectOption } from './types';

interface SelectOptionButtonProps {
  isSelected: boolean;
  option: SelectOption;
  onSelect: (value: string) => void;
}

export const SelectOptionButton = ({ isSelected, option, onSelect }: SelectOptionButtonProps) => {
  return (
    <button
      aria-selected={isSelected}
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-background ${
        isSelected ? 'bg-background text-accent' : 'text-foreground'
      }`}
      onClick={() => onSelect(option.value)}
      role="option"
      type="button"
    >
      <span>{option.label}</span>

      {isSelected && (
        <span aria-hidden="true" className="text-xs font-semibold text-accent">
          ✓
        </span>
      )}
    </button>
  );
};
