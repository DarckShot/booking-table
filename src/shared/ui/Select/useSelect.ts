import { useState } from 'react';
import { useClickOutside } from '@/shared/hooks';
import type { SelectOption } from './types';

interface UseSelectParams {
  disabled: boolean;
  onBlur?: () => void;
  onChange: (value: string) => void;
  options?: SelectOption[];
}

export const useSelect = ({ disabled, onBlur, onChange, options = [] }: UseSelectParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleClose = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
    onBlur?.();
  };

  const containerRef = useClickOutside({ onClose: handleClose, disabled: !isOpen });

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    setIsOpen((currentValue) => {
      if (!currentValue) {
        setHighlightedIndex(0);
      }
      return !currentValue;
    });
  };

  const handleOptionSelect = (nextValue: string) => {
    onChange(nextValue);
    handleClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          handleToggle();
        } else if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleOptionSelect(options[highlightedIndex].value);
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          handleToggle();
        } else {
          setHighlightedIndex((prev) => (prev + 1) % options.length);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          handleToggle();
        } else {
          setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
        break;

      case 'Escape':
        event.preventDefault();
        handleClose();
        break;

      case 'Tab':
        handleClose();
        break;
    }
  };

  return {
    containerRef,
    highlightedIndex,
    isOpen,
    handleKeyDown,
    handleOptionSelect,
    handleToggle,
  };
};
