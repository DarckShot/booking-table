import { describe, expect, it, vi } from 'vitest';
import {
  getButtonClassName,
  getCalendarDays,
  getCalendarDaysCount,
  getDateFromValue,
  getDisplayDate,
  getInitialMonth,
  getMonthTitle,
  getStartOfDay,
  isDateAfter,
  isDateBefore,
} from '../utils';

describe('DatePicker utils', () => {
  describe('getMonthTitle', () => {
    it('formats month title in ru-RU locale', () => {
      const result = getMonthTitle(new Date('2026-06-15'));

      expect(result).toBe('июнь 2026 г.');
    });
  });

  describe('getDisplayDate', () => {
    it('returns empty string for empty value', () => {
      expect(getDisplayDate('')).toBe('');
    });

    it('formats date in ru-RU locale', () => {
      const result = getDisplayDate('2026-06-24');

      expect(result).toBe('24 июня 2026 г.');
    });
  });

  describe('getStartOfDay', () => {
    it('returns date with zeroed time', () => {
      const result = getStartOfDay(new Date('2026-06-24T18:45:30'));

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(24);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it('does not mutate original date', () => {
      const date = new Date('2026-06-24T18:45:30');
      getStartOfDay(date);

      expect(date.getHours()).toBe(18);
      expect(date.getMinutes()).toBe(45);
      expect(date.getSeconds()).toBe(30);
    });
  });

  describe('getDateFromValue', () => {
    it('returns null for empty value', () => {
      expect(getDateFromValue()).toBeNull();
      expect(getDateFromValue('')).toBeNull();
    });

    it('returns null for invalid date', () => {
      expect(getDateFromValue('invalid-date')).toBeNull();
    });

    it('returns date for valid value', () => {
      const result = getDateFromValue('2026-06-24');

      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2026);
      expect(result?.getMonth()).toBe(5);
      expect(result?.getDate()).toBe(24);
    });
  });

  describe('isDateBefore', () => {
    it('returns false when min is not provided', () => {
      expect(isDateBefore(new Date('2026-06-24'))).toBe(false);
    });

    it('returns false when min is invalid', () => {
      expect(isDateBefore(new Date('2026-06-24'), 'invalid-date')).toBe(false);
    });

    it('returns true when date is before min', () => {
      expect(isDateBefore(new Date('2026-06-23'), '2026-06-24')).toBe(true);
    });

    it('returns false when date is the same as min', () => {
      expect(isDateBefore(new Date('2026-06-24T23:59:59'), '2026-06-24')).toBe(false);
    });

    it('returns false when date is after min', () => {
      expect(isDateBefore(new Date('2026-06-25'), '2026-06-24')).toBe(false);
    });
  });

  describe('isDateAfter', () => {
    it('returns false when max is not provided', () => {
      expect(isDateAfter(new Date('2026-06-24'))).toBe(false);
    });

    it('returns false when max is invalid', () => {
      expect(isDateAfter(new Date('2026-06-24'), 'invalid-date')).toBe(false);
    });

    it('returns true when date is after max', () => {
      expect(isDateAfter(new Date('2026-06-25'), '2026-06-24')).toBe(true);
    });

    it('returns false when date is the same as max', () => {
      expect(isDateAfter(new Date('2026-06-24T23:59:59'), '2026-06-24')).toBe(false);
    });

    it('returns false when date is before max', () => {
      expect(isDateAfter(new Date('2026-06-23'), '2026-06-24')).toBe(false);
    });
  });

  describe('getCalendarDaysCount', () => {
    it('returns 35 when month fits into 5 weeks', () => {
      expect(getCalendarDaysCount(0, 30)).toBe(35);
      expect(getCalendarDaysCount(3, 31)).toBe(35);
    });

    it('returns 42 when month needs 6 weeks', () => {
      expect(getCalendarDaysCount(5, 31)).toBe(42);
    });
  });

  describe('getCalendarDays', () => {
    it('returns 35 days for June 2026', () => {
      const result = getCalendarDays(new Date('2026-06-01'), '', '2026-06-01', '2026-06-30');

      expect(result).toHaveLength(35);
    });

    it('starts from Monday for June 2026', () => {
      const result = getCalendarDays(new Date('2026-06-01'), '', '2026-06-01', '2026-06-30');

      expect(result[0]).toMatchObject({
        dateValue: '2026-06-01',
        dayNumber: 1,
        isCurrentMonth: true,
      });
    });

    it('includes previous month days when month does not start on Monday', () => {
      const result = getCalendarDays(new Date('2026-08-01'), '', '2026-08-01', '2026-08-31');

      expect(result[0]).toMatchObject({
        dateValue: '2026-07-27',
        dayNumber: 27,
        isCurrentMonth: false,
      });
    });

    it('marks selected day', () => {
      const result = getCalendarDays(
        new Date('2026-06-01'),
        '2026-06-24',
        '2026-06-01',
        '2026-06-30',
      );

      const selectedDay = result.find((day) => day.dateValue === '2026-06-24');

      expect(selectedDay?.isSelected).toBe(true);
    });

    it('marks days outside min and max as disabled', () => {
      const result = getCalendarDays(new Date('2026-06-01'), '', '2026-06-10', '2026-06-20');

      const beforeMin = result.find((day) => day.dateValue === '2026-06-09');
      const insideRange = result.find((day) => day.dateValue === '2026-06-10');
      const afterMax = result.find((day) => day.dateValue === '2026-06-21');

      expect(beforeMin?.isDisabled).toBe(true);
      expect(insideRange?.isDisabled).toBe(false);
      expect(afterMax?.isDisabled).toBe(true);
    });

    it('marks today', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-06-24T12:00:00'));

      const result = getCalendarDays(new Date('2026-06-01'), '', '2026-06-01', '2026-06-30');
      const today = result.find((day) => day.dateValue === '2026-06-24');

      expect(today?.isToday).toBe(true);

      vi.useRealTimers();
    });
  });

  describe('getInitialMonth', () => {
    it('returns selected date when value is valid', () => {
      const result = getInitialMonth('2026-06-24', '2026-06-01');

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(24);
    });

    it('returns min date when value is empty and min is valid', () => {
      const result = getInitialMonth('', '2026-06-01');

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(1);
    });

    it('returns current date when value and min are invalid', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-06-24T12:00:00'));

      const result = getInitialMonth('', 'invalid-date');

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(24);

      vi.useRealTimers();
    });
  });

  describe('getButtonClassName', () => {
    it('returns default border class when there is no error', () => {
      const result = getButtonClassName(false);

      expect(result).toContain('border-border');
      expect(result).not.toContain('border-error');
    });

    it('returns error classes when there is error', () => {
      const result = getButtonClassName(true);

      expect(result).toContain('border-error');
      expect(result).toContain('focus:border-error');
      expect(result).toContain('focus:ring-error/10');
    });
  });
});
