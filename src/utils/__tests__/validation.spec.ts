import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  MAX_BOOKING_DAYS_AHEAD,
  MAX_GUESTS_COUNT,
  MIN_GUEST_NAME_LENGTH,
  MIN_GUESTS_COUNT,
} from '@/constants/booking';
import {
  validateDate,
  validateGuests,
  validateName,
  validatePhone,
  validateTime,
} from '@/utils/validation';

describe('validation utils', () => {
  describe('validateName', () => {
    it('returns error for empty name', () => {
      expect(validateName('')).toBe('Введите имя гостя');
      expect(validateName('   ')).toBe('Введите имя гостя');
    });

    it('returns error for name shorter than minimum length', () => {
      expect(validateName('А')).toBe(
        `Имя должно содержать минимум ${MIN_GUEST_NAME_LENGTH} символа`,
      );
    });

    it('returns error for name with invalid characters', () => {
      expect(validateName('Иван123')).toBe('Имя может содержать только буквы, пробелы и дефис');

      expect(validateName('Иван_Петров')).toBe('Имя может содержать только буквы, пробелы и дефис');
    });

    it('returns null for valid guest names', () => {
      expect(validateName('Иван')).toBeNull();
      expect(validateName('Анна-Мария')).toBeNull();
      expect(validateName('Иван Петров')).toBeNull();
      expect(validateName('John Smith')).toBeNull();
    });

    it('trims name before validation', () => {
      expect(validateName('  Иван  ')).toBeNull();
    });
  });

  describe('validatePhone', () => {
    it('returns error for empty phone', () => {
      expect(validatePhone('')).toBe('Введите номер телефона');
      expect(validatePhone('   ')).toBe('Введите номер телефона');
    });

    it('returns null for valid Russian phone starting with +7', () => {
      expect(validatePhone('+79991234567')).toBeNull();
      expect(validatePhone('+7 (999) 123-45-67')).toBeNull();
    });

    it('returns null for valid Russian phone starting with 8', () => {
      expect(validatePhone('89991234567')).toBeNull();
      expect(validatePhone('8 (999) 123-45-67')).toBeNull();
    });

    it('normalizes brackets, spaces and dashes before validation', () => {
      expect(validatePhone('+7 (999) 123-45-67')).toBeNull();
    });

    it('returns error for phone with invalid prefix', () => {
      expect(validatePhone('+19991234567')).toBe('Введите корректный номер: +7 или 8, 10 цифр');
    });

    it('returns error for phone with invalid length', () => {
      expect(validatePhone('+7999123456')).toBe('Введите корректный номер: +7 или 8, 10 цифр');

      expect(validatePhone('+799912345678')).toBe('Введите корректный номер: +7 или 8, 10 цифр');
    });
  });

  describe('validateDate', () => {
    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 5, 24, 12, 0, 0));
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('returns error for empty date', () => {
      expect(validateDate('')).toBe('Выберите дату');
    });

    it('returns error for invalid date', () => {
      expect(validateDate('invalid-date')).toBe('Введите корректную дату');
    });

    it('returns null for today date', () => {
      expect(validateDate('2026-06-24')).toBeNull();
    });

    it('returns null for date within allowed range', () => {
      expect(validateDate('2026-07-10')).toBeNull();
    });

    it('returns error for past date', () => {
      expect(validateDate('2026-06-23')).toBe('Дата не может быть раньше сегодняшнего дня');
    });

    it('returns null for max allowed date', () => {
      expect(validateDate('2026-09-22')).toBeNull();
    });

    it('returns error for date later than max allowed date', () => {
      expect(validateDate('2026-09-23')).toBe(
        `Дата не может быть позднее чем через ${MAX_BOOKING_DAYS_AHEAD} дней`,
      );
    });
  });

  describe('validateTime', () => {
    it('returns error for empty time', () => {
      expect(validateTime('')).toBe('Выберите время');
    });

    it('returns null for available time slot', () => {
      expect(validateTime('12:00')).toBeNull();
      expect(validateTime('18:00')).toBeNull();
      expect(validateTime('22:00')).toBeNull();
    });

    it('returns error for unavailable time slot', () => {
      expect(validateTime('11:00')).toBe('Выберите время из доступных слотов');
      expect(validateTime('22:30')).toBe('Выберите время из доступных слотов');
    });
  });

  describe('validateGuests', () => {
    it('returns error for empty guests value', () => {
      expect(validateGuests('')).toBe('Укажите количество гостей');
    });

    it('returns error for non-number value', () => {
      expect(validateGuests('abc')).toBe('Количество гостей должно быть числом');
    });

    it('returns error for non-integer value', () => {
      expect(validateGuests(2.5)).toBe('Количество гостей должно быть целым числом');
      expect(validateGuests('3.5')).toBe('Количество гостей должно быть целым числом');
    });

    it('returns error for value lower than minimum guests count', () => {
      expect(validateGuests(0)).toBe(`Минимальное количество гостей — ${MIN_GUESTS_COUNT}`);
    });

    it('returns error for value greater than maximum guests count', () => {
      expect(validateGuests(13)).toBe(`Максимальное количество гостей — ${MAX_GUESTS_COUNT}`);
    });

    it('returns null for valid guests count', () => {
      expect(validateGuests(1)).toBeNull();
      expect(validateGuests(6)).toBeNull();
      expect(validateGuests(12)).toBeNull();
    });

    it('supports numeric string values', () => {
      expect(validateGuests('1')).toBeNull();
      expect(validateGuests('12')).toBeNull();
    });
  });
});
