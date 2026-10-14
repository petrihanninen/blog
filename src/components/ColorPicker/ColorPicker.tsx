'use client'

import { useEffect, useRef } from 'react';

import { applyColor, defaultBg, readStoredColor, storeColor } from './color';

export const ColorPicker = () => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = readStoredColor();
    if (stored && input.current) input.current.value = stored;
  }, []);

  return (
    <label className="color-picker">
      <input
        ref={input}
        type="color"
        defaultValue={defaultBg}
        onChange={event => {
          applyColor(event.target.value);
          storeColor(event.target.value);
        }}
      />
      Pick a color
    </label>
  );
};
