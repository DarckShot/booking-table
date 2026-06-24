import { getDateInputValue } from '@/utils/date';
import type { CalendarDay } from './types';

export const getMonthTitle = (date: Date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const getDisplayDate = (value: string) => {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
};

export const getStartOfDay = (date: Date) => {
  const nextDate = new Date(date);

  nextDate.setHours(0, 0, 0, 0);

  return nextDate;
};

export const getDateFromValue = (value?: string) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

export const isDateBefore = (date: Date, min?: string) => {
  const minDate = getDateFromValue(min);

  if (!minDate) {
    return false;
  }

  return getStartOfDay(date) < getStartOfDay(minDate);
};

export const isDateAfter = (date: Date, max?: string) => {
  const maxDate = getDateFromValue(max);

  if (!maxDate) {
    return false;
  }

  return getStartOfDay(date) > getStartOfDay(maxDate);
};

export const getCalendarDaysCount = (startDayIndex: number, daysInMonth: number) => {
  const totalCells = startDayIndex + daysInMonth;

  return totalCells <= 35 ? 35 : 42;
};

export const getCalendarDays = (
  currentMonth: Date,
  selectedValue: string,
  min?: string,
  max?: string,
) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstMonthDay = new Date(year, month, 1);
  const startDayIndex = (firstMonthDay.getDay() + 6) % 7;
  const calendarStartDate = new Date(year, month, 1 - startDayIndex);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDaysCount = getCalendarDaysCount(startDayIndex, daysInMonth);
  const todayValue = getDateInputValue(new Date());

  return Array.from({ length: calendarDaysCount }, (_, index): CalendarDay => {
    const date = new Date(calendarStartDate);

    date.setDate(calendarStartDate.getDate() + index);

    const dateValue = getDateInputValue(date);

    return {
      dateValue,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isDisabled: isDateBefore(date, min) || isDateAfter(date, max),
      isSelected: dateValue === selectedValue,
      isToday: dateValue === todayValue,
    };
  });
};

export const getInitialMonth = (value: string, min?: string) => {
  const selectedDate = getDateFromValue(value);

  if (selectedDate) {
    return selectedDate;
  }

  const minDate = getDateFromValue(min);

  if (minDate) {
    return minDate;
  }

  return new Date();
};

export const getButtonClassName = (error: boolean) => {
  const baseClassName =
    'mt-2 flex w-full items-center justify-between gap-3 rounded-2xl border bg-background px-4 py-3 text-left text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-70';

  const stateClassName = error
    ? 'border-error focus:border-error focus:ring-error/10'
    : 'border-border';

  return `${baseClassName} ${stateClassName}`;
};
