'use client';
import { useState } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('weight-converter')!;

const UNITS = [
  { key: 'kg', label: 'Kilograms (kg)', toKg: 1 },
  { key: 'lbs', label: 'Pounds (lbs)', toKg: 0.453592 },
  { key: 'g', label: 'Grams (g)', toKg: 0.001 },
  { key: 'oz', label: 'Ounces (oz)', toKg: 0.0283495 },
  { key: 'stone', label: 'Stone (st)', toKg: 6.35029 },
  { key: 'mt', label: 'Metric Tons (mt)', toKg: 1000 },
];

function WeightTool() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('kg');

  const numVal = parseFloat(value);
  const valid = !isNaN(numVal) && numVal >= 0;
  const fromUnit = UNITS.find((u) => u.key === from)!;
  const inKg = valid ? numVal * fromUnit.toKg : null;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Value</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" className="input-field" min="0" step="any" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">From Unit</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-field">
            {UNITS.map((u) => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {inKg !== null && (
        <div className="grid grid-cols-2 gap-3">
          {UNITS.filter((u) => u.key !== from).map((u) => (
            <div key={u.key} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <p className="text-xl font-bold text-sky-500">
                {(inKg / u.toKg).toLocaleString('en-US', { maximumFractionDigits: 6 })}
              </p>
              <p className="text-xs text-slate-500 mt-1">{u.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const faqs = [
  { q: 'How many pounds in a kilogram?', a: '1 kilogram equals 2.20462 pounds.' },
  { q: 'How many kg in a stone?', a: '1 stone equals 6.35029 kilograms.' },
  { q: 'How do I convert ounces to grams?', a: 'Multiply the number of ounces by 28.3495 to get grams. For example, 8 oz = 226.8 grams.' },
];

export default function WeightConverterPage() {
  return (
    <ToolWrapper tool={tool} faqs={faqs} explanation="Convert weight between kilograms, pounds, grams, ounces, stone, and metric tons instantly. All results update as you type.">
      <WeightTool />
    </ToolWrapper>
  );
}
