import { useEffect, useRef, useState } from 'react';

interface UseSelectParams {
  disabled: boolean;
  onBlur?: () => void;
  onChange: (value: string) => void;
}

export const useSelect = ({ disabled, onBlur, onChange }: UseSelectParams) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onBlur?.();
  };

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    setIsOpen((currentValue) => !currentValue);
  };

  const handleOptionSelect = (nextValue: string) => {
    onChange(nextValue);
    handleClose();
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    containerRef,
    isOpen,
    handleOptionSelect,
    handleToggle,
  };
};
