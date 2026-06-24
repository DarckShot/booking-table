import { useEffect, useMemo, useRef, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => getInitialMonth(value, min));

  const calendarDays = useMemo(() => {
    return getCalendarDays(currentMonth, value, min, max);
  }, [currentMonth, max, min, value]);

  const handleClose = () => {
    setIsOpen(false);
    onBlur?.();
  };

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

  useEffect(() => {
    if (!value) {
      return;
    }

    const selectedDate = getDateFromValue(value);

    if (selectedDate) {
      setCurrentMonth(selectedDate);
    }
  }, [value]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
