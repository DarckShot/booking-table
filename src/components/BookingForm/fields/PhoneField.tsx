'use client';

import type { UseFormRegister } from 'react-hook-form';
import { BookingFormField, getBookingInputClassName } from '../BookingFormField';
import { validatePhone } from '@/utils/validation';
import type { BookingFormValues } from '../types';

interface PhoneFieldProps {
  isSubmitting: boolean;
  error?: string;
  register: UseFormRegister<BookingFormValues>;
}

export const PhoneField = ({ isSubmitting, error, register }: PhoneFieldProps) => {
  return (
    <BookingFormField error={error} errorId="phone-error" htmlFor="phone" label="Телефон">
      <input
        {...register('phone', {
          validate: (value) => validatePhone(value) ?? true,
        })}
        aria-describedby={error ? 'phone-error' : undefined}
        aria-invalid={Boolean(error)}
        className={getBookingInputClassName(Boolean(error))}
        disabled={isSubmitting}
        id="phone"
        inputMode="tel"
        placeholder="+7 (999) 123-45-67"
        type="tel"
      />
    </BookingFormField>
  );
};
