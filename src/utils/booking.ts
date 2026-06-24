import { BOOKING_TIME_SLOTS } from '@/constants/booking';
import type { BookingTimeSlot } from '@/types/booking';

export const isBookingTimeSlot = (value: string): value is BookingTimeSlot => {
  return BOOKING_TIME_SLOTS.includes(value as BookingTimeSlot);
};
