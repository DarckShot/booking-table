'use client';

import type { UseFormRegister } from 'react-hook-form';
import { BookingFormField, getBookingInputClassName } from '../BookingFormField';
import { validateGuests } from '@/utils/validation';
import type { BookingFormValues } from '../types';

interface GuestsFieldProps {
  isSubmitting: boolean;
  error?: string;
  register: UseFormRegister<BookingFormValues>;
  min: number;
  max: number;
}

export const GuestsField = ({ isSubmitting, error, register, min, max }: GuestsFieldProps) => {
  return (
    <BookingFormField
      error={error}
      errorId="guests-error"
      htmlFor="guests"
      label="Количество гостей"
    >
      <input
        {...register('guests', {
          validate: (value) => validateGuests(value) ?? true,
        })}
        aria-describedby={error ? 'guests-error' : undefined}
        aria-invalid={Boolean(error)}
        className={getBookingInputClassName(Boolean(error))}
        disabled={isSubmitting}
        id="guests"
        inputMode="numeric"
        max={max}
        min={min}
        placeholder="2"
        step={1}
        type="number"
      />
    </BookingFormField>
  );
};
