import type { BOOKING_TIME_SLOTS } from '@/constants/booking';

export type BookingTimeSlot = (typeof BOOKING_TIME_SLOTS)[number];

export interface BookingFormData {
  name: string;
  phone: string;
  date: string;
  time: BookingTimeSlot | '';
  guests: number;
}

export type BookingStatus = 'idle' | 'loading' | 'success';
