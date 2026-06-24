'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { BOOKING_TIME_SLOTS, MAX_GUESTS_COUNT, MIN_GUESTS_COUNT } from '@/constants/booking';
import { Button } from '@/shared/ui/Button';
import type { BookingFormData } from '@/types/booking';
import { getDateInputValue, getMaxBookingDate } from '@/utils/date';
import { bookingFormDefaultValues } from './constants';
import type { BookingFormValues } from './types';
import { normalizeBookingFormData, simulateBookingRequest } from './utils';
import { DateField, GuestsField, NameField, PhoneField, TimeField } from './fields';

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

      <NameField isSubmitting={isSubmitting} error={errors.name?.message} register={register} />

      <PhoneField isSubmitting={isSubmitting} error={errors.phone?.message} register={register} />

      <div className="grid gap-5 sm:grid-cols-2">
        <DateField
          control={control}
          isSubmitting={isSubmitting}
          error={errors.date?.message}
          min={today}
          max={maxDate}
        />

        <TimeField
          control={control}
          isSubmitting={isSubmitting}
          error={errors.time?.message}
          options={bookingTimeOptions}
        />
      </div>

      <GuestsField
        isSubmitting={isSubmitting}
        error={errors.guests?.message}
        register={register}
        min={MIN_GUESTS_COUNT}
        max={MAX_GUESTS_COUNT}
      />

      <Button isLoading={isSubmitting} type="submit">
        {isSubmitting ? 'Бронирую...' : 'Забронировать столик'}
      </Button>
    </form>
  );
};

export default BookingForm;
