'use client';

import { useId } from 'react';
import { CalendarIcon } from '@/shared/icons/CalendarIcon';
import { CalendarPopover } from './CalendarPopover';
import { getButtonClassName, getDisplayDate } from './utils';
import { useDatePicker } from './hooks/useDatePicker';

interface DatePickerProps {
  disabled?: boolean;
  error?: boolean;
  errorId?: string;
  id?: string;
  max?: string;
  min?: string;
  placeholder?: string;
  value: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
}

export const DatePicker = ({
  disabled = false,
  error = false,
  errorId,
  id,
  max,
  min,
  placeholder = 'Выберите дату',
  value,
  onBlur,
  onChange,
}: DatePickerProps) => {
  const generatedDialogId = useId();
  const dialogId = `${generatedDialogId}-calendar`;
  const displayValue = getDisplayDate(value);

  const {
    calendarDays,
    containerRef,
    currentMonth,
    isOpen,
    handleDateSelect,
    handleNextMonth,
    handlePreviousMonth,
    handleToggle,
  } = useDatePicker({
    disabled,
    max,
    min,
    value,
    onBlur,
    onChange,
  });

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-controls={dialogId}
        aria-describedby={errorId}
        aria-expanded={isOpen}
        className={getButtonClassName(error)}
        disabled={disabled}
        id={id}
        onClick={handleToggle}
        type="button"
      >
        <span className={displayValue ? 'text-foreground' : 'text-muted/65'}>
          {displayValue || placeholder}
        </span>

        <CalendarIcon className="size-4 shrink-0 text-foreground" />
      </button>

      {isOpen && (
        <CalendarPopover
          calendarDays={calendarDays}
          currentMonth={currentMonth}
          dialogId={dialogId}
          onDateSelect={handleDateSelect}
          onNextMonth={handleNextMonth}
          onPreviousMonth={handlePreviousMonth}
        />
      )}
    </div>
  );
};
