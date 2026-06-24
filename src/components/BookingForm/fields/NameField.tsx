'use client';

import type { UseFormRegister } from 'react-hook-form';
import { BookingFormField, getBookingInputClassName } from '../BookingFormField';
import { validateName } from '@/utils/validation';
import type { BookingFormValues } from '../types';

interface NameFieldProps {
  isSubmitting: boolean;
  error?: string;
  register: UseFormRegister<BookingFormValues>;
}

export const NameField = ({ isSubmitting, error, register }: NameFieldProps) => {
  return (
    <BookingFormField error={error} errorId="name-error" htmlFor="name" label="Имя гостя">
      <input
        {...register('name', {
          validate: (value) => validateName(value) ?? true,
        })}
        aria-describedby={error ? 'name-error' : undefined}
        aria-invalid={Boolean(error)}
        className={getBookingInputClassName(Boolean(error))}
        disabled={isSubmitting}
        id="name"
        placeholder="Иван Петров"
        type="text"
      />
    </BookingFormField>
  );
};
