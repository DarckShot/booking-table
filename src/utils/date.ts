import { MAX_BOOKING_DAYS_AHEAD } from '@/constants/booking';

export const getDateInputValue = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - timezoneOffset).toISOString().split('T')[0];
};

export const getMaxBookingDate = () => {
  const date = new Date();

  date.setDate(date.getDate() + MAX_BOOKING_DAYS_AHEAD);

  return date;
};

export const formatBookingDate = (value: string) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
};
