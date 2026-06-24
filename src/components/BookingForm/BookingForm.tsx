'use client';

import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BOOKING_TIME_SLOTS, MAX_GUESTS_COUNT, MIN_GUESTS_COUNT } from '@/constants/booking';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { Select } from '@/shared/ui/Select/Select';
import type { BookingFormData } from '@/types/booking';
import { getDateInputValue, getMaxBookingDate } from '@/utils/date';
import {
  validateDate,
  validateGuests,
  validateName,
  validatePhone,
  validateTime,
} from '@/utils/validation';
import { BookingFormField, getBookingInputClassName } from './BookingFormField';
import { bookingFormDefaultValues } from './constants';
import type { BookingFormValues } from './types';
import { normalizeBookingFormData, simulateBookingRequest } from './utils';

interface BookingFormProps {
  onSuccess: (data: BookingFormData) => void;
}

const bookingTimeOptions = BOOKING_TIME_SLOTS.map((slot) => ({
  label: slot,
  value: slot,
}));

const BookingForm = ({ onSuccess }: BookingFormProps) => {
  const today = useMemo(() => getDateInputValue(new Date()), []);
  const maxDate = useMemo(() => getDateInputValue(getMaxBookingDate()), []);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<BookingFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: bookingFormDefaultValues,
  });

  const handleBookingSubmit = async (values: BookingFormValues) => {
    await simulateBookingRequest();

    onSuccess(normalizeBookingFormData(values));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleBookingSubmit)} noValidate>
      <div>
        <p className="text-sm font-medium text-accent">Бронирование</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
          Детали визита
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Заполните форму, чтобы выбрать удобное время для визита в SAVEUR.
        </p>
      </div>

      <BookingFormField
        error={errors.name?.message}
        errorId="name-error"
        htmlFor="name"
        label="Имя гостя"
      >
        <input
          {...register('name', {
            validate: (value) => validateName(value) ?? true,
          })}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
          className={getBookingInputClassName(Boolean(errors.name))}
          disabled={isSubmitting}
          id="name"
          placeholder="Иван Петров"
          type="text"
        />
      </BookingFormField>

      <BookingFormField
        error={errors.phone?.message}
        errorId="phone-error"
        htmlFor="phone"
        label="Телефон"
      >
        <input
          {...register('phone', {
            validate: (value) => validatePhone(value) ?? true,
          })}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={Boolean(errors.phone)}
          className={getBookingInputClassName(Boolean(errors.phone))}
          disabled={isSubmitting}
          id="phone"
          inputMode="tel"
          placeholder="+7 (999) 123-45-67"
          type="tel"
        />
      </BookingFormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <BookingFormField
          error={errors.date?.message}
          errorId="date-error"
          htmlFor="date"
          label="Дата"
        >
          <Controller
            control={control}
            name="date"
            rules={{
              validate: (value) => validateDate(value) ?? true,
            }}
            render={({ field }) => (
              <DatePicker
                disabled={isSubmitting}
                error={Boolean(errors.date)}
                errorId={errors.date ? 'date-error' : undefined}
                id="date"
                max={maxDate}
                min={today}
                placeholder="Выберите дату"
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
            )}
          />
        </BookingFormField>

        <BookingFormField
          error={errors.time?.message}
          errorId="time-error"
          htmlFor="time"
          label="Время"
        >
          <Controller
            control={control}
            name="time"
            rules={{
              validate: (value) => validateTime(value) ?? true,
            }}
            render={({ field }) => (
              <Select
                disabled={isSubmitting}
                error={Boolean(errors.time)}
                errorId={errors.time ? 'time-error' : undefined}
                id="time"
                options={bookingTimeOptions}
                placeholder="Выберите время"
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
            )}
          />
        </BookingFormField>
      </div>

      <BookingFormField
        error={errors.guests?.message}
        errorId="guests-error"
        htmlFor="guests"
        label="Количество гостей"
      >
        <input
          {...register('guests', {
            validate: (value) => validateGuests(value) ?? true,
          })}
          aria-describedby={errors.guests ? 'guests-error' : undefined}
          aria-invalid={Boolean(errors.guests)}
          className={getBookingInputClassName(Boolean(errors.guests))}
          disabled={isSubmitting}
          id="guests"
          inputMode="numeric"
          max={MAX_GUESTS_COUNT}
          min={MIN_GUESTS_COUNT}
          placeholder="2"
          step={1}
          type="number"
        />
      </BookingFormField>

      <Button isLoading={isSubmitting} type="submit">
        {isSubmitting ? 'Бронирую...' : 'Забронировать столик'}
      </Button>
    </form>
  );
};

export default BookingForm;
