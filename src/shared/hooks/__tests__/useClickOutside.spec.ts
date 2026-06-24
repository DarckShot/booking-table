import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a ref', () => {
    const { result } = renderHook(() => useClickOutside({ onClose: vi.fn() }));

    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('calls onClose when clicking outside the element', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useClickOutside({ onClose }));

    const div = document.createElement('div');
    document.body.appendChild(div);
    result.current.current = div;

    act(() => {
      document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the element', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useClickOutside({ onClose }));

    const div = document.createElement('div');
    document.body.appendChild(div);
    result.current.current = div;

    act(() => {
      div.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useClickOutside({ onClose }));

    const div = document.createElement('div');
    document.body.appendChild(div);
    result.current.current = div;

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when pressing other keys', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useClickOutside({ onClose }));

    const div = document.createElement('div');
    document.body.appendChild(div);
    result.current.current = div;

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not add event listeners when disabled', () => {
    const onClose = vi.fn();
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

    renderHook(() => useClickOutside({ onClose, disabled: true }));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('cleans up event listeners on unmount', () => {
    const onClose = vi.fn();
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useClickOutside({ onClose }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
