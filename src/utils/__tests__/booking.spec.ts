import { describe, expect, it } from 'vitest';
import { BOOKING_TIME_SLOTS } from '@/constants/booking';
import { isBookingTimeSlot } from '@/utils/booking';

describe('isBookingTimeSlot', () => {
  it('returns true for all available booking time slots', () => {
    BOOKING_TIME_SLOTS.forEach((slot) => {
      expect(isBookingTimeSlot(slot)).toBe(true);
    });
  });

  it('returns false for time outside available slots', () => {
    expect(isBookingTimeSlot('11:00')).toBe(false);
    expect(isBookingTimeSlot('22:30')).toBe(false);
    expect(isBookingTimeSlot('23:00')).toBe(false);
  });

  it('returns false for invalid string values', () => {
    expect(isBookingTimeSlot('')).toBe(false);
    expect(isBookingTimeSlot('invalid')).toBe(false);
    expect(isBookingTimeSlot('12')).toBe(false);
  });
});
