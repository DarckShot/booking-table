'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BookingForm from '@/components/BookingForm/BookingForm';
import ConfirmationScreen from '@/components/ConfirmationScreen/ConfirmationScreen';
import { Badge } from '@/shared/ui/Badge';
import type { BookingFormData } from '@/types/booking';

const HomePage = () => {
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  const handleBookingSuccess = (data: BookingFormData) => {
    setBookingData(data);
  };

  const handleResetBooking = () => {
    setBookingData(null);
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(430px,0.95fr)] lg:items-center">
      <div className="max-w-3xl">
        <Badge>Онлайн-бронирование</Badge>

        <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-foreground sm:text-6xl lg:text-[4.75rem]">
          Забронируйте столик в SAVEUR
        </h1>

        <p className="mt-7 max-w-2xl text-xl leading-8 text-muted">
          Выберите удобную дату, время и количество гостей. Мы подтвердим бронь и подготовим столик
          к вашему визиту.
        </p>

        <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface/75 p-5 shadow-sm">
            <p className="text-2xl font-semibold leading-tight text-foreground">12:00–22:00</p>
            <p className="mt-2 text-base text-muted">доступные слоты</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface/75 p-5 shadow-sm">
            <p className="text-2xl font-semibold leading-tight text-foreground">1–12</p>
            <p className="mt-2 text-base text-muted">гостей</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface/75 p-5 shadow-sm">
            <p className="text-2xl font-semibold leading-tight text-foreground">+90 дней</p>
            <p className="mt-2 text-base text-muted">для выбора даты</p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-border bg-surface p-5 shadow-xl shadow-black/5">
        <AnimatePresence mode="wait">
          {bookingData ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ConfirmationScreen bookingData={bookingData} onReset={handleResetBooking} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <BookingForm onSuccess={handleBookingSuccess} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomePage;
