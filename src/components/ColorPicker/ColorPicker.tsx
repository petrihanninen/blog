'use client'

import type { KeyboardEvent, PointerEvent } from 'react';
import { useState, useSyncExternalStore } from 'react';

import {
  getServerSnapshot,
  getSnapshot,
  hexToHsv,
  hsvToHex,
  presets,
  setColor,
  subscribe,
} from './color';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const arrowMoves: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, 1],
  ArrowDown: [0, -1],
};

export const ColorPicker = () => {
  const { hex, hue } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const { s, v } = hexToHsv(hex);
  const isPreset = presets.some(preset => preset.hex === hex);

  const pick = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextS = clamp((event.clientX - rect.left) / rect.width);
    const nextV = 1 - clamp((event.clientY - rect.top) / rect.height);
    setColor(hsvToHex(hue, nextS, nextV), hue);
  };

  const nudge = (event: KeyboardEvent<HTMLDivElement>) => {
    const move = arrowMoves[event.key];
    if (!move) return;
    event.preventDefault();
    const step = event.shiftKey ? 0.1 : 0.02;
    setColor(hsvToHex(hue, clamp(s + move[0] * step), clamp(v + move[1] * step)), hue);
  };

  return (
    <div className="color-picker">
      <span className="color-picker-label" id="color-picker-label">
        Pick a color
      </span>

      <div className="swatches" role="group" aria-labelledby="color-picker-label">
        {presets.map(preset => (
          <button
            key={preset.hex}
            type="button"
            className="swatch"
            style={{ background: preset.hex }}
            aria-label={preset.name}
            aria-pressed={hex === preset.hex}
            onClick={() => setColor(preset.hex)}
          />
        ))}
        <button
          type="button"
          className="swatch swatch-custom"
          style={isPreset ? undefined : { background: hex }}
          data-selected={!isPreset}
          aria-label="Custom color"
          aria-expanded={open}
          aria-controls="custom-color"
          onClick={() => setOpen(!open)}
        />
      </div>

      {open && (
        <div className="custom-color" id="custom-color">
          <div
            className="sv-area"
            role="slider"
            tabIndex={0}
            aria-label="Saturation and brightness"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(s * 100)}
            aria-valuetext={`saturation ${Math.round(s * 100)}%, brightness ${Math.round(v * 100)}%`}
            style={{ backgroundColor: `hsl(${hue} 100% 50%)` }}
            onPointerDown={event => {
              event.currentTarget.setPointerCapture(event.pointerId);
              pick(event);
            }}
            onPointerMove={event => {
              if (event.buttons) pick(event);
            }}
            onKeyDown={nudge}
          >
            <span className="sv-thumb" style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%` }} />
          </div>

          <input
            type="range"
            className="hue"
            min={0}
            max={360}
            value={Math.round(hue)}
            aria-label="Hue"
            onChange={event => {
              const nextHue = Number(event.target.value);
              setColor(hsvToHex(nextHue, s, v), nextHue);
            }}
          />

          <output className="hex">{hex}</output>
        </div>
      )}
    </div>
  );
};
