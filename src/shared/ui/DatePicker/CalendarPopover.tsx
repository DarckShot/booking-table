import { WEEK_DAYS } from './constants';
import { CalendarDayButton } from './CalendarDayButton';
import type { CalendarDay } from './types';
import { getMonthTitle } from './utils';

interface CalendarPopoverProps {
  calendarDays: CalendarDay[];
  currentMonth: Date;
  dialogId: string;
  onDateSelect: (day: CalendarDay) => void;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
}

export const CalendarPopover = ({
  calendarDays,
  currentMonth,
  dialogId,
  onDateSelect,
  onNextMonth,
  onPreviousMonth,
}: CalendarPopoverProps) => {
  return (
    <div
      className="absolute left-0 right-0 z-30 mt-1.5 rounded-xl border border-border bg-surface p-2 shadow-xl shadow-black/10"
      id={dialogId}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <button
          aria-label="Предыдущий месяц"
          className="flex size-6 items-center justify-center rounded-full border border-border text-xs text-muted transition hover:border-accent hover:text-accent"
          onClick={onPreviousMonth}
          type="button"
        >
          ‹
        </button>

        <p className="text-xs font-semibold capitalize text-foreground">
          {getMonthTitle(currentMonth)}
        </p>

        <button
          aria-label="Следующий месяц"
          className="flex size-6 items-center justify-center rounded-full border border-border text-xs text-muted transition hover:border-accent hover:text-accent"
          onClick={onNextMonth}
          type="button"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px text-center">
        {WEEK_DAYS.map((day) => (
          <div className="py-px text-[10px] font-medium text-muted" key={day}>
            {day}
          </div>
        ))}

        {calendarDays.map((day) => (
          <CalendarDayButton day={day} key={day.dateValue} onSelect={onDateSelect} />
        ))}
      </div>
    </div>
  );
};
