import type { CalendarDay } from './types';

interface CalendarDayButtonProps {
  day: CalendarDay;
  onSelect: (day: CalendarDay) => void;
}

export const CalendarDayButton = ({ day, onSelect }: CalendarDayButtonProps) => {
  return (
    <button
      className={`flex h-6 items-center justify-center rounded-md text-[11px] leading-none transition 
        ${day.isSelected ? 'bg-accent text-white' : 'text-foreground hover:bg-background'} 
        ${!day.isCurrentMonth ? 'text-muted/30' : ''} 
        ${day.isToday && !day.isSelected ? 'border border-accent/35' : ''} 
        ${day.isDisabled ? 'cursor-not-allowed text-muted/20 hover:bg-transparent' : ''}`}
      disabled={day.isDisabled}
      onClick={() => onSelect(day)}
      type="button"
    >
      {day.dayNumber}
    </button>
  );
};
