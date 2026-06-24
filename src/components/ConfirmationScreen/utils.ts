import { formatBookingDate } from '@/utils/date';
import type { BookingFormData } from '@/types/booking';
import type { ConfirmationDetail } from './types';

export const getBookingDetails = (bookingData: BookingFormData): ConfirmationDetail[] => {
  return [
    {
      label: 'Имя гостя',
      value: bookingData.name,
    },
    {
      label: 'Дата',
      value: formatBookingDate(bookingData.date),
    },
    {
      label: 'Время',
      value: bookingData.time,
    },
    {
      label: 'Количество гостей',
      value: bookingData.guests.toString(),
    },
  ];
};
