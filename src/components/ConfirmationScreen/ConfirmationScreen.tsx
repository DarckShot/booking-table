import { Button } from '@/shared/ui/Button';
import { CheckIcon } from '@/shared/icons/CheckIcon';
import { getBookingDetails } from './utils';
import { BookingFormData } from '@/types/booking';

interface ConfirmationScreenProps {
  bookingData: BookingFormData;
  onReset: () => void;
}

const ConfirmationScreen = ({ bookingData, onReset }: ConfirmationScreenProps) => {
  const bookingDetails = getBookingDetails(bookingData);

  return (
    <div className="flex min-h-[520px] flex-col justify-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent">
        <CheckIcon className="size-8" />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-accent">Бронь оформлена</p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
          Ждём вас в SAVEUR
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">
          Мы сохранили детали бронирования. Проверьте информацию перед визитом.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-background p-4">
        <dl className="space-y-3">
          {bookingDetails.map((item) => (
            <div
              className="flex items-start justify-between gap-4 rounded-2xl bg-surface px-4 py-3"
              key={item.label}
            >
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Button className="mt-8" onClick={onReset} variant="secondary">
        Забронировать ещё
      </Button>
    </div>
  );
};

export default ConfirmationScreen;
