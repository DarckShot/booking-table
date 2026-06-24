import type { BookingFormValues } from './types';

export const BOOKING_SUBMIT_DELAY = 1500;

export const bookingFormDefaultValues: BookingFormValues = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
};
