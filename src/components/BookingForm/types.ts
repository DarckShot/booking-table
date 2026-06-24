import type { BookingFormData } from '@/types/booking';

export type BookingFormValues = Omit<BookingFormData, 'guests'> & {
  guests: string;
};
