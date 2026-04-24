'use client';
import { useState } from 'react';
import { ToolWrapper } from '@/components/tools/ToolWrapper';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('percentage-calculator')!;

type Mode = 'percent-of' | 'what-percent' | 'percent-change';

function PercentageTool() {
  const [mode, setMode] = useState<Mode>('percent-of');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const na = parseFloat(a), nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb)) { setResult('Please enter valid numbers.'); return; }
    if (mode === 'percent-of') setResult(`${na}% of ${nb} = ${((na / 100) * nb).toFixed(4).replace(/\.?0+$/, '')}`);
    else if (mode === 'what-percent') setResult(`${na} is ${((na / nb) * 100).toFixed(4).replace(/\.?0+$/, '')}% of ${nb}`);
    else {
      const change = ((nb - na) / Math.abs(na)) * 100;
      setResult(`${change >= 0 ? '+' : ''}${change.toFixed(2)}% ${change >= 0 ? 'increase' : 'decrease'} from ${na} to ${nb}`);
    }
  };

  const MODES: { key: Mode; label: string; aLabel: string; bLabel: string; example: string }[] = [
    { key: 'percent-of', label: 'What is X% of Y?', aLabel: 'Percentage (%)', bLabel: 'Of number', example: '20% of 500 = 100' },
    { key: 'what-percent', label: 'X is what % of Y?', aLabel: 'Number', bLabel: 'Of number', example: '50 is what % of 200?' },
    { key: 'percent-change', label: 'Percentage change', aLabel: 'Original value', bLabel: 'New value', example: 'From 80 to 100 = +25%' },
  ];

  const current = MODES.find((m) => m.key === mode)!;

  return (
    <div className="space-y-5">
      {/* Mode tabs */}
      <div className="flex flex-col gap-2">
        {MODES.map((m) => (
          <button key={m.key} onClick={() => { setMode(m.key); setResult(null); }}
            className={`text-left px-4 py-3 rounded-xl border transition-all text-sm ${mode === m.key ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 font-medium' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'}`}>
            <span className="font-medium">{m.label}</span>
            <span className="text-xs text-slate-400 ml-2">e.g. {m.example}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{current.aLabel}</label>
          <input type="number" value={a} onChange={(e) => { setA(e.target.value); setResult(null); }} className="input-field" placeholder="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{current.bLabel}</label>
          <input type="number" value={b} onChange={(e) => { setB(e.target.value); setResult(null); }} className="input-field" placeholder="0" />
        </div>
      </div>

      <button onClick={calculate} className="btn-primary">Calculate</button>

      {result && (
        <div className="result-box">
          <p className="text-xl font-bold text-sky-500">{result}</p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  { q: 'How do I calculate 20% of 500?', a: 'Multiply 500 by 0.20 (which is 20/100). 500 × 0.20 = 100. So 20% of 500 is 100.' },
  { q: 'How do I find the percentage change between two numbers?', a: 'Percentage change = ((New Value - Old Value) / Old Value) × 100. For example, from 80 to 100: ((100-80)/80) × 100 = 25% increase.' },
  { q: 'What percentage is 50 of 200?', a: '(50 / 200) × 100 = 25%. So 50 is 25% of 200.' },
];

export default function PercentageCalculatorPage() {
  return (
    <ToolWrapper tool={tool} faqs={faqs} explanation="Calculate any percentage instantly — find X% of a number, determine what percentage one number is of another, or calculate the percentage change between two values. Perfect for discounts, grades, taxes, and data analysis.">
      <PercentageTool />
    </ToolWrapper>
  );
}
