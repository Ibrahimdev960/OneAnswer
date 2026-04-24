'use client';
import { useState } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('temperature-converter')!;

function toCelsius(val: number, from: string): number {
  if (from === 'c') return val;
  if (from === 'f') return (val - 32) * 5 / 9;
  return val - 273.15;
}

function fromCelsius(celsius: number, to: string): number {
  if (to === 'c') return celsius;
  if (to === 'f') return (celsius * 9 / 5) + 32;
  return celsius + 273.15;
}

function TemperatureTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('c');
  const units = [
    { key: 'c', label: '°C', name: 'Celsius' },
    { key: 'f', label: '°F', name: 'Fahrenheit' },
    { key: 'k', label: 'K', name: 'Kelvin' },
  ];
  const numVal = parseFloat(value);
  const valid = !isNaN(numVal);
  const celsius = valid ? toCelsius(numVal, from) : null;

  const descriptions: Record<number, string> = {};
  if (celsius !== null) {
    if (celsius <= 0) descriptions[celsius] = '❄️ Freezing';
    else if (celsius <= 15) descriptions[celsius] = '🥶 Cold';
    else if (celsius <= 25) descriptions[celsius] = '😊 Comfortable';
    else if (celsius <= 35) descriptions[celsius] = '☀️ Warm';
    else descriptions[celsius] = '🔥 Hot';
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Temperature</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter temperature" className="input-field" step="any" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-field">
            {units.map((u) => <option key={u.key} value={u.key}>{u.name} ({u.label})</option>)}
          </select>
        </div>
      </div>

      {celsius !== null && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {units.map((u) => {
              const converted = fromCelsius(celsius, u.key);
              const isFrom = u.key === from;
              return (
                <div key={u.key} className={`rounded-xl p-4 text-center ${isFrom ? 'result-box' : 'bg-slate-50 dark:bg-slate-800'}`}>
                  <p className={`text-2xl font-bold ${isFrom ? 'text-sky-500' : 'text-slate-800 dark:text-slate-200'}`}>
                    {converted.toFixed(2)}{u.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{u.name}</p>
                </div>
              );
            })}
          </div>
          {celsius !== null && (
            <p className="text-center text-slate-500 text-sm">
              {celsius <= 0 ? '❄️ Freezing' : celsius <= 15 ? '🥶 Cold' : celsius <= 25 ? '😊 Comfortable' : celsius <= 35 ? '☀️ Warm' : '🔥 Hot'}
            </p>
          )}
        </div>
      )}

      {/* Common references */}
      <div>
        <p className="text-xs text-slate-400 mb-2">Common references:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Boiling point of water', c: 100 },
            { label: 'Body temperature', c: 37 },
            { label: 'Room temperature', c: 22 },
            { label: 'Freezing point of water', c: 0 },
          ].map(({ label, c }) => (
            <div key={label} className="text-xs bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
              <p className="text-slate-500">{label}</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">{c}°C = {fromCelsius(c, 'f').toFixed(1)}°F = {fromCelsius(c, 'k').toFixed(2)}K</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const faqs = [
  { q: 'How do I convert Celsius to Fahrenheit?', a: 'Multiply by 9/5, then add 32. Example: 100°C × 9/5 + 32 = 212°F.' },
  { q: 'What is absolute zero in Celsius?', a: 'Absolute zero is −273.15°C (0 Kelvin), the theoretically lowest possible temperature.' },
  { q: 'What is normal human body temperature in Fahrenheit?', a: 'Normal body temperature is 98.6°F (37°C or 310.15 K).' },
];

export default function TemperatureConverterPage() {
  return (
    <ToolWrapper tool={tool} faqs={faqs} explanation="Convert temperature between Celsius, Fahrenheit, and Kelvin instantly. Includes common reference temperatures and a comfort indicator.">
      <TemperatureTool />
    </ToolWrapper>
  );
}
