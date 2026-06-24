import { BOOKING_SUBMIT_DELAY } from './constants';
import type { BookingFormData } from '@/types/booking';
import type { BookingFormValues } from './types';

export const simulateBookingRequest = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, BOOKING_SUBMIT_DELAY);
  });
};

export const normalizeBookingFormData = (values: BookingFormValues): BookingFormData => {
  return {
    ...values,
    name: values.name.trim(),
    phone: values.phone.trim(),
    guests: Number(values.guests),
  };
};
