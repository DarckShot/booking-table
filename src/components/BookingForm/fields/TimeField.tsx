'use client';

import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Select } from '@/shared/ui/Select/Select';
import type { SelectOption } from '@/shared/ui/Select/types';
import { BookingFormField } from '../BookingFormField';
import { validateTime } from '@/utils/validation';
import type { BookingFormValues } from '../types';

interface TimeFieldProps {
  control: Control<BookingFormValues>;
  isSubmitting: boolean;
  error?: string;
  options: SelectOption[];
}

export const TimeField = ({ control, isSubmitting, error, options }: TimeFieldProps) => {
  return (
    <BookingFormField error={error} errorId="time-error" htmlFor="time" label="Время">
      <Controller
        control={control}
        name="time"
        rules={{
          validate: (value) => validateTime(value) ?? true,
        }}
        render={({ field }) => (
          <Select
            disabled={isSubmitting}
            error={Boolean(error)}
            errorId={error ? 'time-error' : undefined}
            id="time"
            options={options}
            placeholder="Выберите время"
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
    </BookingFormField>
  );
};
