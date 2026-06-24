'use client';

import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { BookingFormField } from '../BookingFormField';
import { validateDate } from '@/utils/validation';
import type { BookingFormValues } from '../types';

interface DateFieldProps {
  control: Control<BookingFormValues>;
  isSubmitting: boolean;
  error?: string;
  min: string;
  max: string;
}

export const DateField = ({ control, isSubmitting, error, min, max }: DateFieldProps) => {
  return (
    <BookingFormField error={error} errorId="date-error" htmlFor="date" label="Дата">
      <Controller
        control={control}
        name="date"
        rules={{
          validate: (value) => validateDate(value) ?? true,
        }}
        render={({ field }) => (
          <DatePicker
            disabled={isSubmitting}
            error={Boolean(error)}
            errorId={error ? 'date-error' : undefined}
            id="date"
            max={max}
            min={min}
            placeholder="Выберите дату"
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
    </BookingFormField>
  );
};
