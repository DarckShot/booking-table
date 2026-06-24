import {
  GUEST_NAME_REGEX,
  MAX_BOOKING_DAYS_AHEAD,
  MAX_GUESTS_COUNT,
  MIN_GUEST_NAME_LENGTH,
  MIN_GUESTS_COUNT,
} from '@/constants/booking';
import { isBookingTimeSlot } from '@/utils/booking';

export const validateName = (value: string): string | null => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'Введите имя гостя';
  }

  if (trimmedValue.length < MIN_GUEST_NAME_LENGTH) {
    return `Имя должно содержать минимум ${MIN_GUEST_NAME_LENGTH} символа`;
  }

  if (!GUEST_NAME_REGEX.test(trimmedValue)) {
    return 'Имя может содержать только буквы, пробелы и дефис';
  }

  return null;
};

export const validatePhone = (value: string): string | null => {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return 'Введите номер телефона';
  }

  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return null;
  }

  return 'Введите корректный номер: +7 или 8, 10 цифр';
};

export const validateDate = (value: string): string | null => {
  if (!value) {
    return 'Выберите дату';
  }

  const selectedDate = new Date(value);
  const today = new Date();
  const maxDate = new Date();

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  maxDate.setHours(0, 0, 0, 0);
  maxDate.setDate(today.getDate() + MAX_BOOKING_DAYS_AHEAD);

  if (Number.isNaN(selectedDate.getTime())) {
    return 'Введите корректную дату';
  }

  if (selectedDate < today) {
    return 'Дата не может быть раньше сегодняшнего дня';
  }

  if (selectedDate > maxDate) {
    return `Дата не может быть позднее чем через ${MAX_BOOKING_DAYS_AHEAD} дней`;
  }

  return null;
};

export const validateTime = (value: string): string | null => {
  if (!value) {
    return 'Выберите время';
  }

  if (!isBookingTimeSlot(value)) {
    return 'Выберите время из доступных слотов';
  }

  return null;
};

export const validateGuests = (value: number | string): string | null => {
  if (value === '' || value === null || value === undefined) {
    return 'Укажите количество гостей';
  }

  const guests = Number(value);

  if (Number.isNaN(guests)) {
    return 'Количество гостей должно быть числом';
  }

  if (!Number.isInteger(guests)) {
    return 'Количество гостей должно быть целым числом';
  }

  if (guests < MIN_GUESTS_COUNT) {
    return `Минимальное количество гостей — ${MIN_GUESTS_COUNT}`;
  }

  if (guests > MAX_GUESTS_COUNT) {
    return `Максимальное количество гостей — ${MAX_GUESTS_COUNT}`;
  }

  return null;
};
