import { useMemo, useState } from 'react';
import { useClickOutside } from '@/shared/hooks';
import type { CalendarDay } from './../types';
import { getCalendarDays, getDateFromValue, getInitialMonth } from './../utils';

interface UseDatePickerParams {
  disabled: boolean;
  max?: string;
  min?: string;
  value: string;
  onBlur?: () => void;
  onChange: (value: string) => void;
}

export const useDatePicker = ({
  disabled,
  max,
  min,
  value,
  onBlur,
  onChange,
}: UseDatePickerParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => getInitialMonth(value, min));

  const calendarDays = useMemo(() => {
    return getCalendarDays(currentMonth, value, min, max);
  }, [currentMonth, max, min, value]);

  const handleClose = () => {
    setIsOpen(false);
    onBlur?.();
  };

  const containerRef = useClickOutside({ onClose: handleClose, disabled: !isOpen });

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    setIsOpen((currentValue) => !currentValue);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: CalendarDay) => {
    if (day.isDisabled) {
      return;
    }

    onChange(day.dateValue);
    handleClose();
  };

  const selectedDate = useMemo(() => getDateFromValue(value), [value]);

  if (selectedDate && selectedDate.getTime() !== currentMonth.getTime()) {
    setCurrentMonth(selectedDate);
  }

  return {
    calendarDays,
    containerRef,
    currentMonth,
    isOpen,
    handleDateSelect,
    handleNextMonth,
    handlePreviousMonth,
    handleToggle,
  };
};
