'use client';

import { useId } from 'react';
import { SelectOptionButton } from './SelectOptionButton';
import type { SelectOption } from './types';
import { getButtonClassName } from './utils';
import { useSelect } from './useSelect';

interface SelectProps {
  disabled?: boolean;
  error?: boolean;
  errorId?: string;
  id?: string;
  options: SelectOption[];
  placeholder?: string;
  value: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
}

export const Select = ({
  disabled = false,
  error = false,
  errorId,
  id,
  options,
  placeholder = 'Выберите значение',
  value,
  onBlur,
  onChange,
}: SelectProps) => {
  const generatedListboxId = useId();
  const listboxId = `${generatedListboxId}-listbox`;

  const selectedOption = options.find((option) => option.value === value);

  const {
    containerRef,
    highlightedIndex,
    isOpen,
    handleKeyDown,
    handleOptionSelect,
    handleToggle,
  } = useSelect({
    disabled,
    onBlur,
    onChange,
    options,
  });

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-controls={listboxId}
        aria-describedby={errorId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={getButtonClassName({ error })}
        disabled={disabled}
        id={id}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span className={selectedOption ? 'text-foreground' : 'text-muted/65'}>
          {selectedOption?.label ?? placeholder}
        </span>

        <span
          aria-hidden="true"
          className={`text-sm text-muted transition ${isOpen ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 right-0 z-30 mt-2 max-h-[182px] overflow-y-auto rounded-2xl border border-border bg-surface p-1 shadow-xl shadow-black/10 [scrollbar-width:thin]"
          id={listboxId}
          role="listbox"
        >
          {options.map((option, index) => (
            <SelectOptionButton
              isHighlighted={index === highlightedIndex}
              isSelected={option.value === value}
              key={option.value}
              option={option}
              onSelect={handleOptionSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
